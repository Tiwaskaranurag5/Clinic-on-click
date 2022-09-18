const express = require('express')

const cors = require('cors')
const bcrypt  = require('bcrypt')
const utils = require('./utils')
const app = express()
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const session = require("express-session")

const saltRounds = 10;
const db = require('./db')

// app.use(express.json());
app.use(cors(''))
app.use(bodyParser.json())
app.use(express.static('uploads'))
//routers 
const routerDoctor = require('./routes/doctor')
const routerAdmin = require('./routes/admin')
const routerSpeciality = require('./routes/speciality')
//add the routers
app.use('/doctor', routerDoctor)
app.use('/admin', routerAdmin)
app.use('/speciality' , routerSpeciality)


app.post("/register", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const dob = req.body.dob;
    const desc = req.body.desc;

    bcrypt.hash(password, saltRounds, (error, hash)=>{
        if(error)
            console.log(error)
        db.query("INSERT INTO patient (p_name,p_gender,p_phone,p_dob,p_desc,email,password) VALUES (?,?,?,?,?,?,?)", [name, gender, phone, dob, desc, email, hash],
            (err, result) => {
                if (err != null)
                    console.log(err);
                else
                    console.log(result);
            })
    });

})

app.get("/login", (req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn:false})
    }
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM patient where email = ?",email,
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result.length > 0) {
                bcrypt.compare(password , result[0].password, (error, resp)=>{
                    if(resp){
                        req.session.user = result
                        console.log(req.session.user);
                        res.send(result);
                    }
                    else{
                        res.send(utils.createError('invalid user name or password'))
                // res.send({ message: "Wrong username Or password entered " })
                    }
                })
                // res.send(result)
            } else {
                res.send(utils.createError('User doesnot exist'))
                // res.send({ message: "Wrong username Or password entered " })
            }
        })
       
})



app.listen(8000, () => {
    console.log('srver started listening at 8000')
})