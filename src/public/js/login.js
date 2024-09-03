const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit',async evt =>{
    evt.preventDefault();

    const data = new FormData(loginForm);

    const obj = {}
    data.forEach((value,key)=>{
        obj[key]=value;
    });

    try {
        const response = await fetch('/api/sessions/login',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        })
    
        const resul = await response.json();

        if(response.ok == true){
            window.location.href = '/';
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: resul.error
            });
        }
    } catch (error) {
        console.log(error)
    }
})