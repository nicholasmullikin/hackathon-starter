const fs = require('fs');
var home_station = [], door_station = [{ sensor1: 0 }], home_station_images = [];
var sessionData = [home_station, door_station];

function doorIsClosed() {
  if(door_station) {
    return Number(door_station[door_station.length - 1].sensor1) < 2000;
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

  try {
    let jsonObject =JSON.parse(req.query.data);
    console.log(jsonObject);
    home_station.push(jsonObject);
    return res.json(processHome());
  } catch (e) {
    console.log("not JSON");
    return res.json({"Error":"Not a valid json"});
  }
};



exports.home_station_image = (req, res) => {

  try {
    let jsonObject =JSON.parse(req.body.data);
    if(jsonObject.imagestring !==""){
      let base64Data = jsonObject.imagestring.replace(/^data:image\/png;base64,/, "");
      fs.writeFile('test.jpg', base64Data, 'base64', function(err) { console.log(err) });
      home_station_images.push('test.jpg')
    }
    home_station.push(jsonObject);
  } catch (e) {
    console.log("not JSON");
    return res.json({"Error":"Not a valid json"});
  }
  return res.json([true]);
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



exports.make_requests = (req, res) => {
  res.render('secure/show_data', {
    title: 'Home'
  });
};


/**
 * GET /
 * Application page.
 */
exports.getApi = (req, res) => {
  res.render('api/checkmate', {
    title: 'Application'
  });
};
