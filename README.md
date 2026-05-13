# Backend E-Commerce

API REST de e-commerce desarrollada con Node.js, Express y MongoDB.

## Tecnologías
- Node.js + Express
- MongoDB Atlas + Mongoose
- Handlebars
- Socket.IO
- FileSystem

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   npm install
3. Crear archivo .env con:
   PORT=8080
   MONGODB_URI=tu_uri_de_mongodb
4. Ejecutar:
   npm run dev

## Endpoints

### Productos
- GET /api/products
- GET /api/products/:pid
- POST /api/products
- PUT /api/products/:pid
- DELETE /api/products/:pid

### Carritos
- POST /api/carts
- GET /api/carts/:cid
- POST /api/carts/:cid/products/:pid
- DELETE /api/carts/:cid/products/:pid
- PUT /api/carts/:cid
- PUT /api/carts/:cid/products/:pid
- DELETE /api/carts/:cid

## Vistas
- /products — Listado con paginación
- /products/:pid — Detalle del producto
- /carts/:cid — Vista del carrito