
const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose');

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const passport = require('passport');

const homeRoutes = require('./routes/homeRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const orderRoutes = require('./routes/orderRoutes');

// create an express application by calling the express() function
// Instantiations
const app = express();

//db connection
 mongoose.connect(process.env.DATABASE, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex:true,
     useFindAndModify:false
   });

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

//Configs
app.use(express.static('public'));
app.use('/public/images', express.static(__dirname + '/public/images'));
app.set('view engine', 'pug');
app.set('views', './views');


// middleware settings

app.use(express.urlencoded({extended: true}))
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// passport configs
// passport.use(Registration.createStrategy());
// passport.serializeUser(Registration.serializeUser());
// passport.deserializeUser(Registration.deserializeUser());

app.use('/', homeRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/employee', employeeRoutes);
app.use('/order', orderRoutes);

app.get('*',(req,res)=>{
    res.send('error page')
})

//created a server and have it listen on port 3000
app.listen(3020, ()=> console.log('listening on port 3000'))
