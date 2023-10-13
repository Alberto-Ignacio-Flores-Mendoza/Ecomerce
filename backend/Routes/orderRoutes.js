import express from "express"
const router= express.Router()
import Order from "../models/Order.js"
import User from "../models/User.js"


router.post('/', async(req,res)=>{
    const io=req.app.get('socketio')
    const {userId, cart, country, address} = req.body;
    try {
        const user = await User.findById(userId);
        const order = await Order.create({owner: user._id, products: cart, country, address});
        order.count = cart.count;
        order.total = cart.total;
        await order.save();
        user.cart = {total: 0, count: 0}
        user.orders.push(order)
        //socket stuff
        const notification = {status: 'unread', message: `New order from ${user.name}`, time: new Date()};
        io.sockets.emit('new-order', notification);
        await user.save()
        res.status(200).json(user)


    } catch (error) {
        res.status(400).json(error.message)
        
    }
})

router.get('/', async(req,res)=>{
    try {
        const orders= await Order.find().populate('owner', ['email', 'name'])
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.patch('/:id/mark-shipped', async(req,res)=>{
    const io = req.app.get('socketio');

    const {ownerId} = req.body;
    const {id} = req.params;
    try {
        const user= await User.findById(ownerId)
        await Order.findByIdAndUpdate(id, {status: 'shipped'})
        const orders = await Order.find().populate('owner', ['email', 'name'])
        //socket stuff
        const notification = {status: 'unread', message: `Order ${id} shipped with success`, time: new Date()};
        io.sockets.emit("notification", notification, ownerId);
        user.notifications.unshift(notification);
        await user.save()
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

export default router