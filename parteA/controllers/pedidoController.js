const Pedido = require('../models/pedidoModel');
const Produto = require('../models/produtoModel');
const Cliente = require('../models/clienteModel');


class PedidoController {

  async salvar(req, res) {
    try {
      const max = await Pedido.findOne({}).sort({ codigo: -1 });
      const pedido = req.body;
      pedido.codigo = max == null ? 1 : max.codigo + 1;
  
      // Busca o cliente pelo código cadastrado no pedido
      const cliente = await Cliente.findOne({ codigo: pedido.cliente.codigo });
      pedido.cliente = cliente._id;
  
      // Atualiza os IDs dos produtos para os IDs cadastrados
      for (let i = 0; i < pedido.produtos.length; i++) {
        const produto = await Produto.findOne({ codigo: pedido.produtos[i].produto.codigo });
        pedido.produtos[i].produto = produto._id;
      }
  
      // Calcula a quantidade total
      let quantidadeTotal = 0;
      pedido.produtos.forEach((produto) => {
        quantidadeTotal += produto.quantidade;
      });
  
      pedido.quantidadeTotal = quantidadeTotal;
  
      const resultado = await Pedido.create(pedido);
  
      res.status(201).json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao salvar o pedido' });
    }
  }

  async editarStatus(req, res) {
    try {
      const { codigo } = req.params;
      const { status } = req.body;
  
      // Verifica se o pedido existe
      const pedido = await Pedido.findOne({ codigo: codigo });
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
  
      // Atualiza o status do pedido
      pedido.status = status;
      await pedido.save();
  
      return res.json(pedido);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar o status do pedido' });
    }
  }

  async listarPedidosPorCliente(req, res) {
    try {
      const { codigo } = req.params;
  
      // Busca o cliente pelo código
      const cliente = await Cliente.findOne({ codigo });
  
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
  
      // Busca os pedidos associados ao cliente
      const pedidos = await Pedido.find({ cliente: cliente._id });
  
      return res.json(pedidos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar os pedidos do cliente' });
    }
  }

async listarTodosPedidos(req, res) {
  try {
    const pedidos = await Pedido.find();

    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar todos os pedidos' });
  }
}

  
}

module.exports = new PedidoController();
