var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vitor_sans:z94vitor@cluster0-apbbv.mongodb.net/test?retryWrites=true&w=majority');
 
var customerSchema = new mongoose.Schema({
    veiculo: String,
    marca: String,
    ano: Number,
    descricao: String, 
    vendido: Boolean,
    created: Date,
    updated: Date
}, { collection: 'veiculo' }
);
 
module.exports = { Mongoose: mongoose, CustomerSchema: customerSchema }