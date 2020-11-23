const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const Organizations = require("../models/Organizations");

router.get('/',(req,res)=>{
    Organizations.find().exec(function (err, orgs) {
        if (err) throw err;
        else {
            res.render('index',{user:req.user,organizations:orgs})
        }
    });
    
})

module.exports = router;