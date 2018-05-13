const signupButton = document.getElementById('signupButton');
const signupForm = document.getElementById('signupForm');
const infoContainer = document.getElementById('info');
const main = document.getElementById('main');
const successContainer = document.getElementById('success');

document.querySelectorAll('.cross').forEach(cross => {
  cross.onmouseenter = () => {
    cross.querySelector('.animateIn').beginElement();
  }
  cross.onmouseleave = () => {
    cross.querySelector('.animateOut').beginElement();
  }
})

const isValidForm = (data) => data.get('name') && data.get('email');

const handleResponse = (res) => {
  if (res.status === 201) {
    successContainer.hidden = false;
  }
}

const translate = (xPos, yPos) => {
  main.style.transform = `translateX(${.01 * xPos}px) translateY(${.008 * yPos}px)`;
  signupButton.style.transform = `translateX(-${.01 * xPos}px) translateY(${.015 * yPos}px)`;
}

window.onmousemove = ({screenX: xPos, screenY: yPos}) => {
  translate(xPos, yPos);
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
