# Proyecto de Servidor con Vistas y Validaciones

Este proyecto consiste en la creación de un servidor que gestiona vistas y validaciones, diferenciando la interfaz de usuario según el rol asignado al usuario. El sistema está diseñado para manejar productos y un carrito de compras con validaciones que aseguran que las acciones de compra no superen el stock disponible.

## Características del Proyecto

- **Vistas Diferenciadas por Roles**: 
  - La interfaz cambia según el rol del usuario:
    - **Admin**: Tiene acceso a funcionalidades avanzadas, como la gestión de productos.
    - **User**: Tiene acceso limitado principalmente a la compra de productos y gestión de su propio perfil y carrito.
    
- **Validaciones de Stock en el Carrito**:
  - Si los productos añadidos al carrito superan el stock disponible, la compra se cancela automáticamente.
  - Se muestra un mensaje de alerta al usuario informando cuál producto supera el stock disponible.

## Variables de Entorno

El servidor utiliza tres variables de entorno fundamentales:

1. **PORT**: Define el puerto en el que el servidor se ejecuta.
2. **MONGO_URL**: URL de conexión a la base de datos MongoDB.
3. **JWT_SECRET**: Clave secreta utilizada para firmar y verificar tokens JWT para autenticación.

Asegúrate de definir estas variables en un archivo `.env` en la raíz del proyecto para el correcto funcionamiento del servidor.

## Instalación y Configuración

1. Clona el repositorio a tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura el archivo `.env` con las variables mencionadas anteriormente.
4. Ejecuta `npm run start` para iniciar el servidor.

## Cómo Funciona

- **Inicio de Sesión**: Los usuarios inician sesión con credenciales y son autenticados mediante JWT.
- **Gestión de Productos y Carrito**: 
  - Los productos pueden ser añadidos al carrito por los usuarios.
  - El sistema verifica que la cantidad de productos en el carrito no exceda el stock disponible antes de permitir la compra.
  - Si se detecta que la cantidad supera el stock, se cancela la compra y se muestra un mensaje de alerta.

## Mensaje para el Profesor

Buenas tardes, querido profesor:
En serio, le estoy muy agradecido por todo lo que nos enseñó. Le juro que, en todos mis años, nunca conocí a un profesor al que le apasionara tanto la programación. Usted provocó que me apasionara por el backend, y le estoy muy agradecido por ello.
Es una pena que ya no nos acompañe en la cursada, porque fue el mejor profesor que tuve en toda mi carrera en CODERHOUSE. Pero a veces las cosas suceden por alguna razón. Le deseo lo mejor en todos sus objetivos y, nuevamente, MUCHAS GRACIAS POR TODO. LE ESTOY MUY AGRADECIDO, QUE VIVA EL BACKEND!!!.
---

¡Gracias por revisar mi proyecto!
