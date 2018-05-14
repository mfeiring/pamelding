login = (e) => {
  e.preventDefault();

  fetch('/login', {
    method: 'POST',
    body: new FormData(e.target)
  })
  .then(res => res.json())
  .then(data => createTable(data))
  .catch(err => console.error(err))
}

formatTime = timestamp => (
  new Date(timestamp).toLocaleTimeString('nb-NO', {day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'})
)

createTable = data => {
  console.log(data)
  const table = document.getElementById('list');
  const header = '<tr><th>Navn</th><th>Mail</th><th>Påmeldt</th></tr>'

  const htmlList = data.map(entry => (
    `<tr><td>${entry.name}</td><td>${entry.email}</td><td>${formatTime(entry.timestamp)}</td>`
  )).join('');

  table.innerHTML = header + htmlList;
  console.log(htmlList)
}
