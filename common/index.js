
const { httpUtil,messages } = require('../constants');


const { ValidationError } = messages;

// message reducer for joi validation errors
const validationMsgReducer = (errorMessage, { message }) => {
  const error = message.replace(/['"]+/g, '');
  return `${errorMessage}, ${error}`;
};

// it will handle all exceptions/errors globally and return json respone
const exceptionMiddleware = (err, req, res, next) => {
  const { details, code, name, message } = err;
  if (name === ValidationError && Array.isArray(details)) {
    const message = details.reduce(validationMsgReducer, '');
    res.json(httpUtil.getBadRequest([code, message]));
  } else {
    res.json(httpUtil.getException([code, message]));
  }
};

// it will handle all unknown routes
const unknownRoutesMiddleware = (req, res) => {
  res.json(httpUtil.getBadRequest());
};

module.exports = {
  unknownRoutesMiddleware,
  validationMsgReducer,
  exceptionMiddleware

};



