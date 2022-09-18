
const express = require('express')

const router = express.Router()
const db = require('../db')
const utils = require('../utils')
const multer = require('multer')
const upload = multer({dest : 'uploads/'})

router.post("/specReg", upload.single('spec_icon'), (req, resp) => {

    const spec_name = req.body.spec_name;
    const spec_description = req.body.spec_description;
    const spec_icon = req.file.filename;
    db.query(`INSERT INTO speciality(spec_name,spec_description,spec_icon) VALUES('${spec_name}','${spec_description}','${spec_icon}')`,(error, result) => {
        resp.send(utils.createResult(error,result))
    })
})

router.put("/specUpdate/:spec_id", upload.single('spec_icon'), (req, resp) => {

    const { spec_id } = req.params
    const spec_description = req.body.spec_description;
    const spec_icon = req.file.filename;
    db.query(`UPDATE speciality SET spec_description='${spec_description}', spec_icon= '${spec_icon}' where spec_id='${spec_id}'`,(error, result) => {
        resp.send(utils.createResult(error,result))
    })
})

module.exports = router
