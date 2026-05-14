const socket = io();

socket.on("connect", () => {
  console.log("Conectado al servidor en tiempo real");
});

socket.on("updateProducts", (products) => {
  const list = document.getElementById("products-list");
  if (!list) return;
  list.innerHTML = products
    .slice(0, 10)
    .map((p) => {
      const imagen =
        p.thumbnails && p.thumbnails.length > 0
          ? `<img src="${p.thumbnails[0]}" class="card-img-top" alt="${p.title}" style="height: 200px; object-fit: cover;">`
          : `<div class="bg-secondary d-flex align-items-center justify-content-center" style="height: 200px;"><span class="text-white">Sin imagen</span></div>`;
      return `
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          ${imagen}
          <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <p class="card-text">${p.description}</p>
            <p><strong>Precio:</strong> $${p.price}</p>
            <p><strong>Stock:</strong> ${p.stock}</p>
            <a href="/products/${p._id}" class="btn btn-primary btn-sm">Ver detalle</a>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});
