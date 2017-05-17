function calculateBmi() {
  var weight = document.bmiForm.weight.value;
  var height = document.bmiForm.height.value;
  if (weight > 0 && height > 0) {
    var finalBmi = Math.round(weight / (height / 100 * height / 100));
    // document.bmiForm.bmi.value = finalBmi;

    var bmiResult = document.getElementById("bmiResult");
    var BMIconclusion = document.getElementById("BMIconclusion");
    var resetButton = document.getElementById("resetButton");

    resetButton.onclick = function () {
      bmiResult.innerHTML = "";
      BMIconclusion.innerHTML = "";
    };

    bmiResult.textContent = "BMI: " + finalBmi;
    if (finalBmi <= 18.5) {
      BMIconclusion.textContent = "You are too thin."
    }
    if (finalBmi > 18.5 && finalBmi <= 25) {
      BMIconclusion.textContent = "You are healthy."
    }
    if (finalBmi > 25) {
      BMIconclusion.textContent = "You have overweight."
    }
  }
  else {
    alert("PLEASE FILL DATA CORRECTLY")
  }
}

function getTime() {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  return newdate = day + "." + month + "<br>" + year;
}


// function addExerciseToLocalStorage(){
// var exercise = {
// 'bodyPart' : $( "#bodyPart" ).val(),
// 'name' : $( "#exerciseName" ).val(),
// 'sets' : $( "#setsInput" ).val(),
// 'reps' : $( "#repsInput" ).val(),
// 'weight' : $( "#weightInput" ).val()
// }

// var objectString = JSON.stringify(exercise);

// var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

// oldItems.push(objectString);

// localStorage.setItem('itemsArray', JSON.stringify(oldItems));

// alert(objectString);
// }

/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
$(document).on("pageinit", "#map-page", function () {
  var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
  if (navigator.geolocation) {
    function success(pos) {
      // Location found, show map with these coordinates
      drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    }
    function fail(error) {
      drawMap(defaultLatLng);  // Failed to find location, show default map
    }
    // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
    navigator.geolocation.getCurrentPosition(success, fail, { maximumAge: 500000, enableHighAccuracy: true, timeout: 6000 });
  } else {
    drawMap(defaultLatLng);  // No geolocation support, show default map
  }
  function drawMap(latlng) {
    var myOptions = {
      zoom: 13,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: "ME",
      icon: 'img/man.png'
    });

    var marker1 = new google.maps.Marker({
      position: new google.maps.LatLng(50.07128, 19.93696),
      map: map,
      title: "Platinium Fitness!",
      icon: 'img/hantel.png'
    });
  }
});

$(document).ready(function () {


  $('#submitBtnExercise').on('click', function (e) {
    e.preventDefault();
    var user = "Admin";
    var bodyPart = $("#bodyPart").val();
    var name = $("#exerciseName").val();
    var sets = $("#setsInput").val();
    var reps = $("#repsInput").val();
    var weight = $("#weightInput").val();
    var time = getTime();

    if (bodyPart == "" || name == "") {
      alert("Please select body part or insert exercise name!");
    } else {
      $.ajax({
        url: "https://api.mlab.com/api/1/databases/fitappdb/collections/exercises?apiKey=p5W6JyOLc6_yXmLzinofkvztB0Yu7rYJ",
        data: JSON.stringify({
          user: user,
          bodyPart: bodyPart,
          name: name,
          sets: sets,
          reps: reps,
          weight: weight,
          time: time
        }),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
          console.log("body part: " + bodyPart);
          alert("EXERCISE ADDED :)");
          localStorage.setItem('avc', JSON.stringify(bodyPart));
        },
        error: function (xhr, status, err) {
          console.log(err);
        }
      });
    }
  });
});

$.ajax({
   url:'controller/action',
   success: function() {
    alert("result");
   },error: function () {
          alert("err");
    }
});

function getExercises() {
  $.ajax({
    url: "https://api.mlab.com/api/1/databases/fitappdb/collections/exercises?apiKey=p5W6JyOLc6_yXmLzinofkvztB0Yu7rYJ",
  }).done(function (data) {
    var output = '<div>';
    var arrbodyPart = [];
    var arrname = [];
    var arrsets = [];
    var arrreps = [];
    var arrweight = [];
    var time = [];

    $.each(data, function (key, data) {
      arrbodyPart.push(data.bodyPart);
      arrname.push(data.name);
      arrsets.push(data.sets);
      arrreps.push(data.reps);
      arrweight.push(data.weight);
      time.push(data.time);

      // console.log(data.bodyPart);
      // var test = data.bodyPart;
      // console.log(test);
      // output += '<p>'+data.bodyPart+'</p>';
      //<td>" + [i + 1] + "</td>
    });

    arrLen = arrbodyPart.length;
    text = "<table class='statisticsTable'><tbody style='overflow-x: visible;'><tr><td><b>DATE</b></td><td><b>BODY</b><br><b>PART</b></td><td><b>NAME</b></td><td><b>SETS/REPS/WEIGHT</b></td></tr>";
    for (i = 0; i < arrLen; i++) {
      text += "<tr><td>" + time[i] + "</td><td>" + arrbodyPart[i] + "</td><td>" + arrname[i] + "</td><td>" + arrsets[i] + "/" + arrreps[i] + "/" + arrweight[i] + "</td></tr>";
    }
    text += "</tbody></table>";
    document.getElementById("exercisesGrid").innerHTML = text;

    // for (var i=0;i<arr.length;i++) {
    // 	document.getElementById('exercisesGrid').innerHTML = arr[i];
    // 	$('#exercisesGrid').append(arr[i]);
    // }
  });
}