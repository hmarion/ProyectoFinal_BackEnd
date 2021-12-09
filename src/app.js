const Productos = require('../classes/productos');
const express = require('express');
const productosRouter = require('../routes/productos');
const carritoRouter = require('../routes/carrito.js');

const app = express();

const administrador = false;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use((req, res, next)=>{
    req.auth = administrador;
    next();
})
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);
app.use(function(req, res){
    res.status(404).send({"error": -2, "descripcion": `ruta ${req.url} método ${req.method} no implementada`});
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en ' + PORT);
});