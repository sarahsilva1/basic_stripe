var express = require('express');
var bodyParser = require('body-parser');
var stripe = require('stripe')('sk_testSECRET_KEY');

var app = express();
// app.use(bodyParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/success', function(req, res) {
  res.send('order completed!');
});

app.post('/charge', function(req, res) {
    var stripeToken = req.body.stripeToken;
    var amount = req.body.amount;

    stripe.charges.create({
        card: stripeToken,
        currency: 'usd',
        amount: amount
    },
    function(err, charge) {
        if (err) {
            res.send(500, err);
        } else {
            res.send('total charged is:' + charge);
        }
    });
});

app.use(express.static(__dirname));
app.listen(process.env.PORT || 3000);
