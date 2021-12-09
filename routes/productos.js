const express = require('express');
const router = express.Router();
const Contenedor = require('../classes/contenedorProductos.js');

const productos = new Contenedor();


//GETS
router.get('/', (req, res)=>{
    productos.getAll().then(result => {
        res.send(result.message);
    });
});

router.get('/:id', (req, res)=>{
    let num = parseInt(req.params.id);
    productos.getById(num).then(result => {
        res.send(result.message);
    })
});



//POSTS
router.post('/', (req, res)=>{
    if(req.auth){
        let producto = req.body;
        productos.save(producto).then(result =>{
            res.send(result.message);
        })
    }else{
        res.status(403).send({"error":-1, "descripcion": `ruta ${req.originalUrl} método ${req.method} no autorizada`});
    }
})

//PUTS
router.put('/:id', (req, res)=>{
    if(req.auth){
        let num = parseInt(req.params.id);
        let producto = req.body;
        productos.updateById(num, producto).then(result => {
            res.send(result.message);
        })
    }else{
        res.status(403).send({"error":-1, "descripcion": `ruta ${req.originalUrl} método ${req.method} no autorizada`});
    }
})

//DELETES
router.delete('/:id', (req, res)=>{
    if(req.auth){
        let num = parseInt(req.params.id);
        productos.deleteById(num).then(result => {
            res.send(result.message);
        })
    }else{
        res.status(403).send({"error":-1, "descripcion": `ruta ${req.originalUrl} método ${req.method} no autorizada`});
    }
});

router.delete('/', (req, res)=>{
    if(req.auth){
        productos.deleteAll().then(result => {
            res.send(result.message);
        })
    }else{
        res.status(403).send({"error":-1, "descripcion": `ruta ${req.originalUrl} método ${req.method} no autorizada`});
    }
});

module.exports = router;