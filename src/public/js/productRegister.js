const productForm = document.getElementById('productForm');

productForm.addEventListener('submit',async evt =>{
    evt.preventDefault();

    const formData = new FormData(productForm);

    try {
        const response = await fetch('/api/products/',{
            method:'POST',
            body:formData
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        window.location.href = '/';
    } catch (error) {
        console.log('Error:', error);
    }
})