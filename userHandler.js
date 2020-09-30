const admin = require('firebase-admin');
const {
  httpUtil,
  messages
} = require('./constants');
const {
  userMessages
} = messages;
const validator = require('./userValidator');
const {
  groupBy,
  sumBy
} = require('lodash');


exports.save = async (req, res) => {
  await validator.saveUser(req.body);
  try {
    const inputData = req.body;
    const p2 = await validateEmail(inputData.emailId);
    if (p2) {
      return res.json(httpUtil.getException(userMessages.USER_EXISTS))
    }
    const data = {
      emailId: inputData.emailId,
      password: inputData.password,
      isAdmin: inputData.isAdmin
    }
    const db = admin.firestore();
    const docRef = await db.collection('Users')
      .add(data);
    return res.json(httpUtil.getCreated(docRef.id));

  } catch (error) {
    console.log(error);
    return res.json(httpUtil.getException(userMessages.USER_CREATION_FAILED));
  }
};

const validateEmail = async (emalId) => {
  const db = admin.firestore();
  const userRef = db.collection('Users');
  const snapshot = await userRef.where('emailId', '==', `${emalId}`).get();
  if (snapshot.empty) {
    return false;
  }
  return true;
}


// login verification
exports.login = async (req, res) => {
  try {
    const {
      emailId,
      password
    } = req.query;
    if (!emailId || !password) return res.json(httpUtil.getUnauthorized(userMessages.INPUT_REQUIRED));
    const db = admin.firestore();
    const userRef = db.collection('Users');
    const snapshot = await userRef.where('emailId', '==', `${emailId}`).where('password', '==', `${password}`).get();
    if (snapshot.empty) {
      return res.json(httpUtil.getAccessDenined(userMessages.LOGIN_FAILED));
    }

    response = [];
    snapshot.forEach(doc => {
      response.push(doc.data());
      req.session.userId = doc.id;
      req.session.admin = doc.data().isAdmin;
      req.session.loginTime = Date.now();
      req.session.emailId = doc.data().emailId;
    });
    return res.json(httpUtil.getSuccess(response));
  } catch (error) {
    console.log(error);
    return res.json(httpUtil.getException(userMessages.LOGIN_FAILED))
  }

};


// read all
exports.getAllUser = async (req, res) => {
  try {
    const db = admin.firestore();
    let query = db.collection('Users');
    let response = [];
    await query.get().then(querySnapshot => {
      let docs = querySnapshot.docs;
      for (let doc of docs) {
        const selectedItem = {
          id: doc.id,
          item: doc.data()
        };
        response.push(selectedItem);
      }
      return response;
    });
    return res.json(httpUtil.getSuccess(response));
  } catch (error) {
    console.log(error);
    return res.json(httpUtil.getException(userMessages.ALL_USER_FAILED))
  }
}


exports.addMoney = async (req, res) => {
  let {
    body
  } = req;
  if (!req.session) return res.json(httpUtil.getAccessDenined(userMessages.ACESS_DENIED));
  body.creditedBy = req.session.userId;
  await validator.addMoney(body);
  try {

    let data = {
      amount: body.amount,
      creditedBy: body.creditedBy,
      creditedTo: body.creditedTo,
      creditedOn: Date.now()
    }
    const db = admin.firestore();
    let docRef = db.collection('user_payment')
      .add(data);
    return res.json(httpUtil.getCreated(docRef.id));
  } catch (error) {
    console.log(error);
    return res.json(httpUtil.getException(userMessages.ADD_MONEY_FAILED))
  }
}

exports.getTransactionHistory = async (req, res) => {
  try {
    const db = admin.firestore();

    let users = [];
    let loadedPosts = {};
    let p1 = db.collection('Users').get();
    let p2 = db.collection('user_payment').get();

    [p1, p2] = await Promise.all([p1, p2]);

    p1.forEach(doc => {
      users[doc.id] = doc.data();
    });

    p2.forEach(doc => {
      loadedPosts[doc.id] = doc.data();
      loadedPosts[doc.id].creditedOn = new Date(loadedPosts[doc.id].creditedOn).toUTCString()
      loadedPosts[doc.id].creditedBy = users[`${doc.data().creditedBy}`].emailId;
      loadedPosts[doc.id].creditedTo = users[`${doc.data().creditedTo}`].emailId;
      return loadedPosts;
    });
    return res.json(httpUtil.getSuccess(loadedPosts));
  } catch (error) {
    console.log(error);
    return res.json(httpUtil.getException(userMessages.GET_TRANSACTION_FAILED))
  }
}


exports.currentBalance = async (req, res) => {
  try {
    if (!req.session.admin) return res.json(httpUtil.getAccessDenined(userMessages.ACESS_DENIED));
    const db = admin.firestore();
    let users = [];
    let loadedPosts = [];
    let result = {};
    let p1 = db.collection('Users').get();
    let p2 = db.collection('user_payment').get();
    [p1, p2] = await Promise.all([p1, p2]);
    p1.forEach(doc => {
      users[doc.id] = doc.data();
    });
    p2.forEach(doc => {
      loadedPosts.push(doc.data());
    });
    result = groupBy(loadedPosts, 'creditedTo')
    let finalResult = [];
    Object.keys(result).map(e => {
      let amount = 0;
      amount += sumBy(result[e], "amount");
      const data = {
        user: users[`${result[e][0].creditedTo}`].emailId,
        amount: amount
      }
      finalResult.push(data);
    });
    return res.json(httpUtil.getSuccess(finalResult));
  } catch (error) {
    console.log(error);
    return res.json(httpUtil.getException(userMessages.GET_CURRENT_BALANCE_FAILED))
  }
}

exports.logout = async (req, res) => {
  try {
    if (!req.session) return res.json(httpUtil.getAccessDenined(userMessages.ACESS_DENIED));
    const data = {
      emailId: req.session.emailId,
      userId: req.session.userId,
      login_time: req.session.loginTime,
      logout_time: Date.now()
    }
    var fs = require('fs');
    fs.appendFile('test.txt', JSON.stringify(data) + '\r\n', function (err, result) {
      if (err) console.log('error', err);
    });
    req.session.destroy();
    return res.json(httpUtil.getSuccess("Logout Successfully"));
  } catch (err) {
    console.log(error);
    return res.json(httpUtil.getException(userMessages.LOGOUT_FAILED))
  }
}