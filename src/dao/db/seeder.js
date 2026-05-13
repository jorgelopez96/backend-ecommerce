import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../../models/product.model.js";

dotenv.config();

const products = [
  {
    title: "Laptop Gamer Pro",
    description: "Laptop de alta gama para gaming",
    code: "LAP002",
    price: 2500,
    status: true,
    stock: 5,
    category: "Electronica",
    thumbnails: ["https://picsum.photos/seed/lap1/400/300"],
  },
  {
    title: "Monitor 4K",
    description: "Monitor UHD de 27 pulgadas",
    code: "MON001",
    price: 800,
    status: true,
    stock: 12,
    category: "Electronica",
    thumbnails: ["https://picsum.photos/seed/mon1/400/300"],
  },
  {
    title: "Teclado Mecanico",
    description: "Teclado con switches blue",
    code: "TEC001",
    price: 120,
    status: true,
    stock: 30,
    category: "Perifericos",
    thumbnails: ["https://picsum.photos/seed/tec1/400/300"],
  },
  {
    title: "Auriculares Gamer",
    description: "Sonido surround 7.1",
    code: "AUR001",
    price: 90,
    status: true,
    stock: 25,
    category: "Perifericos",
    thumbnails: ["https://picsum.photos/seed/aur1/400/300"],
  },
  {
    title: "Silla Gamer",
    description: "Silla ergonomica con soporte lumbar",
    code: "SIL001",
    price: 350,
    status: true,
    stock: 8,
    category: "Muebles",
    thumbnails: ["https://picsum.photos/seed/sil1/400/300"],
  },
  {
    title: "Webcam HD",
    description: "Camara 1080p para streaming",
    code: "CAM001",
    price: 75,
    status: true,
    stock: 20,
    category: "Perifericos",
    thumbnails: ["https://picsum.photos/seed/cam1/400/300"],
  },
  {
    title: "Disco SSD 1TB",
    description: "Almacenamiento rapido NVMe",
    code: "SSD001",
    price: 180,
    status: true,
    stock: 15,
    category: "Almacenamiento",
    thumbnails: ["https://picsum.photos/seed/ssd1/400/300"],
  },
  {
    title: "Memoria RAM 32GB",
    description: "DDR5 6000MHz",
    code: "RAM001",
    price: 220,
    status: true,
    stock: 10,
    category: "Componentes",
    thumbnails: ["https://picsum.photos/seed/ram1/400/300"],
  },
  {
    title: "Placa de Video RTX",
    description: "GPU para gaming y diseño",
    code: "GPU001",
    price: 1200,
    status: true,
    stock: 3,
    category: "Componentes",
    thumbnails: ["https://picsum.photos/seed/gpu1/400/300"],
  },
  {
    title: "Router WiFi 6",
    description: "Internet de alta velocidad",
    code: "ROU001",
    price: 95,
    status: true,
    stock: 18,
    category: "Redes",
    thumbnails: ["https://picsum.photos/seed/rou1/400/300"],
  },
  {
    title: "Tablet 10 pulgadas",
    description: "Tablet Android de alta resolucion",
    code: "TAB001",
    price: 300,
    status: true,
    stock: 7,
    category: "Electronica",
    thumbnails: ["https://picsum.photos/seed/tab1/400/300"],
  },
  {
    title: "Smartphone Pro",
    description: "Celular de ultima generacion",
    code: "CEL001",
    price: 900,
    status: true,
    stock: 6,
    category: "Electronica",
    thumbnails: ["https://picsum.photos/seed/cel1/400/300"],
  },
  {
    title: "Impresora Laser",
    description: "Impresion rapida y economica",
    code: "IMP001",
    price: 250,
    status: true,
    stock: 9,
    category: "Oficina",
    thumbnails: ["https://picsum.photos/seed/imp1/400/300"],
  },
  {
    title: "Hub USB-C",
    description: "7 puertos en 1",
    code: "HUB001",
    price: 45,
    status: true,
    stock: 40,
    category: "Perifericos",
    thumbnails: ["https://picsum.photos/seed/hub1/400/300"],
  },
  {
    title: "Mousepad XL",
    description: "Pad de escritorio extra grande",
    code: "PAD001",
    price: 30,
    status: true,
    stock: 50,
    category: "Perifericos",
    thumbnails: ["https://picsum.photos/seed/pad1/400/300"],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Conectado a MongoDB");
  await Product.insertMany(products);
  console.log(`${products.length} productos insertados!`);
  await mongoose.disconnect();
}

seed().catch(console.error);
