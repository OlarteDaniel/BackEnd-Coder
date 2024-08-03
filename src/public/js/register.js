const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit',async evt =>{
    evt.preventDefault();

    const data = new FormData(registerForm);

    const obj = {};

    data.forEach((value,key) =>{
        obj[key] = value;
    });

    try {
        const response = await fetch('/api/sessions/register',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        });
        if(response.ok == true){
            window.location.href = '/login';
        }
    } catch (error) {
        console.log(error);
    }
})