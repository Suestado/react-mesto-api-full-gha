require('dotenv').config();
const express = require('express');
const { connect: mongooseConnect, connection: mongooseConnection } = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/router');
const errorsGlobalHandler = require('./middlewares/errorsGlobalHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./utils/constants');

const { PORT = 4000 } = process.env;
const app = express();

mongooseConnect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
});
mongooseConnection.on('error', (err) => console.log(`Ошибка подключения к базе данных: ${err}`));
mongooseConnection.once('open', () => console.log('Подключение к базе данных установлено'));

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json());
app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsGlobalHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
