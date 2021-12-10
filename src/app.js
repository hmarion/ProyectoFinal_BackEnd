import express from 'express';
import productosRouter from './routes/productos.js';
import carritoRouter from './routes/carrito.js';

const app = express();

const administrador = true;
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