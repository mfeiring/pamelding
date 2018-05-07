const signupButton = document.getElementById('signupButton');
const hideSignup = document.getElementById('hideSignup');
const signup = document.getElementById('signup');
const signupForm = document.getElementById('signupForm');
const showInfoButton = document.getElementById('showInfo');
const hideInfoButton = document.getElementById('hideInfo');
const infoContainer = document.getElementById('info');
const main = document.getElementById('main');

const isValidForm = (data) => data.get('name') && data.get('email');

document.body.onmousemove = ({screenX: xPos, screenY: yPos}) => {
  main.style.bottom = `-${(xPos + yPos)/70}px`;
  main.style.left = `-${(yPos - xPos)/40}px`;
  signup.style.top = `-${xPos/80}px`;
  signup.style.right = `-${yPos/55}px`;
}

signupButton.onclick = (e) => {
  signupButton.style.display = 'none';
  signupForm.hidden = false;
}

hideSignup.onclick = () => {
  signupButton.style.display = 'block';
  signupForm.hidden = true;
}

signupForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);

  if (isValidForm(formData)) {
    fetch('/signup', {
      method: 'POST',
      body: formData
    })
    .then(res => res)
    .then(data => data)
    .catch(err => console.log(err))
  }
}

showInfoButton.onclick = () => {
  infoContainer.classList.remove('hidden');
}

hideInfoButton.onclick = () => {
  infoContainer.classList.add('hidden');
}
