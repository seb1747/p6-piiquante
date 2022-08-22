//import package express
const { application } = require('express');
const express = require ('express');
const path  = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
//import de dotenv pour cacher les id et password
const dotenv = require('dotenv');
dotenv.config();
//import de la variabe d'environnement de connection à la base da données
const MONGODB_URI = process.env.MONGODB_URI 
//import des routes 

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')

//import module morgan

const morgan = require('morgan');
//import module helmet protection contre les attaques de type injection
const helmet = require('helmet')



mongoose.connect(MONGODB_URI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('connexion à mongoDB réussi'))
 .catch(() => console.log('connexion à mongoDB échoué !'));
// creation de l 'application 
const app = express();

app.use(cors());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'same-site'}))
app.use(morgan("dev"));


app.use(express.json());

/**app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});*/

app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)
app.use("/images", express.static(path.join(__dirname, "images")));
//export de l'app
module.exports = app;
