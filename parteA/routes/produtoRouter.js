const express = require('express');
const router = express.Router();
const multer = require('multer');
const produtoController = require('../controllers/produtoController');

// Configuração do Multer para salvar a imagem do produto
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/', upload.single('imagem'), produtoController.cadastrar);
router.get('/', produtoController.listar);
router.get('/:codigo', produtoController.buscarPorCodigo);
router.put('/:codigo', upload.single('imagem'), produtoController.atualizar);
router.delete('/:codigo', produtoController.excluir);

module.exports = router;