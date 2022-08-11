//import package express
const { application } = require('express');
const express = require ('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')

mongoose.connect('mongodb+srv://seb1747:N3vCvkkz2H4JxnPK@cluster0.jl1vp.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('connexion à mongoDB réussi'))
 .catch(() => console.log('connexion à mongoDB échoué !'));
// creation de l 'application 
const app = express();

app.use(express.json());

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});
app.get('/',(req,res) => {
res.end('hello world')}),
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)
//export de l'app
module.exports = app;