const addbtn = document.getElementById("get")
const delbtn = document.getElementById("del")
/*const addbtn = document.getElementById("get")*/

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "x-session-id": localStorage.getItem("session_id")
  };
}

function renderData(data) {
  const container = document.getElementById("reponse");
    container.innerHTML = data.map(game => `
    <div class="card">
      <div class="card-inner">
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p class="meta">PEGI : ${game.pegi} | Joueurs : ${game.player_count} | Multi : ${game.is_multiplayer ? "Oui" : "Non"}</p>
        <small>ID : ${game.id_game}</small>
      </div>
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
  event.preventDefault()
  let name = document.getElementById("gameName").value
  if (!name || typeof name !== "string" || name.length === 0) {
    alert("Le nom est invalide.")
    return
  }
  let description = document.getElementById("gameDescription").value
  if (!description || typeof description !== "string" || description.length === 0) {
    alert("La description est invalide.")
    return
  }
  let playercount = document.getElementById("gamePlayerCount").value
  if (isNaN(playercount) || playercount < 1) {
    alert("Le nombre de joueurs est invalide.")
    return
  }

  let url = document.getElementById("imageUrl").value
  if (!url || typeof url !== "string" || url.length === 0) {
    alert("L'url est invalide.")
    return
  }
  
  let pegi = document.getElementById("gamePegi").value
  if (isNaN(pegi) || pegi < 0) {
    alert("Le PEGI est invalide.")
    return
  }

  let isMultiplayer = document.getElementById("gameMultiplayer").value
  if (isMultiplayer !== "true" && isMultiplayer !== "false") {
    alert("Veuillez sélectionner une option pour le multijoueur.")
    return
  }

  playercount = Number(playercount)
  pegi = Number(pegi)


  document.getElementById("gameName").value = "";
  document.getElementById("gameDescription").value = "";
  document.getElementById("gamePlayerCount").value = "";
  document.getElementById("gamePegi").value = "";
  document.getElementById("gameMultiplayer").value = "";
  document.getElementById("imageUrl").value=""

  try {
    const res = await fetch("http://localhost:3000/game", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: name,
        description: description,
        pegi: pegi,
        player_count: playercount,  
        is_multiplayer: false,
        img_url: url
      })
    });

    const data = await res.json();
    console.log(data);
    await loadGames() 
  }
  catch {
    alert("sa marche pas zebi")
  }



}

/*=============================*/

async function delGame(id) {
    const res = await fetch(`http://localhost:3000/game/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
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

delbtn.addEventListener("click", () => {
    const id = prompt("id del")
    delGame(id);

})


