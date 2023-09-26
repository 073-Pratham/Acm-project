const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Handling Uncaught Exception
process.on("uncaughtException" , (err)=> {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to the Uncaught Exception`);

    process.exit(1);
})

const errorMiddleware = require('./middleware/error');

//Config
dotenv.config({path: "backend/config/config.env"});

connectToMongo();
const app = express();
const PORT = 4000;



const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Available Routes
app.use('/acm' , require('./routes/UserRoute'));

// Middleware for errors
app.use(errorMiddleware)

const server = app.listen(PORT, () => {
    console.log(`Mern Project backend listening at http://localhost:${PORT}`)
  })

// Unhandled Promise Rejection
process.on("unhandledRejection" , (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to the unhandled Promise Rejection`);

  server.close(()=>{
    process.exit(1);
  })
})