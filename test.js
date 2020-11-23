var Amadeus = require('amadeus');
 
var amadeus = new Amadeus({
  clientId: '9GgnCqcROkuyIsmSjW57hzq3wqvP0Ioh',
  clientSecret: 'd6sAIOnw24CYJtnD'
});

amadeus.referenceData.locations.pointsOfInterest.get({
  latitude : 26.846695,
  longitude : 80.946167
}).then((points)=>console.log(points)).catch((err)=>console.log(err));