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

// $(window).mousemove(function(a) {
//     var c = a.pageX
//       , d = a.pageY;
//     $(window).scrollTop() < $(window).height() && m && (m = !1,
//     clearInterval(l),
//     l = setInterval(translate(c, d), 300))
// }));
//
//
// function translate(a, b) {
//     $(".slick-active").each(function() {
//         $(".containedimg").eq(0).css("transform", "translateX(" + .01 * a + "px) translateY(" + .008 * b + "px)"),
//         $(".containedimg").eq(1).css("transform", "translateX(-" + .01 * a + "px) translateY(" + .015 * b + "px)"),
//         $(".title-fragment").eq(0).css("transform", "translateX(" + .01 * a + "px) translateY(" + .008 * b + "px)"),
//         $(".title-fragment").eq(1).css("transform", "translateX(-" + .015 * a + "px) translateY(" + .015 * b + "px)"),
//         $(".title-fragment").eq(2).css("transform", "translateX(" + .01 * a + "px) translateY(" + .008 * b + "px)")
//     }),
//     m = !0
// }

const translate = (xPos, yPos) => {
  main.style.transform = `translateX(${.01 * xPos}px) translateY(${.008 * yPos}px)`;
  signupButton.style.transform = `translateX(-${.01 * xPos}px) translateY(${.015 * yPos}px)`;
}

let l, m = !0;


window.onmousemove = ({screenX: xPos, screenY: yPos}) => {
  // m && (m = !1,
  //           clearInterval(l),
  //           l = setInterval(translate(xPos, yPos), 300))
  // clearInterval(l);
  // l = setInterval(translate(xPos, yPos), 300);
translate(xPos, yPos);
  // main.style.transform = `translateX(${.01 * xPos}px) translateY(${.008 * yPos}px)`;
  // signupButton.style.transform = `translateX(-${.01 * xPos}px) translateY(${.015 * yPos}px)`;
  // main.style.bottom = `-${(xPos + yPos)/70}px`;
  // main.style.left = `-${(yPos - xPos)/40}px`;
  // signupButton.style.top = `-${xPos/80}px`;
  // signupButton.style.right = `-${yPos/55}px`;
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
