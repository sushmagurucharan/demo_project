exports.ValidationError = 'ValidationError';


exports.databaseURL= "https://fir-api-9a206..firebaseio.com";

exports.COMMON = {
  SUCESS: 'OK',
  CREATED: 'Created',
  UNAUTHORIZED: ['USER_00_01', 'Unauthorized'],
  FORBIDDEN: ['USER_00_02', 'Forbidden'],
  NOT_FOUND: ['USER_00_03', 'Not Found']
};

exports.userMessages = {
  USER_CREATION_FAILED: ['USER_00_01', 'User Creation Failed'],
  USER_EXISTS: ['USER_00_02', 'User Exists'],
  LOGIN_FAILED:  ['USER_00_03', 'Wrong Password Or Email'],
  INPUT_REQUIRED:  ['USER_00_03', 'Please Enter Password And UserName'],
  ACESS_DENIED: ['USER_00_04', 'You can only see this after you have logged in '],
  ALL_USER_FAILED: ['USER_00_05', 'Fetch All User failed '],
  ADD_MONEY_FAILED: ['USER_00_06', 'Add Money Failed'],
  GET_TRANSACTION_FAILED: ['USER_00_07','Get Transaction Failed'],
  GET_CURRENT_BALANCE_FAILED: ['USER_00_08','Get current Balance Failed'],
  LOGOUT_FAILED:['USER_00_09','Logout Failed']
 
};

exports.getMessage = (code, message) => [code, message];

exports.newError = ([code, message]) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

// NOTE: Don't convert to array function
function Exception(code, message) {
  const error = new Error(message);
  error.code = code;
  error.name = 'Exception';
  Object.setPrototypeOf(error, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, Exception);
  }
  return error;
}

exports.Exception = Exception;
