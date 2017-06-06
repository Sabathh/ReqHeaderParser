const express = require('express');
const app = express();
const os = require('os');

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

function getIpAddress (interfaces)
{
  var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
  }
            
  return (JSON.stringify(addresses));
}

app.get('/', function (req, res) {
  
  res.header("Content-Type", "text/plain");
  
  var interfaces = os.networkInterfaces();
  
  var ipAddress = getIpAddress(interfaces);
  
  var language = JSON.stringify(process.env.LANG);
  
  var software = JSON.stringify(os.type() + '; ' + os.release() + '; ' + os.arch());
  
  res.send(gatherData(ipAddress,language,software));
});

app.listen(port, function () {
  console.log('Node app is running on port ' + port);
});