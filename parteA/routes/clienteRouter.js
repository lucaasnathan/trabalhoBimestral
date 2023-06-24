const express = require('express');
const router = express.Router();
const multer = require('multer');
const clienteController = require('../controllers/clienteController');

// Configuração do Multer para salvar a imagem do cliente
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/', upload.single('avatar'), clienteController.cadastrar);
router.get('/', clienteController.listar);
router.get('/:codigo', clienteController.buscarPorCodigo);
router.put('/:codigo', upload.single('avatar'), clienteController.atualizar);
router.delete('/:codigo', clienteController.excluir);



module.exports = router;
