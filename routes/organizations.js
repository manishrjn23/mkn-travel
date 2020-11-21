const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    res.render('dashboard')
})



module.exports = router;