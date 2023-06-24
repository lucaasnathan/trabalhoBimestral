const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true
  },
  precoTotal: {
    type: Number,
    required: true
  },
  produtos: [{
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produto',
      required: true
    },
    quantidade: {
      type: Number,
      required: true
    }
  }],
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  dataHora: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pendente', 'Em andamento', 'Concluído'],
    default: 'Pendente'
  },
  quantidadeTotal: {
    type: Number,
    default: 0,
    required: false
  }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
