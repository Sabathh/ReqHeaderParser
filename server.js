const express = require('express');
const app = express();

var port = process.env.PORT || 8080;

function gatherData(ipAddress, lang, operSystem)
{
  var ip = null;
  var language = null;
  var operationSystem = null;
  
  if(ipAddress != undefined)
  {
    ip = ipAddress;
  }
  if(lang != undefined)
  {
    language = lang;
  }
  if(operSystem != undefined)
  {
    operationSystem = operSystem;
  }
  
  return { ipaddress: JSON.parse(ip), language: JSON.parse(language) , software: JSON.parse(operationSystem) };
}

app.get('/', function (req, res) {
  
  var ipAddress = JSON.stringify(req.headers['x-forwarded-for']|| 
                  req.connection.remoteAddress || 
                  req.socket.remoteAddress ||
                  req.connection.socket.remoteAddress);
  
  var language = JSON.stringify(req.headers["accept-language"].split(',')[0]);
  
  var software = JSON.stringify(req.headers['user-agent'].split(') ')[0].split(' (')[1]);
  
  res.send(gatherData(ipAddress,language,software));
});

app.listen(port, function () {
  console.log('Node app is running on port ' + port);
});