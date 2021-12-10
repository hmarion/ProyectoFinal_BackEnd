import fs from 'fs';
import Productos from './productos.js';
import Utils from '../utils/utils.js';

class Contenedor {
    
    async save(producto) {
        let id = this.maxId();
        id += 1;
        try{
            let productoNuevo = new Productos(id, producto.nombre, Utils.dateNow, producto.descripcion, producto.codigo, producto.url,  producto.precio, producto.stock);
            try{
                let fileProductos = await fs.promises.readFile('../files/productos.txt', 'utf-8');
                let productos = JSON.parse(fileProductos);
                if(productos.some(prod => prod.nombre === productoNuevo.nombre)){
                    return {status:"error",message: "El producto ya existe"};
                }else{
                    productos.push(productoNuevo);
                    try{
                        await fs.promises.writeFile('../files/productos.txt', JSON.stringify(productos, null, 2));
                        return {status:"success",message: `Producto registrado. ID: ${productoNuevo.id}`}
                    }catch{
                        return {status:"error",message:"No se pudo agregar el producto"}
                    }
                }
            }catch{
                try{
                    await fs.promises.writeFile('../files/productos.txt', JSON.stringify([productoNuevo], null, 2));
                    return {status: "success",message: `Producto registrado. ID: ${productoNuevo.id}`}
                }catch{
                    return {status: "error",message: "No se pudo agregar el producto"}
                }
            }
        }catch{
            return {status: "error", message: "Error al crear el producto"}
        }
        
    }    

    async getById(number) {
        try{
            let archivo = await fs.promises.readFile('../files/productos.txt', 'utf-8');
            let productos = JSON.parse(archivo);
            let index = productos.findIndex(prod => prod.id === number);
            if(index === -1){
                return {status: "success", message: "El id no existe"}    
            }else{
                return {status: "success", message: productos[index]}
            }
        }catch{
            return {status: "error", message: "Archivo no encontrado"}
        }
    }
    
    async getAll() {
        try{
            let archivo = await fs.promises.readFile('../files/productos.txt', 'utf-8');
            let productos = JSON.parse(archivo);
            return {status: "success", message: productos};
        }catch{
            //El archivo no existe
            return {status: "error", message: "El archivo no existe"}
        }
    }
    
    async deleteById(number) {
        try{
            let archivo = await fs.promises.readFile('../files/productos.txt', 'utf-8');
            let productos = JSON.parse(archivo);
            let index = productos.findIndex(prod => prod.id === number);
            if(index === -1){
                return {status: "success", message: "El id no existe"}    
            }else{
                let productosNuevo = productos.filter((prod) => prod.id != number);
                await fs.promises.writeFile('../files/productos.txt', JSON.stringify(productosNuevo, null, 2));
                return {status:"success", message:"Se elimino el producto"}
            }
        }catch{
            return {status: "error", message: "No se pudo eliminar el producto"}
        }
    }

    async deleteAll() {
        try{
            await fs.promises.readFile('../files/productos.txt', 'utf-8');
            try {
                await fs.promises.writeFile('../files/productos.txt', JSON.stringify([], null, 2));
                return {status: "success", message: "Se eliminaron todos los Productos"}
            }catch{
                return {status: "error", message: "No se pudo vaciar el archivo"}
            }
        }catch{
            //El archivo no existe
            return {status: "error", message: "El archivo no existe"}
        }
    }

    async updateById(number, producto) {
        try{
            let archivo = await fs.promises.readFile('../files/productos.txt', 'utf-8');
            let productos = JSON.parse(archivo);
            let index = productos.findIndex(prod => prod.id === number);
            let horaProducto = productos[index].timestamp;
            if(index === -1){
                return {status: "success", message: "El id no existe"}    
            }else{
                let obj = { ...producto, id: number, timestamp: horaProducto}
                let productosNuevo = productos.map((prod) => {
                    if(prod.id === number){
                        return obj;
                    }else{
                        return prod;
                    }
                });
                await fs.promises.writeFile('../files/productos.txt', JSON.stringify(productosNuevo, null, 2));
                return {status:"success", message:"Se actualizo el producto"}
            }
        }catch{
            return {status: "error", message: "El archivo no existe"}
        }
    }

    maxId() {
        let id = 0
        try{
            let fileProductos = fs.readFileSync('../files/productos.txt');
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

export default Contenedor;
