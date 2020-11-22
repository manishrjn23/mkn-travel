const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard')
})

router.get('/',(req,res)=>{
    res.render('hello')
})
module.exports = router;