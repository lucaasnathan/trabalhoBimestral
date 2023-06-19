const categoriaModel = require('../models/categoriaModel');

class CategoriaController {
  async cadastrar(req, res) {
    const categoria = req.body;
    const max = await categoriaModel.findOne({}).sort({ codigo: -1 });
    categoria.codigo = max == null ? 1 : max.codigo + 1;

    const resultado = await categoriaModel.create(categoria);
    res.status(201).json(resultado);
  }

  async listar(req, res) {
    const resultado = await categoriaModel.find({});
    res.status(200).json(resultado);
  }

  async buscarPorCodigo(req, res) {
    const codigo = req.params.codigo;
    const resultado = await categoriaModel.findOne({ codigo });

    if (!resultado) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.status(200).json(resultado);
  }

  async atualizar(req, res) {
    const codigo = req.params.codigo;
    const categoria = await categoriaModel.findOne({ codigo });

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    const novosDados = req.body;

    await categoriaModel.findOneAndUpdate({ codigo }, novosDados);
    res.status(200).send();
  }

  async excluir(req, res) {
    const codigo = req.params.codigo;
    const categoria = await categoriaModel.findOne({ codigo });

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    await categoriaModel.findOneAndRemove({ codigo });
    res.status(200).send();
  }
}

module.exports = new CategoriaController();