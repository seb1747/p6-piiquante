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
 
    Sauce.findOne({_id: req.params.id}).then((sauce) =>{
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`,()=> {
      const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
      : { ...req.body};
      Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({ message: "sauce modifié !  "}))
      .catch((error) => res.status(400).json({error}));
    })
})
};
// controlleur pour supprimé une sauce 

exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({message: 'la sauce à été supprimé ! '}))
      .catch((error) => res.status(400).json({error}));
    })
  })
  .catch((error) => res.status(500).json({error}));
}
       
      

exports.likeNDislike = (req,res,next) => {
  let like = req.body.like;
  let userId  = req.body.userId;
  let sauceId = req.params.id;
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