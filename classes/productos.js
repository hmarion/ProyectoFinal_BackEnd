class Productos{
    constructor(id, nombre, timestamp, descripcion, codigo, url, precio, stock) {
        this.id = id;
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.url = url;
        this.precio = precio;
        this.stock = stock;
    }
}

module.exports = Productos;