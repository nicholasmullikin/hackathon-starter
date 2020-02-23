var t;
$(document).ready(function () {
  $("#home_station").click(function () {
    console.log("test");
    let sensor1 = $("#home_station_sensor1").val();
    $.ajax({
      method: "GET",
      url: "/secure/home_station",
      data: {data: JSON.stringify({sensor1: sensor1})},
      contentType: 'application/json; charset=utf-8'
    })
    .done(function (msg) {
      alert("Data Saved: ");
      console.log(msg);
    });
  });

  $("#home_station_image").click(function () {
    console.log( {data: JSON.stringify({imagestring: t})});
    $.ajax({
      method: "POST",
      url: "/secure/home_station_image",
      data: {data: JSON.stringify({imagestring: t})}
    })
    .done(function (msg) {
      alert("Data Saved: ");
      console.log(msg);
    });
  });



  $("#door_station").click(function () {
    console.log("test");
    let sensor1 = $("#door_station_input").val();
    $.ajax({
      method: "GET",
      url: "/secure/door_station",
      data: {data: JSON.stringify({sensor1: sensor1})},
      contentType: 'application/json; charset=utf-8'
    })
    .done(function (msg) {
      alert("Data Saved: ");
      console.log(msg);
    });
  });
});
function encodeImageFileAsURL(element) {
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    console.log('RESULT', reader.result)
    t = reader.result;
  };
  reader.readAsDataURL(file);
}
