'use strict'

var express = require('express');
var PromotionController = require('../controllers/promotion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/promotions', md_auth.ensureAuth, PromotionController.getPromotions);
api.get('/promotions/:id', md_auth.ensureAuth, PromotionController.getPromotionById);
api.post('/promotions', md_auth.ensureAuth, PromotionController.createPromotion);
api.put('/promotions/:id', md_auth.ensureAuth, PromotionController.updatePromotion);
api.delete('/promotions/:id', md_auth.ensureAuth, PromotionController.deletePromotion);

module.exports = api;