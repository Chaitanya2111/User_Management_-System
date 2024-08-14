require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

require('./config/dbConnection');

const userRouter = require('./routes/userRoute')

const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/api',userRouter);

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
// error handling

app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server error";
    res.status(err.statusCode).json({
        message:err.message
    });
});

PORT = process.env .PORT || 8090

app.listen(PORT,function(){
    console.log(`server is running on port ${PORT}`)
})

