const httpConstants = require('http2').constants;

const statusOk = httpConstants.HTTP_STATUS_OK;
const statusCreated = httpConstants.HTTP_STATUS_CREATED;
const statusModified = httpConstants.HTTP_STATUS_OK;
const statusNotFound = httpConstants.HTTP_STATUS_NOT_FOUND;
const statusBadRequest = httpConstants.HTTP_STATUS_BAD_REQUEST;
const statusServerError = httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
const statusConflictError = httpConstants.HTTP_STATUS_CONFLICT;
const statusDenied = httpConstants.HTTP_STATUS_UNAUTHORIZED;
const statusForbidden = httpConstants.HTTP_STATUS_FORBIDDEN;

const linkRegExp = /^https?[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?$/;
const urlRegExp = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/;
const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$/;

const DEV_SECRET_KEY = '31bf9fcad3e346819659afb7e1270dc7161985a7b6e7c85e6246b389e33754ad';

const whitelist = [
  'http://localhost:3000',
  'http://suestado.nomoredomains.work',
  'https://suestado.nomoredomains.work',
  'http://api.suestado.nomoredomains.work',
  'https://api.suestado.nomoredomains.work',
];

// const corsOptions = {
//   origin: '*',
//   credentials: true,
//   optionSuccessStatus: 200,
// };

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = {
  statusOk,
  statusCreated,
  statusModified,
  statusNotFound,
  statusBadRequest,
  statusServerError,
  statusConflictError,
  statusDenied,
  statusForbidden,
  DEV_SECRET_KEY,
  linkRegExp,
  urlRegExp,
  emailRegExp,
  corsOptions,
};
