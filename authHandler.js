const { httpUtil,messages} = require('./constants');
const { userMessages } = messages;

exports.dummy =  (req, res) => {
    try { 
      return res.json(httpUtil.getCreated('Hello Auth!'));
    } catch (error) {
        console.log(error);
      return res.json(httpUtil.getException(userMessages.LOGIN_FAILED));
    }
  };

