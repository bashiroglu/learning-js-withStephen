const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

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

  return res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

module.exports = router;
