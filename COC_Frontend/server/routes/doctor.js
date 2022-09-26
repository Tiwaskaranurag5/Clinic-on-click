const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')
const bcrypt = require('bcrypt')

const multer = require('multer')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
// var mogran = require('morgan')
const upload = multer({ dest: 'uploads/' })


//Imported FIles
const app = express()



//For Password hasing
const saltRounds = 10

router.get('/:spec_id', (req, resp) => {
    const { spec_id } = req.params
    const query = `select doctor.* from doctor where doctor.sp_id = ${spec_id}`
    db.query(query, (error, doctors) => {
        resp.send(utils.createResult(error, doctors))
    })
})

const uploads = upload.fields([{ name: 'd_verification_doc', maxCount: 1 }, { name: 'd_profile_pic', maxCount: 1 }])

router.post("/register", uploads, (req, res) => {

    const sp_id = req.body.sp_id
    const email = req.body.email;
    const password = req.body.password;
    const d_name = req.body.name;
    const d_phone = req.body.phone;
    const d_desc = req.body.desc;
    const d_city = req.body.d_city;
    const d_exp = req.body.d_exp;
    const d_fees = req.body.d_fees;
    const d_regno = req.body.d_regno;
    const d_profile_pic = req.files['d_profile_pic'][0];
    const d_verification_doc = req.files['d_verification_doc'][0];
    // const filename = req.file.filename;
    // const d_profile_pic = req.file.d_profile_pic;
    // const fileName = req.file.fileName;

    bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error)
            console.log(error)
        db.query(`INSERT INTO doctor(d_name,sp_id,d_phone,d_city,d_description,d_registration_no,d_exp,d_fees,email,password,d_profile_pic,d_verification_doc) VALUES('${d_name}',${sp_id}, '${d_phone}', '${d_city}', '${d_desc}', '${d_regno}', ${d_exp} ,${d_fees} ,'${email}','${hash}', '${d_profile_pic.filename}' , '${d_verification_doc.filename}' )`, // incomplete 
            (err, result) => {
                if (err != null)
                    console.log(err);
                else
                    console.log(result);
                res.send(result);
            })
    });

})

module.exports = router