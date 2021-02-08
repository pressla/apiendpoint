var express = require('express');
const logger = require('pino')()
var fs = require('fs')
var pinoms = require('pino-multi-stream')



var streams = [
  {stream: fs.createWriteStream('./db/console.out')},
  {level: 'fatal', stream: fs.createWriteStream('./db/trt.out', {flags:'a'})}
]
var log = pinoms({streams: streams})

//log.info('this will be written to /tmp/info.stream.out')
//log.fatal('this will be written to /tmp/fatal.stream.out')





var app = express();

app.use(express.urlencoded())
//app.use(pino)

app.get('/', function(req, res){
  res.send('Hello Stranger');
});
app.get("/usr", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });

   //new mail arrived and targets to log
app.post('/trt', function (req, res) {
    log.info(Date.now()+ 'received '+req.query.text)
    log.info(Date.now()+ 'received '+req.query.date)
    log.info(Date.now()+ 'received '+req.query.header)
    log.info('Request Type:', req.method)
    log.fatal(JSON.stringify(req.query, null, 2))
    child = logger.child(req.query)
    //log.fatal(child)
    //log.fatal(child.fatal('hello child!'))
    //next()
    res.send('ibpy01 received a TRT request')
  })

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

