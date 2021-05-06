import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

// GENERATES UNIQUE TOKEN FOR USER UPON ACCOUNT CREATION
export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET || 'donttouch', {
        expiresIn: '30d',
    });
};


// AUTHORIZATION CHECK FOR WHEN USER ATTEMPTS TO SIGN IN AND 
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'donttouch',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'Resource Created' });
    }
  };
  
  // ADMIN CHECK FOR SIGNED IN USER
  export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };

  // FIRST THIRD-PARTY API - MAILGUN API TO SEND USERS RECEIPTS WHEN THEY SUCCESSFULLY PAY FOR THEIR ORDER
  export const mailgun = () => mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  // RECEIPT TEMPLATE FOR AFTER ORDER IS PAID FOR 
  export const orderReceipt = (order) => {
    return `<h1>Order details</h1>
      <p>
        Howdy ${order.user.name},</p>
      <p>We finished processing your order.</p>
      <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
      <table>
      <thead>
      <tr>
      <td><strong>Product</strong></td>
      <td><strong>Quantity</strong></td>
      <td><strong align="right">Price</strong></td>
      </thead>
      <tbody>
        ${order.orderItems.map((item) => `
        <tr>
        <td>${item.name}</td>
        <td align="center">${item.qty}</td>
        <td align="right"> $${item.price.toFixed(2)}</td>
        </tr>
      `).join('\n')}
    </tbody>
    <tfoot>
    <tr>
    <td colspan="2">Items Price:</td>
    <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2">Tax Price:</td>
    <td align="right"> $${order.taxPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2">Shipping Price:</td>
    <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2"><strong>Total Price:</strong></td>
    <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
    </tr>
    <tr>
    <td colspan="2">Payment Method:</td>
    <td align="right">${order.paymentMethod}</td>
    </tr>
    </table>
    <h2>Shipping address</h2>
    <p>
    ${order.shippingAddress.fullName},<br/>
    ${order.shippingAddress.address},<br/>
    ${order.shippingAddress.city},<br/>
    ${order.shippingAddress.country},<br/>
    ${order.shippingAddress.zipcode}<br/>
    </p>
    <hr/>
    <p>
    Thanks for shopping with us!
    </p>
    `;
  };