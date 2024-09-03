async function removeFromCart(pid,cid) {
    
    try {
        const response = await fetch(`/api/carts/${cid}/products/${pid}`,{
            method: 'DELETE'
        })

        const result = await response.json()

        if (result.status === 'success') {
            window.location.reload();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.error
            });
        }


    } catch (error) {
        
    }
}

function proceedToCheckout(cid){
    
    Swal.fire({
        title: "¿Estás seguro de finalizar la compra?",
        text: "No podrás deshacer esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, finalizar compra",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {

            finalizePurchase(cid); // Función que maneja la lógica para finalizar la compra
    
            
        }
    });
}

async function finalizePurchase(cid) {
    console.log("first")
    try {
        const response = await fetch(`/api/carts/${cid}/purchase`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            }
        })

        const result = await response.json()

        if (result.status === 'success') {
            window.location.reload();
        } else {
            console.log(result)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.error
            });
        }

    } catch (error) {
        console.log(error);
    }
}