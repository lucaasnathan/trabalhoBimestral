require('./database/mongodb');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Rotas para chamar endponts e fazer os testes
var indexRouter = require('./routes/index');
var clienteRouter = require('./routes/clienteRouter');
var categoriaRouter = require('./routes/categoriaRouter');
var produtoRouter = require('./routes/produtoRouter');
var pedidoRouter = require('./routes/pedidoRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cliente', clienteRouter);
app.use('/categoria', categoriaRouter);
app.use('/produto', produtoRouter);
app.use('/pedidos', pedidoRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const mongoose = require('mongoose')
const fs = require('fs');

mongoose.connect(
  'mongodb://localhost:27017/myapp',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        avatar: {
            type: Buffer, // casted to MongoDB's BSON type: binData
            required: true
        }
    }));

const userData = {
      username: 'krishnav',
      avatar: fs.readFileSync(`passport.jpeg`),
  }

  const user = new User(userData);
  user.save()
      .then(() => console.log('User salvo com suscesso !'))
      .then(() => mongoose.connection.close(() => console.log('Conexão fechada com sucesso')))
      .catch((err) => console.log(`Erro ao salvar usuário: ${err}`));


module.exports = app;
