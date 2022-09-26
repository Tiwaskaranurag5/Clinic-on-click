const express = require('express')
const router = express.Router()


const db = require('../db')
const utils = require('../utils')

router.get('/' , (req,res) => {
    const query = 'SELECT * FROM speciality';
    db.query(query , (err, specialities) => {
        res.send(utils.createResult(err,specialities));
    })
})

module.exports = router;