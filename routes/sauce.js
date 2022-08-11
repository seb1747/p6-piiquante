//import express
const express = require('express');
//import module router d'express
const router = express.Router();
//imports middleware authentification
const auth = require('../middlewares/auth')
//import middleware multer pour la gestion des images 
const multer = require('../middlewares/multer-config')

//import du controlleur sauce
const sauceCtrl = require('../controllers/sauce');

// route post pour la création d'une sauce 
router.post('/', auth, multer, sauceCtrl.createSauce);

router.get('/:id',auth, sauceCtrl.getOneSauce);

router.get('/' ,auth, sauceCtrl.getAllSauce);



//export module router
module.exports = router;
