const addbtn = document.getElementById("get")
const postbtn = document.getElementById("post")
const delbtn = document.getElementById("del")
/*const addbtn = document.getElementById("get")*/


function renderData(data) {
  const container = document.getElementById("reponse");
    container.innerHTML = data.map(game => `
      <div class="card">
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p class="meta">PEGI : ${game.pegi} | Joueurs : ${game.playerCount} | Multi : ${game.isMultiplayer ? "Oui" : "Non"}</p>
        <small>ID : ${game.id}</small>
      </div>
    `).join("");

}



/*=============================*/

async function loadGames() {
  const res = await fetch("http://localhost:3000/game/");
  const data = await res.json();
  console.log(data);
  renderData(data);
}

/*=============================*/

async function postGame() {
  let name = prompt("nom");
  let description = prompt("description");

  const res = await fetch("http://localhost:3000/game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      description: description,
      pegi: 18,
      playerCount: 1,
      isMultiplayer: false
    })
  });

  const data = await res.json();
  console.log(data);
  await loadGames()
}

/*=============================*/

async function delGame(id) {
    const res = await fetch(`http://localhost:3000/game/${id}`, {
        method: "DELETE"
    });
      try {
        const data = await res.json();
        console.log(data);
      } catch(e) {}

    await loadGames()
}




/*=============================*/




addbtn.addEventListener("click", () => {
    loadGames();
    
})

postbtn.addEventListener("click", () =>{
    postGame();
})

delbtn.addEventListener("click", () => {
    const id = prompt("id del")
    delGame(id);

})