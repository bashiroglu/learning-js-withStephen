const express = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();
router.post('/cart/products', async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({
      items: [{ id: req.body.productId, quantity: 1 }]
    });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
    const productId = req.body.productId;
    const existingProduct = cart.items.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.items.push({ id: req.body.productId, quantity: 1 });
    }
    await cartsRepo.update(cart.id, {
      items: cart.items
    });
    // req.session.cartId = null;
  }
  console.log(cart);

  res.send('Product added to cart');
});

module.exports = router;
