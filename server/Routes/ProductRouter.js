import express from 'express';
import { AuthMiddleware } from '../Middleware/Product.Middleware.js';
const ProductRouter = express.Router();


ProductRouter.get("/product" ,  AuthMiddleware ,(req, res)=>{
    console.log("Product route accessed by user:", req.user);
    res.json({message: "Product route is working", success: true, products: [
             {
                "name":"Product 1",
                "price": 100
             },
             {
                "name":"Product 2",
                "price": 200
             },
             {
                "name":"Product 3",
                "price": 300
             },
             {
                "name":"Product 4",
                "price": 350
             },
    ]});
})


export default ProductRouter;






