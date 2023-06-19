const categoriaModel = require('../models/categoriaModel');
const produtoModel = require('../models/produtoModel');
const Produto = require('../models/produtoModel');

class ProdutoController {
  async cadastrar(req, res) {
    const max = await produtoModel.findOne({}).sort({ codigo: -1 });
    const produto = req.body;
    produto.codigo = max == null ? 1 : max.codigo + 1;

    const categoria = await categoriaModel.findOne({ codigo: produto.categoria.codigo });
    produto.categoria = categoria._id;

    const resultado = await produtoModel.create(produto);

    // Calcular a média das notas dos comentários
    if (produto.comentarios && produto.comentarios.length > 0) {
      const notas = produto.comentarios.map(comentario => comentario.nota);
      const notaGeral = notas.reduce((total, nota) => total + nota, 0) / notas.length;
      resultado.notaGeral = parseFloat(notaGeral.toFixed(2));
      await resultado.save();
    }

    res.status(201).json(resultado);
  }

  async listar(req, res) {
    try {
      const resultado = await Produto.find({});
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar os produtos' });
    }
  }

  async buscarPorCodigo(req, res) {
    const codigo = req.params.codigo;
    try {
      const resultado = await Produto.findOne({ codigo: codigo });
      if (!resultado) {
        res.status(404).json({ message: 'Produto não encontrado' });
      } else {
        res.status(200).json(resultado);
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o produto' });
    }
  }

  async atualizar(req, res) {
    const codigo = req.params.codigo;
    const novosDados = req.body;

    try {
      const categoria = await categoriaModel.findOne({ codigo: novosDados.categoria.codigo });
      novosDados.categoria = categoria._id;

      const resultado = await Produto.findOneAndUpdate({ codigo: codigo }, novosDados, { new: true });
      if (!resultado) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      // Recalcular a média das notas dos comentários
      if (resultado.comentarios && resultado.comentarios.length > 0) {
        const notas = resultado.comentarios.map(comentario => comentario.nota);
        const notaGeral = notas.reduce((total, nota) => total + nota, 0) / notas.length;
        resultado.notaGeral = parseFloat(notaGeral.toFixed(2));
        await resultado.save();
      }

      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar o produto' });
    }
  }



  async excluir(req, res) {
    const codigo = req.params.codigo;
    try {
      const resultado = await Produto.findOneAndRemove({ codigo: codigo });
      if (!resultado) {
        res.status(404).json({ message: 'Produto não encontrado' });
      } else {
        res.status(200).send();
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o produto' });
    }
  }
}

module.exports = new ProdutoController();
