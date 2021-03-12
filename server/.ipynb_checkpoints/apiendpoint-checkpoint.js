var express = require('express');
var fs = require('fs')
const fs2 = require("fs");

var app = express();

app.use(express.urlencoded())

app.get('/', function(req, res){
    res.send('Thanks for the prediction');
});

app.get("/usr", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });

   //new mail arrived and targets to log
app.get('/trt', function (req, res,next) {
    fs2.appendFileSync('./db/trt.out',JSON.stringify(req.query)+'\n');
    res.send('ibpy received a TRT request')
  })

   //new mail arrived and targets to log
app.get('/predict1d', function (req, res,next) {
    fs2.appendFileSync('./db/predict1d.out',JSON.stringify(req.query)+'\n');
    
    res.send('ibpy01 received a predict1d request')
  })

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

