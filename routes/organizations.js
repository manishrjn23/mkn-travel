const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const Organizations=require('../models/Organizations')
const Ratings=require('../models/Ratings')
const mongoose=require('mongoose');
const { render } = require("ejs");
const e = require("express");

//main page
router.get('/',ensureAuthenticated,(req,res)=>{
    res.render('dashboard')
})


//item specific page

// router.get('/:id',ensureAuthenticated,(req,res)=>{
//     id=req.params.id;
//     Organizations.findById(id,function(err,org){
//         if(err){
//             throw err;
//         }else{
//             res.render('org-page',{org: org});
//         }
//     })
// })




//display all items
router.get('/explore',ensureAuthenticated,(req,res)=>{
    Organizations.find().exec(function(err,orgs){
        if(err) throw err;
        else{
            res.render('explore');
        }
    })
})

//search post request

// router.post('/search',ensureAuthenticated,(req,res=>{

// }))




//giving ratings

// router.post('/:id',ensureAuthenticated,(req,res)=>{
    
// })


module.exports = router;