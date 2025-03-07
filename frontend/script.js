let PROJECT_ID = "x9czv3a6"; //Hent din project ID på sanity.io/manage
let DATASET = "production";
let QUERY = encodeURIComponent(`*[_type == "games"]`); //bruk template strings her
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

async function hentData() {
  let responce = await fetch(URL);

  let data = await responce.json();
  let gameList = data.result;

  // Print data on HTML page
  let gameListDiv = document.getElementById("game-list");
  gameListDiv.innerHTML = gameList.map((game) => {
    return `<div> 
        <h2> ${game.name}</h2>
        <p> ${game.year}</p>
        </div>`;
  });
}

hentData();
