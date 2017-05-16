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

  return newdate = day + "." + month + "." + year;
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
  });
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
    text = "<table><tr><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td></tr>";
    for (i = 0; i < arrLen; i++) {
      text += "<tr><td>" + time[i] + "</td><td>" + arrbodyPart[i] + "</td><td>" + arrname[i] + "</td><td>" + arrsets[i] + "</td><td>" + arrreps[i] + "</td><td>" + arrweight[i] + "</td></tr>";
    }
    text += "</table>";
    document.getElementById("exercisesGrid").innerHTML = text;

    // for (var i=0;i<arr.length;i++) {
    // 	document.getElementById('exercisesGrid').innerHTML = arr[i];
    // 	$('#exercisesGrid').append(arr[i]);
    // }
  });
}