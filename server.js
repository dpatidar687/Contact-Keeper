const express = require('express');
const connectDB = require('./config/db');


const App = express();
App.get('/',(req,res)=>{
  res.json({msg:'Welcome to contact keeper api...'});
})

//Connect Database
connectDB();

//Init Middleware to enble accessing data from the routes to the server, Now it is included in express but before, we have to install body-parser
App.use(express.json({ extended: false })); 

// Define Routes
App.use('/api/users',require('./routes/users'));
App.use('/api/auth',require('./routes/auth'));
App.use('/api/contacts',require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
App.listen(PORT ,() => console.log(`Server started on port ${PORT}`));