const form = document.querySelector(".courses-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {};
  const elements = e.target.elements;
  formData["table"] = e.target.id ? e.target.id : null;
  formData["name"] = elements[0].value;
  formData["parent"] = elements[1].value;
  formData["number"] = elements[2].value;
  formData["email"] = elements[3].value;
  formData["city"] = elements[4].value;
  sendData(formData);
});

function sendData(formData){
    const xhr = new XMLHttpRequest();
    xhr.open('POST' , 'test.php' ,true);
    xhr.onload = function(){
     const res = JSON.parse(this.responseText);
     if(res.success){
         alert(res.message)
     }else{
         alert("error occured")
     }
     console.log(this.responseText);
     console.log(res);
    }
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
    console.log(JSON.stringify(formData))
    xhr.send(JSON.stringify(formData))
}

function clearfield(el){
  el.forEach(e=> e.value = "");
}