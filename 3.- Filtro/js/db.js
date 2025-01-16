const productos = [
    {
      imagen: 'assets/HP.webp',
      marca: "HP",
      precio: 9000,
      condicion: "Nuevo",
      puertos: 2,
      tipoPantalla: "OLED",
      memoriaRam: 8
    },
    {
      imagen: 'assets/Lenovo.webp',
      marca: "Lenovo",
      precio: 4000,
      condicion: "Nuevo",
      puertos: 1,
      tipoPantalla: "QLED",
      memoriaRam: 4
    },
    {
      
      imagen: 'assets/Dell.webp',
      marca: "Dell",
      precio: 9500,
      condicion: "Usado",
      puertos: 3,
      tipoPantalla: "LCD",
      memoriaRam: 16
    },
    {
      imagen: 'assets/Asus.webp',
      marca: "ASUS",
      precio: 4500,
      condicion: "Reacondicionado",
      puertos: 1,
      tipoPantalla: "LED",
      memoriaRam: 8
    },
    {
      imagen: 'assets/Acer.webp',
      marca: "Acer",
      precio: 13500,
      condicion: "Nuevo",
      puertos: 2,
      tipoPantalla: "OLED",
      memoriaRam: 16
    },
    {
      imagen: 'assets/Apple.webp',
      marca: "Apple",
      precio: 11000,
      condicion: "Nuevo",
      puertos: 3,
      tipoPantalla: "QLED",
      memoriaRam: 8
    },
    {
      imagen: 'assets/HP2.webp',
      marca: "HP",
      precio: 7000,
      condicion: "Usado",
      puertos: 1,
      tipoPantalla: "LCD",
      memoriaRam: 4
    },
    {
      imagen: 'assets/Lenovo2.webp',
      marca: "Lenovo",
      precio: 8500,
      condicion: "Reacondicionado",
      puertos: 2,
      tipoPantalla: "LED",
      memoriaRam: 6
    },
    {
      imagen: 'assets/Dell2.webp',
      marca: "Dell",
      precio: 6000,
      condicion: "Nuevo",
      puertos: 3,
      tipoPantalla: "OLED",
      memoriaRam: 16
    },
    {
      imagen: 'assets/Asus2.webp',
      marca: "ASUS",
      precio: 4500,
      condicion: "Usado",
      puertos: 3,
      tipoPantalla: "QLED",
      memoriaRam: 8
    },
    {
      imagen: 'assets/Acer2.webp',
      marca: "Acer",
      precio: 8000,
      condicion: "Nuevo",
      puertos: 2,
      tipoPantalla: "OLED",
      memoriaRam: 32
    },
    {
      imagen: 'assets/Apple2.webp',
      marca: "Apple",
      precio: 14000,
      condicion: "Nuevo",
      puertos: 1,
      tipoPantalla: "LCD",
      memoriaRam: 16
    },
    {
      imagen: 'assets/HP3.webp',
      marca: "HP",
      precio: 9500,
      condicion: "Reacondicionado",
      puertos: 1,
      tipoPantalla: "LED",
      memoriaRam: 8
    },
    {
      imagen: 'assets/Lenovo3.webp',
      marca: "Lenovo",
      precio: 4500,
      condicion: "Usado",
      puertos: 3,
      tipoPantalla: "OLED",
      memoriaRam: 16
    },
    {
      imagen: 'assets/Dell.webp',
      marca: "Dell",
      precio: 10000,
      condicion: "Nuevo",
      puertos: 2,
      tipoPantalla: "QLED",
      memoriaRam: 8
    },
    {
      imagen: 'assets/Asus3.webp',
      marca: "ASUS",
      precio: 5500,
      condicion: "Reacondicionado",
      puertos: 2,
      tipoPantalla: "LCD",
      memoriaRam: 4
    },
    {
      imagen: 'assets/Acer3.webp',
      marca: "Acer",
      precio: 7000,
      condicion: "Usado",
      puertos: 3,
      tipoPantalla: "LED",
      memoriaRam: 8
    },
    {
      imagen: 'assets/Apple3.webp',
      marca: "Apple",
      precio: 9000,
      condicion: "Nuevo",
      puertos: 1,
      tipoPantalla: "OLED",
      memoriaRam: 8
    },
    {
      imagen: 'assets/HP4.webp',
      marca: "HP",
      precio: 4000,
      condicion: "Reacondicionado",
      puertos: 3,
      tipoPantalla: "QLED",
      memoriaRam: 16
    },
    {
      imagen: 'assets/Lenovo4.webp',
      marca: "Lenovo",
      precio: 5000,
      condicion: "Nuevo",
      puertos: 1,
      tipoPantalla: "LED",
      memoriaRam: 8
    },
    {
      imagen: 'assets/Dell2.webp',
      marca: "Dell",
      precio: 8000,
      condicion: "Usado",
      puertos: 2,
      tipoPantalla: "OLED",
      memoriaRam: 16
    },
    {
      imagen: 'assets/Asus.webp',
      marca: "ASUS",
      precio: 4500,
      condicion: "Reacondicionado",
      puertos: 2,
      tipoPantalla: "LCD",
      memoriaRam: 8
    },
    {
      imagen: 'assets/Acer.webp',
      marca: "Acer",
      precio: 6000,
      condicion: "Nuevo",
      puertos: 1,
      tipoPantalla: "QLED",
      memoriaRam: 6
    },
    {
      imagen: 'assets/Apple.webp',
      marca: "Apple",
      precio: 7000,
      condicion: "Usado",
      puertos: 2,
      tipoPantalla: "OLED",
      memoriaRam: 16
    },
    {
      imagen: 'assets/HP5.webp',
      marca: "HP",
      precio: 4500,
      condicion: "Nuevo",
      puertos: 3,
      tipoPantalla: "LED",
      memoriaRam: 4
    },
    {
      imagen: 'assets/Lenovo.webp',
      marca: "Lenovo",
      precio: 14000,
      condicion: "Usado",
      puertos: 3,
      tipoPantalla: "LCD",
      memoriaRam: 32
    },
    {
      imagen: 'assets/Dell2.webp',
      marca: "Dell",
      precio: 6000,
      condicion: "Reacondicionado",
      puertos: 1,
      tipoPantalla: "QLED",
      memoriaRam: 4
    },
    {
      imagen: 'assets/Asus3.webp',
      marca: "ASUS",
      precio: 4500,
      condicion: "Nuevo",
      puertos: 2,
      tipoPantalla: "OLED",
      memoriaRam: 8
    },
    {
      imagen: 'assets/Acer.webp',
      marca: "Acer",
      precio: 4000,
      condicion: "Usado",
      puertos: 2,
      tipoPantalla: "LED",
      memoriaRam: 6
    }
  ];