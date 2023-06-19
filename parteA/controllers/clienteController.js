const clienteModel = require('../models/clienteModel');
const auth = require('../auth/auth');


class ClienteController { 

  async cadastrar(req, res) {
    const cliente = req.body;
    const max = await clienteModel.findOne({}).sort({ codigo: -1 });
    cliente.codigo = max == null ? 1 : max.codigo + 1;

    if (await clienteModel.findOne({ 'email': cliente.email })) {
        res.status(400).send({ error: 'Cliente já cadastrado!' });
    }

    const resultado = await clienteModel.create(cliente);
    auth.incluirToken(resultado);
    res.status(201).json(resultado);
}
  async listar(req, res) {
    const resultado = await clienteModel.find({});
    res.status(200).json(resultado);
}

async buscarPorCodigo(req, res) {
  const codigo = req.params.codigo;
  const resultado = await clienteModel.findOne({ 'codigo': codigo });
 
  if (!resultado) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }

  res.status(200).json(resultado);
}

async atualizar(req, res) {
  const codigo = req.params.codigo;
  const cliente = await clienteModel.findOne({ 'codigo': codigo });

  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }

  const _id = String(cliente._id);
  const novosDados = req.body;

  await clienteModel.findByIdAndUpdate(_id, novosDados);
  res.status(200).send();
}

async excluir(req, res) {
  const codigo = req.params.codigo;
  const cliente = await clienteModel.findOne({ 'codigo': codigo });

  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }

  const _id = String(cliente._id);
  await clienteModel.findByIdAndRemove(_id);
  res.status(200).send();
}

}
module.exports = new ClienteController();