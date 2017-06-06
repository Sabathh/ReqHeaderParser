const express = require('express');
const app = express();
const os = require('os');
const locale = require('locale')
//const platform = require('platform');

var port = process.env.PORT || 8080;

function gatherData(ipAddress, language, operSystem)
{
  return { ipaddress: JSON.parse(ipAddress), language: JSON.parse(language) , software: JSON.parse(operSystem) };
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
  
  //var lang = JSON.stringify(req.headers["accept-language"]);
  
  var language = JSON.stringify(process.env.LANG);
  
  var software = JSON.stringify(os.type() + '; ' + os.release() + '; ' + os.arch());
  
  res.send(gatherData(ipAddress,language,software));
});

app.listen(port, function () {
  console.log('Example app listening on port 8080!');
});