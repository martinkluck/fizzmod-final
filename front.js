let form = document.getElementById('register-form')
form.addEventListener('submit',function(e){
    e.preventDefault();
    fetch("http://localhost:8000/users", {
        method: 'POST',
        body: JSON.stringify({username:form.username.value,firstname:form.firstname.value,lastname:form.lastname.value,email:form.email.value}),
        headers: new Headers({
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'content-type': "x-www-form-urlencode"
        })
    })
    .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error)
        })
})