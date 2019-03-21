let form = document.getElementById('register-form')
let logout = document.getElementById('logout')
let chat = document.getElementById('chat')
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
    .then(res => res.json())
    .then(data => {
            console.log(data);
            localStorage.setItem('user',data.inserId)
            form.style.display = 'none'
            logout.hidden = false
            chat.hidden = false
        })
        .catch(error => {
            console.log(error)
        })
})

if (localStorage.getItem('user')) {
    form.style.display = 'none'
    logout.hidden = false
    chat.hidden = false
}

logout.addEventListener('click',function(e){
    e.preventDefault()
    localStorage.removeItem('user')
    form.style.display = 'block'
    logout.hidden = true
    chat.hidden = true
})