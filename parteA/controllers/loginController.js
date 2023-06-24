const clienteModel = require('../models/clienteModel');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class LoginController {

  async login(req, res) {
      try {
          const { email, senha } = req.body;
          const cliente = await clienteModel.findOne({ 'email': email }).select('+senha')
          
          if (!cliente) {
              return res.status(400).send({ error: 'Usuário não encontrado!' });
          }

          const senhaCorreta = await bcryptjs.compare(senha, cliente.senha);
          if (!senhaCorreta) {
              return res.status(400).send({ error: 'Senha inválida!' });
          }

          await auth.incluirToken(cliente);
          res.status(200).json(cliente);
      } catch (error) {
          console.error('Erro no login:', error);
          res.status(500).send({ error: 'Ocorreu um erro no servidor.' });
      }
  }
}

module.exports = new LoginController();
