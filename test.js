var date1 = new Date("06-30-2019"); 
var date2 = new Date("07-30-2019"); 

var Difference_In_Time = date2.getTime() - date1.getTime(); 

var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
console.log(Difference_In_Days)