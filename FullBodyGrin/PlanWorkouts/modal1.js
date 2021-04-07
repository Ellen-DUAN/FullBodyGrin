// Get the modal
var modal1 = document.getElementById("myModal1");

// Get the button that opens the modal
//var btn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];

var modal2 = document.getElementById("myModal2");
var span2 = document.getElementsByClassName("close2")[0];
var discardb = document.getElementById("discardb");

var editb = document.getElementById("editb");

var date = document.getElementById("date");
var type = document.getElementById("workout_type");
var distance = document.getElementById("distance");
var calories = document.getElementById("calories");
var time = document.getElementById("time");

var cancelb = document.getElementById("cancelb");
var saveb = document.getElementById("saveb");


// When the user clicks on the button, open the modal
saveb.onclick = function() {
  modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal1.style.display = "none";
  window.location.href = "./data.html";
}

cancelb.onclick = function() {
    modal2.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    modal2.style.display = "none";
    window.location.href = "./data.html";
}

discardb.onclick = function() {
    modal2.style.display = "none";
    window.location.href = "./data.html";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }

  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}


editb.onclick = function() {
    date.disabled = false;
    type.disabled = false;
    distance.disabled = false;
    calories.disabled = false;
    time.disabled = false;

    cancelb.style.display = "block";
    saveb.style.display = "block";
}