const mongoose=require('mongoose');
const Organization=require('./models/Organizations');

name='Radisson Blu Hotel New Delhi Dwarka'
field='hotel'
city='Delhi'
address='Sector 13, Dwarka'

const newOrg=new Organization({name,field,city,address});
newOrg.save();