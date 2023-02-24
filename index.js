const express = require('express');
const app = express();
const PORT = 5000;
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(express.json());
app.use(cors());
app.get('/', async (req, res) => {
  res.send('server is running');
});

app.post('/payment', async (req, res) => {
  let { amount } = req.body;
  var instance = new Razorpay({
    key_id: 'rzp_test_AlXAgl1KWax4CD',
    key_secret: 'uQaQz3R3RWk62ckYoQyX02PO',
  });

  let order = await instance.orders.create({
    amount: 50000,
    currency: 'INR',
    receipt: 'receipt#1',
  });
  res.status(201).json({
    success: true,
    order,
    amount,
  });
});

app.listen(PORT, () => {
  console.log(`Server is Running On The Port ${PORT}`);
});
