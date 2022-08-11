//import du modele sauce
const Sauce = require('../models/sauce');
//import du module fs d'express
const fs  = require ('fs');

//export du controllers creation de sauce 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    sauce
      .save()
      .then(() => res.status(201).json({ message: "Sauce enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  };
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
  };
  

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
    (sauces) => {
        res.status(200).json(sauce);
    }).catch((error) => {
        res.status(404).json({ error: error});
    });
}