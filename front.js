let form = document.getElementById('register-form')
form.addEventListener('submit',function(e){
    e.preventDefault();
    console.log(e);
    fetch("http://localhost:8000/users", {
        method: 'POST',
        body: new FormData(e.target)
    })
    .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error)
        })
})