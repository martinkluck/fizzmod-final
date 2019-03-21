let form = document.getElementById('register-form')
let chatForm = document.getElementById('chat-form')
let logout = document.getElementById('logout')
let chat = document.getElementById('chat')
let chatMessages = document.getElementById('chat-messages')
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
            localStorage.setItem('user', data.insertId)
            form.style.display = 'none'
            form.reset()
            logout.hidden = false
            chat.hidden = false
            loadMessages()
        })
        .catch(error => {
            console.log(error)
        })
})

if (localStorage.getItem('user')) {
    form.style.display = 'none'
    logout.hidden = false
    chat.hidden = false
    loadMessages()
}

logout.addEventListener('click',function(e){
    e.preventDefault()
    localStorage.removeItem('user')
    form.style.display = 'block'
    logout.hidden = true
    chat.hidden = true
})

function loadMessages(){
    fetch("http://localhost:8000/messages")
        .then(res => res.json())
        .then(response => {
            console.log('Messages',response)
            response.forEach(element => {
                loadMessage(element)
            });
            if(response.lenght <= 0){
                chatMessages.innerText = ' '
            }
        })
        .catch(error => {
            console.log(error)
        })
}

chatForm.addEventListener('submit',function(e){
    e.preventDefault();
    let userId = localStorage.getItem('user')
    console.log(userId)
    fetch("http://localhost:8000/messages", {
        method: 'POST',
        body: JSON.stringify({body:chatForm.body.value,user_id:userId}),
        headers: new Headers({
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'content-type': "x-www-form-urlencode"
        })
    })
    .then(res => res.json())
    .then(data => {
            console.log(data);

            loadMessage({body:chatForm.body.value})
            chatForm.reset()
        })
        .catch(error => {
            console.log(error)
        })
})

function loadMessage(element){
    let message = document.createElement('div')
    message.classList = ['message']
    let msjBody = document.createElement('div')
    msjBody.classList = ['msj-body']
    let msjFooter = document.createElement('div')
    msjFooter.classList = ['msj-footer']
    let msj = document.createElement('p')
    msj.innerText = element.body
    msjBody.append(msj)
    message.appendChild(msjBody)
    message.appendChild(msjFooter)
    chatMessages.append(message)
}