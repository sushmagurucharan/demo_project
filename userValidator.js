const Joi = require('@hapi/joi');

exports.saveUser = data => {
  const schema = Joi.object()
    .keys({
      emailId: Joi.string()
      
        .required()
        .error(
          () =>
            new Error(
              'emailId is Mandatory Field And Expecting String'
            )
        ),
      password: Joi.string()
        .trim()
        .required()
        .error(
          () =>
            new Error(
                'password is Mandatory Field And Expecting String'
            )
        ),
      isAdmin: Joi.boolean()
        .required()
        .error(() => new Error( 'isAdmin Mandatory Field And Expecting true or false'))
    })
    .unknown();

  return Joi.validate(data, schema);
};


exports.addMoney = data => {
  const schema = Joi.object()
    .keys({
      amount: Joi.number()
      
        .required()
        .error(
          () =>
            new Error(
              'Amount is Mandatory Field And Expecting number'
            )
        ),
        creditedBy: Joi.string()
        .trim()
        .required()
        .error(
          () =>
            new Error(
                'creditedBy is Mandatory Field And Expecting String'
            )
        ),
        creditedTo: Joi.string()
        .required()
        .error(() => new Error( 'creditedTo Mandatory Field And Expecting true or false'))
    })
    .unknown();

  return Joi.validate(data, schema);
};