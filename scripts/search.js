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

loadGames();