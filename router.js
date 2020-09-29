const express = require('express');

const {
    ENTITY_URL
} = require('./constants/apiConfig');
const handler = require('./authHandler');
const userHandler = require('./userHandler');
const {
    asyncMiddleware: _async
} = require('./constants/asyncMiddleware');

const router = express.Router();

//App2
router.get(ENTITY_URL.AUTH + '/hello-world', [_async(handler.dummy)]);

//App1
/**
 * This method is for create the user
 * @param {object} body
 */
router.post(ENTITY_URL.USER + '/', [_async(userHandler.save)]);
/**
 * This method is for login to the application 
 * @param {String} emailId
 * @param {String} password
 */
router.get(ENTITY_URL.USER + '/', [_async(userHandler.login)]);
/**
 * This method is for find all the user in application. 
 */
router.get(ENTITY_URL.USER +'/find-all', [_async(userHandler.getAllUser)]);
/**
 * This method is for login to the application 
 * @param {String} emailId
 * @param {String} password
 */
router.post(ENTITY_URL.USER + '/add-money', [_async(userHandler.addMoney)]);
/**
 * This method is for fetching all the transaction history.
 */
router.get(ENTITY_URL.USER + '/get-trascation', [_async(userHandler.getTransactionHistory)]);
/**
 * This method is for Current Balance of the User
 */
router.get(ENTITY_URL.USER + '/current-balance', [_async(userHandler.currentBalance)]);
/**
 * This method is for logout i.e it will end the session and storing in file.
 */
router.get(ENTITY_URL.USER + '/logout', [_async(userHandler.logout)]);


module.exports = router;