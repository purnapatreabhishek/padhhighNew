let open = false,
  result,
  formData = {},
  elements;

const form = document.querySelector(".courses-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  elements = e.target.elements;
  formData["student"] = elements[0].value;
  formData["parent"] = elements[1].value;
  formData["course"] = elements[2].value;
  formData["contact"] = elements[3].value;
  formData["email"] = elements[4].value;
  formData["city"] = elements[5].value;
  console.log(formData);
  const number = '+91' + formData.contact;
  showStatus('notify','INFO','verifying...')
  initOtpReq(number);
});

//init otp req
function initOtpReq(number) {
  let option = {
    'size': 'invisible',
  }
  let recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', option);
  firebase.auth().signInWithPhoneNumber(number, recaptchaVerifier)
    .then(confirmation => {
      result = confirmation;
      showPopup();
    })
    .catch(err => showStatus('notify', 'FAILED', err.message))
}
//verify otp 
function verifyOtp(e) {
  e.preventDefault();
  const otp = e.path[1].elements[0].value;

  if (otp) {
    console.log(otp)
    result.confirm(otp)
      .then(() => {
        showStatus('otp', 'SUCCESS', 'verified')
        showPopup()
        sendData(formData);
      })
      .catch((err) => showStatus('otp', 'FAILED', err.message))
  }

}

const xhr = new XMLHttpRequest();

function sendData(formData) {
  showStatus('notify', 'INFO', 'Registering...')
  xhr.open('POST', '/junior/otpphp/otpdemodb.php', true);
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(formData))
}

xhr.onload = function () {
  const { success, message } = JSON.parse(this.responseText);
  if(success){
  clearfield(elements);
  showStatus('notify', 'SUCCESS', 'Successfully registered')
  window.location.href = message;
  }
  else
  showStatus('notify', 'FAILED', message);
}

//clear field after form submit
function clearfield(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements.value = "";
  }
}
//show otp popup
function showPopup() {
  open = !open;
  document.querySelector('.backdrop1').classList.toggle('close-popup');
}

function showStatus(id, status, message) {
  const color = {
    'INFO': '#2196F3',
    'FAILED': '#f44336',
    'SUCCESS': '#4CAF50'
  }
  const el = document.querySelector(`#${id}`);
  el.innerHTML = `<span style="color:${color[status]}">${message}</span>`;
}
