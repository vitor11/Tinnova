var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    var db = require('../db');
    var Customer = db.Mongoose.model('veiculo', db.CustomerSchema, 'veiculo');
    var newcustomer = new Customer({ veiculo: req.body.veiculo, marca: req.body.marca, ano: req.body.ano, descricao: req.body.descricao, vendido: req.body.vendido, created: req.body.created, updated: req.body.updated});
    newcustomer.save(function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        console.log(req.body);
        res.json(newcustomer);
        res.end();
    });
});

router.get('/', function (req, res, next) {
    var db = require('../db');
    var Customer = db.Mongoose.model('veiculo', db.CustomerSchema, 'veiculo');
    Customer.find({}).lean().exec(function(e,docs){
       res.json(docs);
       res.end();
    });
});


router.put('/:id', function (req, res, next) {

    var db = require('../db');
    var Customer = db.Mongoose.model('veiculo', db.CustomerSchema, 'veiculo');
    Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
        res.end();
    });
 });


router.delete('/:id', function (req, res, next) {
    var db = require('../db');
    var Customer = db.Mongoose.model('veiculo', db.CustomerSchema, 'veiculo');
    Customer.find({ _id: req.params.id }).remove(function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json({success: true});
        res.end();
    });
});


module.exports = router;