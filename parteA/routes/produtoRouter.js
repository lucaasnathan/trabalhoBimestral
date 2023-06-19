const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/', produtoController.cadastrar);
router.get('/', produtoController.listar);
router.get('/:codigo', produtoController.buscarPorCodigo);
router.put('/:codigo', produtoController.atualizar);
router.delete('/:codigo', produtoController.excluir);

module.exports = router;