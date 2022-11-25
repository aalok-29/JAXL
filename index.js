require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const bodyParser = require('body-parser');
// const otpGenerator = require('otp-generator');
app.use(bodyParser.urlencoded({extended:true}));

const { User } = require("./models/user");

connection();

// function genOtp(){
//     const OTP = otpGenerator.generate(6, {
//         digits: true, alphabets: false, upperCase: false, specialChars: false
//     });
//     return OTP;
// }
// var otp;

app.use(express.json());
app.use(cors());

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/login.html");
});
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'))
})
app.get('/verify.html',function(req,res) {
    res.sendFile(path.join(__dirname,'verify.html'));
  });
  app.get('/loggedIn.html',function(req,res) {
    res.sendFile(path.join(__dirname,'loggedIn.html'));
  });
app.use("/", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
