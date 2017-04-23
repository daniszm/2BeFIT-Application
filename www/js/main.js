
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
