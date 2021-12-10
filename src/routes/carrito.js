import express from 'express';
const router = express.Router();
import ContenedorCarrito from '../classes/contenedorCarrito.js';

const carrito = new ContenedorCarrito();


//GETS
router.get('/:id/productos', (req, res)=>{
    let num = parseInt(req.params.id);
    carrito.getById(num).then(result=>{
        res.send(result.message);
    })
})


//POSTS
router.post('/', (req, res)=>{
    carrito.create().then(result =>{
        res.send(result.message);
    })
})

router.post('/:id/productos', (req, res)=>{
    let num = parseInt(req.params.id);
    let producto = req.body;
    carrito.addProduct(num, producto).then(result=>{
        res.send(result.message);
    })
})

//PUTS

//DELETES
router.delete('/:id/productos/:id_prod', (req, res)=>{
    let idCart = parseInt(req.params.id);
    let idProd = parseInt(req.params.id_prod);
    carrito.productDel(idCart, idProd).then(result=>{
        res.send(result.message);
    })
})

router.delete('/:id', (req, res)=>{
    let idCart = parseInt(req.params.id);
    carrito.cartDel(idCart).then(result=>{
        res.send(result.message);
    })
})

export default router;