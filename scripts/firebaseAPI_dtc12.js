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

function displayCards(collection) {
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

displayCards("events");
