const updateForm = document.getElementById('updateForm');
const pid = document.getElementById('productId').value;

updateForm.addEventListener('submit', async evt=>{
    evt.preventDefault();

    const data = new FormData(updateForm);

    const obj = {};

    data.forEach((value,key) =>{
        obj[key] = value;
    });

    console.log(JSON.stringify(obj))

    try {
        const response = await fetch(`/api/products/${pid}`,{
            method:'PUT',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        });
        if(response.ok == true){
            window.location.href = '/products';
        }

    } catch (error) {
        console.log(error);
    }
})