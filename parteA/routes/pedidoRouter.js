const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.salvar);
router.get('/', pedidoController.listarTodosPedidos);
router.get('/:codigo', pedidoController.listarPedidosPorCliente);
router.put('/:codigo', pedidoController.editarStatus);

module.exports = router;
