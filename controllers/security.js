
var home_station = [], door_station = [];
var sessionData = [home_station, door_station];

function doorIsClosed() {
  if(door_station) {
    return door_station[door_station.length - 1].sensor1 < 2000;
  }
  return false;
}

function processHome(){
  if(door_station === null || doorIsClosed()){
    return {picture: false};
  }
  else{
    return {picture: true};
  }
}

/**
 * GET /secure/home_station
 * Endpoint to receive data for home station
 */
exports.home_station = (req, res) => {

  var jsonObject =JSON.parse(req.query.data);
  try {
    if(jsonObject.imagestring!==""){
      var imageBuffer = new Buffer(jsonObject.imagestring, 'base64');
      fs.writeFile('test.jpg', imageBuffer.data, function(err) { console.log(err) });
    }
    home_station.push(jsonObject);
  } catch (e) {
    console.log("not JSON");
    return res.json({"Error":"Not a valid json"});
  }
  res.json(processHome());
};


/**
 * GET /secure/door_station
 * Endpoint to receive data for door station
 */
exports.door_station = (req, res) => {

  try {
    door_station.push(JSON.parse(req.query.data));
  } catch (e) {
    console.log("not JSON");
    return res.json({"Error":"Not a valid json"});
  }
  res.json(door_station);
};


exports.show_data = (req, res) => {
  res.json(sessionData);
};
