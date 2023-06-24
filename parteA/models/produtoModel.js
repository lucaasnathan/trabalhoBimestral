const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true
  },
  descricao: String,
  preco: {
    type: Number,
    required: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  animal: {
    type: String,
    required: true
  },
  comentarios: [{
    texto: String,
    nota: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  notaGeral: {
    type: Number,
    default: 0
  },
  imagem: {
    type: Buffer
  }
});

module.exports = mongoose.model('Produto', produtoSchema);