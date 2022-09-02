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
// route pour récupérer une sauce 
router.get('/:id',auth, sauceCtrl.getOneSauce);
// route pour récupérer toute les sauces
router.get('/' ,auth, sauceCtrl.getAllSauce);
// route pour modifié  une sauce
router.put('/:id',auth, multer, sauceCtrl.modifySauce);
//route pour supprimé une sauce 
router.delete('/:id', auth, multer,  sauceCtrl.deleteOneSauce)
// route pout liker ou disliker une sauce 
router.post('/:id/like', auth, sauceCtrl.likeNDislike)


//export module router
module.exports = router;
