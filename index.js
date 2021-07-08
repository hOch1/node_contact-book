const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://h0ch1:a02070203@nodetest.kijps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const db = mongoose.connection;

db.once('open', () =>{
    console.log('DB connected');
});

db.on('error', (err) => {
    console.log("DB ERROR :", err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// DB schma
var contactSchma = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String},
    phone:{type:String}
});
var Contact = mongoose.model('contact', contactSchma);

// Routes
//Home
app.get('/', (req, res) => {
    res.redirect('/contacts');
});
// Contacts - Index
app.get('/contacts', (req, res) => {
    Contact.find({}, (err, contacts) => {
        if(err) return res.json(err);
        res.render('contacts/index', {contacts:contacts});
    });
});
// Contacts - New
app.get('/contacts/new', (req, res) => {
    res.render('contacts/new');
});
// Contacts - create
app.get('/contacts', (req, res) => {
    Contact.create(req.body, (err, contact) => {
        if(err) return res.json(err);
        res.redirect('/contacts');
    });
});
// Server start

app.listen(8008, () =>{
    console.log('server start!');
});