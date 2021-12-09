const fs = require('fs');
const Carrito = require('./carrito.js')
const Contenedor = require('./contenedorProductos.js');
const Utils = require('../utils/utils.js');

class ContenedorCarrito{

    async create(){
        let id = this.maxId();
        id += 1;
        try{
            let productos = []
            let carritoNuevo = new Carrito(id, Utils.dateNow, productos);
            try{
                let fileCarritos = await fs.promises.readFile('../files/carritos.txt', 'utf-8');
                let carritos = JSON.parse(fileCarritos);
                carritos.push(carritoNuevo);
                try{
                    await fs.promises.writeFile('../files/carritos.txt', JSON.stringify(carritos, null, 2));
                    return {status:"success",message: `Carrito creado. ID: ${carritoNuevo.id}`}
                }catch{
                    return {status:"error",message:"No se pudo generar el carrito"}
                }
            }catch{
                try{
                    await fs.promises.writeFile('../files/carritos.txt', JSON.stringify([carritoNuevo], null, 2));
                    return {status: "success",message: `Carrito creado. ID: ${carritoNuevo.id}`}
                }catch{
                    return {status: "error",message: "No se pudo generar el carrito"}
                }
            }
        }catch{
            return {status: "error", message: "Error al crear el Carrito"}
        }
    }

    async getById(number){
        try{
            let archivo = await fs.promises.readFile('../files/carritos.txt', 'utf-8');
            let carritos = JSON.parse(archivo);
            let index = carritos.findIndex(cart => cart.id === number);
            if(index === -1){
                return {status: "success", message: "El id no existe"}    
            }else{
                let carritoElegido = carritos[index];
                return {status: "success", message: carritoElegido.producto}
            }
        }catch{
            return {status: "error", message: "Archivo no encontrado"}
        }
    }

    async addProduct(number, productoAdd){
        try{
            let archivo = await fs.promises.readFile('../files/carritos.txt', 'utf-8');
            let carritos = JSON.parse(archivo);
            let index = carritos.findIndex(cart => cart.id === number);
            if(index === -1){
                return {status: "success", message: "El id no existe"}
            }else{
                let carritoElegido = carritos[index];
                let producto = new Contenedor();
                let agregar = (await producto.getById(productoAdd.id)).message;
                agregar.stock = productoAdd.stock;
                carritoElegido.producto.push(agregar);
                let carritoNuevo = carritos.map((cart)=>{
                    if(cart.id === number){
                        return carritoElegido;
                    }else{
                        return cart;
                    }
                })
                await fs.promises.writeFile('../files/carritos.txt', JSON.stringify(carritoNuevo, null, 2));
                return {status: "success", message: "Se agrego correctamente el producto al carrito"}
            }
        }catch{
            return {status: "error", message: "Error al agregar el producto"}
        }
    }

    async productDel(idCart, idProd){
        try{
            let archivo = await fs.promises.readFile('../files/carritos.txt', 'utf-8');
            let carritos  = JSON.parse(archivo);
            let index = carritos.findIndex(cart => cart.id === idCart);
            if(index === -1){
                return {status: "success", message: "El id no existe"}
            }else{
                let carritoElegido = carritos[index];
                let nuevoCarrito = carritoElegido.producto.filter((prod) => prod.id != idProd);
                carritos[index].producto = nuevoCarrito;
                await fs.promises.writeFile('../files/carritos.txt', JSON.stringify(carritos, null, 2));
                return {status: "success", message: "Se elimino correctamente el producto del carrito"}
            }
        }catch{
            return {status: "error", message: "Error al eliminar el producto"}
        }
    }

    async cartDel(idCart){
        try{
            let archivo = await fs.promises.readFile('../files/carritos.txt', 'utf-8');
            let carritos  = JSON.parse(archivo);
            let index = carritos.findIndex(cart => cart.id === idCart);
            if(index === -1){
                return {status: "success", message: "El id no existe"}
            }else{
                let carritoElegido = carritos[index];
                carritoElegido.producto = [];
                let nuevoArchivo = carritos.filter((cart) => cart.id != idCart);
                await fs.promises.writeFile('../files/carritos.txt', JSON.stringify(nuevoArchivo, null, 2));
                return {status: "success", message: "Se elimino correctamente el carrito"}
            }
        }catch{
            return {status: "error", message: "Error al eliminar el producto"}
        }
    }

    maxId() {
        let id = 0
        try{
            let fileProductos = fs.readFileSync('../files/carritos.txt');
            let productos = JSON.parse(fileProductos);
            
            let res = productos.reduce((prev, currentValue, i) =>{
                if(i==0){
                    return {
                        id: currentValue.id  
                    }
                }else{
                    let MaxId = prev.id > currentValue.id ? prev.id : currentValue.id;
                    return {
                        id: MaxId
                    }
                }          
            });
            id = res.id
        }catch{
            return id;
        }
        return id;
    }
}


module.exports = ContenedorCarrito;