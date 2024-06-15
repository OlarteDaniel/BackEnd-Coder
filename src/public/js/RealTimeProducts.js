const socket = io();
const formulario = document.getElementById('productForm');
const productsContainer = document.getElementById('productos');

formulario.addEventListener('submit',async (event) => {
    event.preventDefault();

    const formData = new FormData(formulario);

    const response = await fetch('/api/products', {
        method:'POST',
        body:formData
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
        });
    } else {
        
        const responseData = await response.json();
        socket.emit('addProduct', responseData.message); 
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        await Toast.fire({
            icon: "success",
            title: responseData.message
        });
    }
})

// Eventos

socket.on('productAdded', async () => {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();

        productsContainer.innerHTML = '';

        products.payload.forEach(prod => {
            const productElement = document.createElement('div');
            productElement.className = 'producto';
            productElement.innerHTML = `
            <h2 class="titulo">${prod.title}</h2>
            ${prod.thumbnails.length > 0
                ? prod.thumbnails.filter(t => t.main).map(t => `<img src="${t.path}">`).join('')
                : `<img src="../files/products/ImagenDefault.jpg">`
            }
            <a href="/products/${prod.id}"><button>Ver más</button></a>
            <button onclick="eliminar(${prod.id})" class="eliminar">Eliminar</button>
            `;
            productsContainer.appendChild(productElement);
        })
    } catch (error) {
        console.error('Error al obtener productos:', error);
        productsContainer.innerHTML = `
        <div id="productsContainer">
            <p>Error al obtener productos. Por favor, inténtelo de nuevo más tarde.</p>
        </div>
    `;
    }
});

async function eliminar(id){
    const response = await fetch(`/api/products/${id}`,{
        method:'DELETE'
    });

    if(!response.ok){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error en el sistema",
        });
    }else{
        let timerInterval;
        Swal.fire({
            title: "Eliminando producto",
            html: "Espere por favor...",
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("La alerta se cerró por el temporizador");
            }
        });
    }
}


