const form = document.querySelector("#contactForm");
let elements = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {};
  elements = e.target.elements;
  formData["name"] = elements[0].value;
  formData["number"] = elements[2].value;
  formData["email"] = elements[1].value;
  formData["subject"] = elements[3].value;
  formData["message"] = elements[4].value;
  console.log(formData);
  sendData(formData);
});

function sendData(formData){
    const xhr = new XMLHttpRequest();
    xhr.open('POST' , 'contactdb.php' ,true);
    xhr.onload = function(){
     const res = JSON.parse(this.responseText);
     if(res.success){
         alert(res.message);
         clearField(elements);
     }else{
         alert("error occured")
     }
   
    }
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
    console.log(JSON.stringify(formData))
    xhr.send(JSON.stringify(formData))
}

function clearField(el){
  for(let i = 0; i<5;i++){
      el[i].value = "";
  }
}