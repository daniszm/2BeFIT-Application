
function calculateBmi() {
    var weight = document.bmiForm.weight.value;
    var height = document.bmiForm.height.value;
    if(weight > 0 && height > 0){	
    var finalBmi = Math.round(weight/(height/100*height/100));
    // document.bmiForm.bmi.value = finalBmi;

    var bmiResult = document.getElementById("bmiResult");
    var BMIconclusion = document.getElementById("BMIconclusion");
    var resetButton = document.getElementById("resetButton");

    resetButton.onclick = function(){
        bmiResult.innerHTML = "";
        BMIconclusion.innerHTML = "";
    };

    bmiResult.textContent = "BMI: " + finalBmi;
    if(finalBmi <= 18.5){
     BMIconclusion.textContent = "You are too thin."
    }
    if(finalBmi > 18.5 && finalBmi <= 25){
     BMIconclusion.textContent = "You are healthy."
    }
    if(finalBmi > 25){
     BMIconclusion.textContent = "You have overweight."
    }
    }
    else{
    alert("PLEASE FILL DATA CORRECTLY")
    }
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

$(document).ready(function(){
	$('#submitBtnExercise').on('click', function(e){
		e.preventDefault();
		var user = "Admin";
		var bodyPart = $( "#bodyPart" ).val();
		var name = $( "#exerciseName" ).val();
		var sets = $( "#setsInput" ).val();
		var reps = $( "#repsInput" ).val();
		var weight = $( "#weightInput" ).val();
		
		$.ajax({
			url: "https://api.mlab.com/api/1/databases/fitappdb/collections/exercises?apiKey=p5W6JyOLc6_yXmLzinofkvztB0Yu7rYJ",
			 data: JSON.stringify({
				user : user,
				bodyPart : bodyPart,
				name : name,
				sets : sets,
				reps : reps,
				weight : weight
				}),
			type: "POST",
			contentType: "application/json",
			success: function(data){
				console.log("body part: " + bodyPart );
				localStorage.setItem('avc', JSON.stringify(bodyPart));
			},
			error: function(xhr, status, err){
				console.log(err);
			}
			});
	});
});

function getExercises(){
	$.ajax({
		url: "https://api.mlab.com/api/1/databases/fitappdb/collections/exercises?apiKey=p5W6JyOLc6_yXmLzinofkvztB0Yu7rYJ",
	}).done(function(data){
		var output = '<div>';
		$.each(data, function(key, data){
			output += '<div>';
			console.log(data.bodyPart);
			output += '<p>'+data.bodyPart+'</p>';
		});
		output = '</div>';
		$('#exercisesGrid').html(output);
	});
}


