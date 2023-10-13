import express from "express"
import http from "http"
import {Server} from "socket.io"
import cors from "cors"
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from './models/User.js'
import userRoute from './Routes/userRoutes.js'
import Product from "./models/Product.js";
import productRoute from './Routes/productRoutes.js'
import imagesRoutes from "./Routes/imagesRoutes.js"
import orderRoutes from "./Routes/orderRoutes.js"

import Stripe from "stripe"
dotenv.config();


var stripe = Stripe(process.env.STRIPE_SECRET)
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: 'http://localhost:5173',
    //cors: 'http://localhost:5173',
    methods: ['GET','POST','PATCH', 'DELETE']
})



app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/images', imagesRoutes)
app.use('/orders', orderRoutes)

app.post('/create-payment', async(req, res)=> {
  const {amount} = req.body;
  //console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
    res.status(200).json(paymentIntent)
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
   }
})





const PORT= process.env.PORT || 3000

mongoose
.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})
.then(() => {

    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    app.set('socketio', io)


})
.catch((error) => console.log(`${error} did not connect`));

