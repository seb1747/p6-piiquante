//import du modele sauce
const Sauce = require('../models/sauce');
//import du module fs d'express
const fs  = require ('fs');

//export du controllers creation de sauce 
exports.createSauce = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    
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
  //export du controlleur pour récupérer toutes les sauces 

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
  };
  
// controlleur pour récupérer une sauces 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
    (sauce) => {
        res.status(200).json(sauce);
    }).catch((error) => {
        res.status(404).json({ error: error});
    });
};

// controlleur pour modifié une sauce 
exports.modifySauce = (req, res, next) => {
  // on met en place la logique pour "récupèrer" l'image et la supprimer de la base de données
  if (req.file) {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      // on récupère le nom de l'image
      const imgFile = sauce.imageUrl.split("/images/")[1];
      console.log("l'imageUrl = ", imgFile);

      // on supprime l'image du dossier "images"
      fs.unlink(`images/${imgFile}`, (error) => {
        if (error) throw error;
      });
    });
  }

  // on passe par la condition ternaire pour voir s'il y a un champ "file" ( image ) dans notre "req"
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce), // si oui, on parse pour récupèrer l'objet
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`, // on reconstitue l'URL en faisant appelle aux "propriétés" de l'objet "req"
      }
    : { ...req.body }; // sinon on récupère l'objet directemnt dans le corps de la requête
  // on supprime le userId pour eviter qu'un user créé un objet pour la réattribuer à quelqu'un d'autre
  delete sauceObject._userId;

  // on compare l'objet user avec notre BD pour confirmer que l'objet lui appartient bien
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      console.log(" => userId de la sauce = " + sauce.userId);
      console.log("   => userId de la req = " + req.auth.userId);
      if (sauce.userId != req.auth.userId) {
        // si Id est != de l'id du token => erreur 403 "unauthorized request"
        console.log("differents userId !!!");
        res.status(403).json({ message: "unauthorized request" });
      } else {
        // méthode updateOne pour modifier avec 2 arguments =>
        // le 1er = _id de comparaison à modifier, le 2ème = la nouvelle version de l'objet avec le même _id
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modifiée !!!" }))
          // error 401 pour dire que l'objet n'est pas trouvé
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error })); // si l'ojet ne lui appartient pas
};


// controlleur pour supprimé une sauce 

exports.deleteOneSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
  .then(() =>
    res.status(200).json({ message: "La sauce à bien été suprimée !" })
  )
  .catch((error) => res.status(403).json({ error }));
}
       
      

exports.likeNDislike = (req,res,next) => {
  let like = req.body.like;
  let userId  = req.body.userId;
  let sauceId = req.body.id;
  console.log(like);
  console.log(userId);
  console.log(sauceId);

  switch (like) {
    // like = case est égal à 1 on incremente le like de +1
    case 1:
     Sauce.updateOne(
      {
        _id: sauceId
      },
      {
        $push: {usersLiked: userId}, $inc: {likes: +1}
      }
     )
     .then(() => {
      res.status(200).json({ message: "like ajouté !" });
     })
     .catch((error) => res.status(400).json({error}));
     break;

     case 0 :
      Sauce.findOne({_id: sauceId})
      .then((sauce) =>{

        if (sauce.usersLiked.includes(userId)){
          Sauce.updateOne({_id: sauceId},
            {$pull: {usersLiked: userId}, $inc: {likes:-1}}
            )
            .then(() => res .status(200).json({message: "like modifié !"}))
            .catch((error) => res.status(400).json({error}));
        }
        if (sauce.usersDisliked.includes(userId)){
          Sauce.updateOne({_id: sauceId},
            {$pull: {usersDisliked: userId}, $inc: {likes: -1}})
            .then (() => res.status(200).json({message: "disliked modifié !"}))
            .catch((error) => res.status(400).json({error}));
        }
      })
      .catch((error) => res.status(404).json({error}));
      break;

    case -1:
      Sauce.updateOne({_id: sauceId},
      {$push: {usersDisliked : userId}, $inc: {dislikes: +1}})
      .then(() => res.status(200).json({message: "disliked ajouté!"}))
      .catch((error) => res.status(400).json({error}));
      break;

      default:console.log(error);
  }
}