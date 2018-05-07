const signupButton = document.getElementById('signupButton');
const signupForm = document.getElementById('signupForm');
const infoContainer = document.getElementById('info');
const main = document.getElementById('main');
const successContainer = document.getElementById('success');

const isValidForm = (data) => data.get('name') && data.get('email');

const handleResponse = (res) => {
  if (res.status === 201) {
    successContainer.hidden = false;
  }
}

document.body.onmousemove = ({screenX: xPos, screenY: yPos}) => {
  main.style.bottom = `-${(xPos + yPos)/70}px`;
  main.style.left = `-${(yPos - xPos)/40}px`;
  signupButton.style.top = `-${xPos/80}px`;
  signupButton.style.right = `-${yPos/55}px`;
}

showForm = (shouldShow) => {
  signupForm.hidden = !shouldShow;
}

submitForm = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  if (isValidForm(formData)) {
    fetch('/api/attending', {
      method: 'POST',
      body: formData
    })
    .then(handleResponse)
    .catch(err => console.log(err))
  }
}

showInfo = () => {
  infoContainer.classList.toggle('hidden');
}
