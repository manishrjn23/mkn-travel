const Organizations=require('./models/Organizations')

Organizations.find().exec(function (err, orgs) {
    if (err) throw err;
    else {
     for(var i=0;i<orgs.length;i++){
         console.log(org)
     }
    }
  });