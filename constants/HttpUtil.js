
/**
 * If request is sucess
 *
 * @param {any} payLoad It is any value to send as response.
 * @param {string} errorMessage It is string value to send as respone message
 * @return {object} {status=200, errorCode=null, errorMessage='OK', payLoad=data }
 */
exports.getSuccess = (payLoad = null, errorMessage = 'OK') => ({
  status: 200,
  errorCode: null,
  errorMessage,
  payLoad
});

/**
 * If resource is created.
 *
 * @param {any} payLoad It is any value to send as response.
 * @param {string} errorMessage It is string value to send as respone message
 * @return {object} {status=201, errorCode=null, errorMessage='Created', payLoad=data }
 */
exports.getCreated = (payLoad = null, errorMessage = 'Created') => ({
  status: 201,
  errorCode: null,
  errorMessage,
  payLoad
});

/**
 * If any invalid request or request data.
 *
 * @param {array} error It is an array of error code and error message.
 * @return {object} {status=400, errorCode=error[0], errorMessage='Bad Request', payLoad=null }
 */
exports.getBadRequest = (error = [null, 'Bad Request']) => ({
  status: 400,
  errorCode: error[0],
  errorMessage: error[1],
  payLoad: null
});

/**
 * If any server side Exception.
 *
 * @param {array} error It is an array of error code and error message.
 * @return {object} {status=500, errorCode=error[0], errorMessage='Internal Server Error', payLoad=null }
 */
exports.getException = (error = [null, 'Internal Server Error']) => ({
  status: 500,
  errorCode: error[0],
  errorMessage: error[1],
  payLoad: null
});

/**
 * If any Unauthorized request.
 *
 * @param {array} error It is an array of error code and error message.
 * @return {object} {status=401, errorCode=error[0], errorMessage='Unauthorized', payLoad=null }
 */
// UNAUTHORIZED(401, "Unauthorized"),
exports.getUnauthorized = (error = [null, 'Unauthorized']) => ({
  status: 401,
  errorCode: error[0],
  errorMessage: error[1],
  payLoad: null
});

/**
 * If Access denined.
 *
 * @param {array} error It is an array of error code and error message.
 * @return {object} {status=403, errorCode=error[0], errorMessage='Forbidden', payLoad=null }
 */
exports.getAccessDenined = (error = [null, 'Forbidden']) => ({
  status: 403,
  errorCode: error[0],
  errorMessage: error[1],
  payLoad: null
});

/**
 * If Requested data or record is not found.
 *
 * @param {array} error It is an array of error code and error message.
 * @return {object} {status=404, errorCode=error[0], errorMessage='Not Found', payLoad=null }
 */
exports.getBadRequest = (error = [null, 'Not Found']) => ({
  status: 404,
  errorCode: error[0],
  errorMessage: error[1],
  payLoad: null
});
