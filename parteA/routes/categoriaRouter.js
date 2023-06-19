const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.post('/', categoriaController.cadastrar);
router.get('/', categoriaController.listar);
router.get('/:codigo', categoriaController.buscarPorCodigo);
router.put('/:codigo', categoriaController.atualizar);
router.delete('/:codigo', categoriaController.excluir);

module.exports = router;