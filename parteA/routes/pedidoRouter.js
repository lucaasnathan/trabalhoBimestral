const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../auth/auth');

router.use(auth.autorizar);

router.post('/', pedidoController.salvar);
router.get('/', pedidoController.listarTodosPedidos);
router.get('/:codigo', pedidoController.listarPedidosPorCliente);
router.put('/:codigo', pedidoController.editarStatus);

module.exports = router;
