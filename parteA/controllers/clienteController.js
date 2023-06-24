const clienteModel = require('../models/clienteModel');
const auth = require('../auth/auth');


class ClienteController {

  async cadastrar(req, res) {
    try {
      const cliente = req.body;
      const file = req.file.buffer;
      cliente.avatar = file;
      const max = await clienteModel.findOne({}).sort({ codigo: -1 });
      cliente.codigo = max === null ? 1 : max.codigo + 1;

      if (await clienteModel.findOne({ email: cliente.email })) {
        return res.status(400).send({ error: 'Cliente já cadastrado!' });
      }

      const resultado = await clienteModel.create(cliente);
      auth.incluirToken(resultado);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar cliente', error });
    }
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
    try {
      const codigo = req.params.codigo;
      const cliente = await clienteModel.findOne({ 'codigo': codigo });

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      const _id = String(cliente._id);
      const novosDados = req.body;

      // Verificar se a imagem do cliente foi enviada na requisição
      if (req.file) {
        novosDados.avatar = req.file.buffer;
      }

      await clienteModel.findByIdAndUpdate(_id, novosDados);
      res.status(201).json({ send: 'Cliente atualizado' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o cliente' });
    }
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