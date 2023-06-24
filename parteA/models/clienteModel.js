const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const clienteSchema = new mongoose.Schema({
  codigo: Number,
  nome: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  telefone: {
    type: String,
    required: true
  },
  dtaCriacao: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    select: false
  },
  endereco: {
    type: String,
    required: true
  },
  CPF: {
    type: Number,
    required: true
  },
  cartaoCredito: {
    numero: String,
    titular: String,
    validade: String,
    codigoSeguranca: String
  },
  avatar: {
    type: Buffer
  }

});

clienteSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) {
    return next();
  }

  try {
    const hash = await bcryptjs.hash(this.senha, 10);
    this.senha = hash;
    next();
  } catch (error) {
    return next(error);
  }
});


module.exports = mongoose.model('cliente', clienteSchema)