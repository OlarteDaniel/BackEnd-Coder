function updateQuantity(change,stock) {
    let quantityInput = document.getElementById('quantity');
    let currentQuantity = parseInt(quantityInput.value);

    // Actualizar la cantidad solo si el cambio no hace que sea menor que 1
    let newQuantity = currentQuantity + change;
    if (newQuantity >= 1 && newQuantity <= stock) {
        quantityInput.value = newQuantity;
    }

}

async function addCart(pid,uid){
    let quantityInput = document.getElementById('quantity');
    let currentQuantity = parseInt(quantityInput.value);
    
    const obj = {
        quantity:currentQuantity
    }

    try {
        const response = await fetch(`/api/carts/${uid}/products/${pid}`,{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        })

        if(response.ok == true){
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: `${currentQuantity} productos han sido agregados al carrito`
            });
            
            quantityInput.value = 1
        }else{
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",  // Cambiar el icono a "error"
                title: "Stock Exceeded",  // Cambiar el título al mensaje de error
                text: "La cantidad que intenta agregar supera el stock disponible." // Añadir el texto del mensaje de error
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editProduct(pid) {
    window.location.href = `/product/edit/${pid}`
}

async function deleteProduct(pid) {
    
    try {
        const response = await fetch(`/api/products/${pid}`,{
            method:'DELETE'
        });

        const result = await response.json()

        if(result.status === 'success'){
            window.location.href = '/products'
        }else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.message
            });
        }

    } catch (error) {
        
    }

}
