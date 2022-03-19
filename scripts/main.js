async function readJSON() {
  i = 0
  const response = await fetch(
    'https://sports.api.decathlon.com/sports'
  )
  const data = await response.text(); //get text file, string
  const sportsEvents = JSON.parse(data); //convert to JSON
  console.log(sportsEvents);
  for (x of sportsEvents["data"]) { //iterate thru each hero
    let name = x.attributes.name;
    let details = x.attributes.description;
    let image = x.relationships.images.data[0];
    console.log(image);
    i++
    if (i <= 50) {
      db.collection("events").add({
        name: name,
        details: details,
        image: image["url"]
      })
    }
  }
}
