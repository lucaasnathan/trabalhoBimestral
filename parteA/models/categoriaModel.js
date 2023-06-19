const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true
  },
  descricao: String
});

module.exports = mongoose.model('Categoria', categoriaSchema);

