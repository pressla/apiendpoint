var express = require('express');
var fs = require('fs')
var pino = require('pino')
var multistream = require('pino-multi-stream').multistream
const fs2 = require("fs");


var streams = [
  {stream: fs.createWriteStream('./db/console.out')},
  {level: 'fatal', stream: fs.createWriteStream('./db/unused1', {flags:'a'})},
  {level: 'debug', stream: fs.createWriteStream('./db/unused2', {flags:'a'})}
]
var log = pino({
  level: 'debug' // this MUST be set at the lowest level of the
                 // destinations
}, multistream(streams))

//log.info('this will be written to /tmp/info.stream.out')
//log.fatal('this will be written to /tmp/fatal.stream.out')





var app = express();

app.use(express.urlencoded())
//app.use(pino)

app.get('/', function(req, res){
    
    
  res.send('Thanks for the prediction');
});
app.get("/usr", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });

   //new mail arrived and targets to log
app.get('/trt', function (req, res,next) {
    fs2.appendFileSync('./db/trt.out',JSON.stringify(req.query)+'\n');
    //log.fatal()
    //next()
    res.send('ibpy01 received a TRT request')
  })

   //new mail arrived and targets to log
app.get('/predict1d', function (req, res,next) {
    fs2.appendFileSync('./db/predict1d.out',JSON.stringify(req.query)+'\n');
    
    //log.debug(JSON.stringify(req.query, null, 2))
    //next()
    res.send('ibpy01 received a predict1d request')
  })


/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

/*
const fs = require("fs");
let usersjson = fs.readFileSync("users.json","utf-8");
let users = JSON.parse(usersjson);
users.push(obj);
usersjson = JSON.stringify(users);
fs.writeFileSync("users.json",usersjson,"utf-8");
*/