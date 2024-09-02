async function removeFromCart(pid,cid) {
    
    try {
        const response = await fetch(`/api/carts/${cid}/products/${pid}`,{
            method: 'DELETE'
        })

        const result = await response.json()

        console.log(result)

        if (result.status === 'success') {
            window.location.reload();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.message
            });
        }


    } catch (error) {
        
    }
}