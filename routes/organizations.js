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
//     
// })




//display all items
router.get('/explore',ensureAuthenticated,(req,res)=>{
    Organizations.find().exec(function(err,orgs){
        if(err) throw err;
        else{
            res.render('explore',{orgs});
        }
    })
})

router.get('/additem',(req,res)=>{
    name='Dwarka Palace'
field='hotel'
city='Delhi'
address=`C991, Behind Maxfort School, Sector 7, Dwarka
Phone:099710 54499

`
description=`luxurious rooms with a great spread of breakfast`

const newOrg=new Organizations({name,description,field,city,address});
newOrg.save();
res.send(name+' successfully added');
})

//search post request

// router.post('/search',ensureAuthenticated,(req,res=>{

// }))




//giving ratings

router.post('/:id',ensureAuthenticated,(req,res)=>{
    const user=req.user;
    const organization=mongoose.Types.ObjectId(req.params.id);
    const value_for_money=req.body.value_for_money;
    const staff_service=req.body.staff_service;
    const review=req.body.review;
    const newRating=new Rating({user,organization,value_for_money,staff_service,review})
    newRating.save().then((rating)=>{
        Organizations.findById(organization,function(err,org){
                    if(err){
                        throw err;
                    }else{
                        org.ratings.push(rating);
                        org.save();
                        req.flash('success_message','Rated successfully');
                        res.redirect('/organizations/'+req.params.id);
                    }
                })
        
    }).catch((err)=>console.log(err));
})


module.exports = router;