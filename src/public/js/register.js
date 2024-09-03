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

        const result = await response.json();

        if(response.ok == true){
            window.location.href = '/login';
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.error,
            });
        }
    } catch (error) {
        console.log(error);
    }
})