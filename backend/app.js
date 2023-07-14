require('dotenv').config();
const express = require('express');
const { connect: mongooseConnect, connection: mongooseConnection } = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/router');
const errorsGlobalHandler = require('./middlewares/errorsGlobalHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000 } = process.env;
const app = express();

mongooseConnect('mongodb://127.0.0.1/mestodb', {
  useUnifiedTopology: true,
});
mongooseConnection.on('error', (err) => console.log(`Ошибка подключения к базе данных: ${err}`));
mongooseConnection.once('open', () => console.log('Подключение к базе данных установлено'));

app.use(cookieParser());
app.use(cors({ origin: 'http://suestado.nomoredomains.work', credentials: true }));

app.use(express.json());
app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsGlobalHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
