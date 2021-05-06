import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth, mailgun, orderReceipt } from '../utils.js';

// ROUTERS FOR ORDER MODELS FOR API CALLS COMMUNICATED TO BACKEND

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Empty Cart' });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res.status(201).send({ message: 'Resource Created', order: createdOrder });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      mailgun().messages().send(
        {
          from: 'Rushis Bookstore <RBStore@mg.yourdomain.com>',
          to: `${order.user.name} <${order.user.email}>`,
          subject: `Your order details for order#: ${order._id}`,
          html: orderReceipt(order),
        },
        (error, body) => {
          if (error) {
            console.error(error);
          } else {
            console.log(body);
          }
        }
      );
      res.send({ message: 'Order Fulfilled', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order does not exist' });
    }
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);


orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Unknown Order' });
      }
    })
  );

export default orderRouter;