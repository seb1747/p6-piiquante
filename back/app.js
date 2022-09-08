//import package express
const { application } = require('express');
const express = require ('express');
//import module path pour la gestion de chemins de stockage
const path  = require('path');
//imort du module pour la gestion des headers 
const cors = require('cors');
//import du module pour la base de données
const mongoose = require('mongoose');
//import de dotenv pour cacher les id et password
const dotenv = require('dotenv');
dotenv.config();
//import de la variabe d'environnement de connection à la base da données
const MONGODB_URI = process.env.MONGODB_URI 
 
// import du moodule pour limiter le nombre de requete possiblepar un même utilisateur 
const rateLimiter = require('express-rate-limit');

const connectLimiter= rateLimiter({
    windowMs: 15 * 60 * 1000,//15 minutes
    max: 5, //nombre de requete maximum pour un même ip 
    standardHeaders: true,
    legacyHeaders: false,
})

//import des route
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')

//import module morgan pour l'aide au developpement retourne les requetes dans la console 

const morgan = require('morgan');
//import module helmet protection contre les attaques de type injection
const helmet = require('helmet')


//connection à la base de donnéess 

mongoose.connect(MONGODB_URI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('connexion à mongoDB réussi'))
 .catch(() => console.log('connexion à mongoDB échoué !'));
// creation de l 'application 
const app = express();
//mise en place des headers
app.use(cors());
//mise en place du paare-feu helmet
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'same-site'}))
app.use(morgan("dev"));


app.use(express.json());


app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes, connectLimiter);

//export de l'app
module.exports = app;
