var request = require("request");
const mraa = require('mraa');

var analogPin_0 = new mraa.Aio(0);
var analogPin_1 = new mraa.Aio(1);
var analogPin_2 = new mraa.Aio(2);

var idCount = 0;
var sensorJsonData = {
  "id": 0,
  "name": "",
  "value": 0,
  "timestamp": ""
};

function datSendFromSensor(){
  var aV_Temp = analogPin_0.readFloat();
  console.log("Temp value: "+ aV_Temp);
  var aV_light = analogPin_1.readFloat();
  console.log("light value: "+ aV_light);
  var aV_sound = analogPin_2.readFloat();
  console.log("sound value: "+ aV_sound);
  request({
      method: "POST",
      url: "https://api.thingspeak.com/update?api_key=KY0UK94MQTN4Q8H&field1="+aV_Temp+"&field2="+aV_light+"&field3="+aV_sound,
      headers: {
          "content-type" : "application/json",
      },
      json:true,
      body: sensorJsonData
  },function(err, res, body){});
}
setInterval(function(){
    datSendFromSensor();
},50);
