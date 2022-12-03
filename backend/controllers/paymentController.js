const Paystack = require ('@paystack/paystack-sdk');
const paystack = new Paystack(process.env.SECRET_KEY);

let reference;

const initializePayment = async(req, res)  => {
  try {
    const email = req.body.email;
    const amount = req.body.amount;
    const initialize = async(email, amount) => {
      const response = await paystack.transaction.initialize({
        email,
        amount
      });
      return reference = response.data.reference;
      
      res.status(201).json({
        message: "Payment Initialized",
        response
      })
    }
    initialize(email, amount);
  } catch(err) {
    res.json({message: err.message});
    res.status(500);
  }
}

const verifyPayment = async (req,res) => {
  try {
    const verify = async(reference) => {
    const response = await paystack.transaction.verify({
      reference
    });
    res.status(201).json({
      message: "Payment Verified",
      response
    })
  }
    verify(reference);
  } catch(err) {
    res.json({message: err.message});
    res.status(500);
  }
}

module.exports = {
  initializePayment,
  verifyPayment
}