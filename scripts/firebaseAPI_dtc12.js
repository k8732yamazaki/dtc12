// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfG_EnZlYF8Z9fUWNWIpIJy4p1WBIx2H4",
  authDomain: "dtc-12.firebaseapp.com",
  projectId: "dtc-12",
  storageBucket: "dtc-12.appspot.com",
  messagingSenderId: "68678619104",
  appId: "1:68678619104:web:bf2c2fd10da35a19bda585"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Populate event cards
function displayEventCards(collection) {
  let eventTemplate = document.getElementById("eventTemplate");

  db.collection(collection).get()
    .then(snap => {
      var i = 1;
      snap.forEach(doc => { //iterate thru each doc
        var title = doc.data().name;
        var details = doc.data().details;
        var image = doc.data().image;
        let newcard = eventTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.card-title').innerHTML = title;
        newcard.querySelector('.card-text').innerHTML = details;
        // newcard.querySelector('.card-img').src = image;

        //give unique ids to all elements for future use
        //newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        //newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        //newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        document.getElementById("eventsList").appendChild(newcard);
        i++;
      })
    })
}

if($("body").is("#eventsPage")){
  displayEventCards("events");
}

// Populate history cards
function displayHistoryCards(collection) {
  let eventTemplate = document.getElementById("historyTemplate");

  db.collection(collection).get()
    .then(snap => {
      var i = 1;
      snap.forEach(doc => { //iterate thru each doc
        var timestamp = doc.data().timeStamp;
        var date = timestamp.toDate();
        console.log(date);
        let newcard = historyTemplate.content.cloneNode(true);

        newcard.querySelector('strong').innerHTML = i + " :"
        newcard.querySelector('.time-stamp').innerHTML = date;

        document.getElementById("historyList").appendChild(newcard);
        i++;
      })
    })
}

if($("body").is("#historyPage")){
  displayHistoryCards("history");
}

// autocomplete - search bar
var events = []

db.collection("events").get().then((querySnapshot) => { // reads event collection
  querySnapshot.forEach((doc) => { // loops thru each doc
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data()); // checking out the event title
      events.push(doc.data().name); // appending it to the list
  });
});


function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

// timestamp
$(".pocket").click(function() {
  const timestamp = firebase.firestore.Timestamp.now();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then(userDoc => {
        var userName = userDoc.data().name;
        console.log(userName);
      })

      db.collection("history").add({
        name: currentUser,
        timeStamp: timestamp,
      })
    }
  })
})
