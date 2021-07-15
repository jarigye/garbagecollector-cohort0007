// Dependencies
const express = require('express')
const employeeRoutes = require('./routes/employeeRoutes')
const homeRoutes = require('./routes/homeRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const Registration = require('./models/Registration')

require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
//require expre session 
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});


// Instantiations
const app = express()


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

//Configurations
app.set('view engine', 'pug');
app.set('views', './views');

//middleware
app.use(express.urlencoded({extended: true}))
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());

// middleware for serving static files(css,js,images)
 app.use(express.static('public'));
 app.use('/public/images', express.static(__dirname + '/public/images'));

// Routes
app.use('/employee', employeeRoutes);
app.use('/', homeRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

// logout
app.post('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy((err)=> {
          if (err) {
              console.log(err)
          } else {
              return res.redirect('/login');
          }
      })
  }
})
// cater for undefined routes
app.get('*', (req, res)=> {
    res.send('The route specified doesnt exist')
})
  
//Server 
app.listen(3021, () => console.log('listening on port 3021'));
