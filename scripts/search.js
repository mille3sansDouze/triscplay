const searchbar = document.getElementById("searchbar");

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "x-session-id": localStorage.getItem("session_id")
  };
}

//Fonction pour afficher un texte sur l'input de recherche qui disparait a la saisie
document.querySelectorAll('.input-wrap').forEach(wrap => {
  const inp = wrap.querySelector('input');
  const lbl = wrap.querySelector('.overlay-label');

  function update() {
    lbl.classList.toggle('hidden', inp.value.length > 0);
  }

  inp.addEventListener('input', update);
  inp.addEventListener('focus', () => lbl.classList.add('hidden'));
  inp.addEventListener('blur', update);
  
  update();
});

//Fonction pour mapper les données qu'on reçoit en chargeant les jeux
function renderData(data) {
  const container = document.getElementById("reponse");
  container.innerHTML = data.map(game => `
    <a class="card" href="./game_page.html?id=${game.id_game}">
      <div class="card-value">${game.name}</div>
      <div class="card-label">${game.description}</div>
      <div class="card-desc">JOUEURS : ${game.player_count}</div>
      <div class="card-desc">MULTI : ${game.is_multiplayer ? "OUI" : "NON"}</div>
      <div class="card-desc">PEGI ${game.pegi}</div>
      
    </a>
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

async function searchGame() {
  const query = searchbar.value.trim().toLowerCase();
  const res = await fetch("http://localhost:3000/game/");
  const data = await res.json();

  if (query === "") {
    renderData(data);
  } else {
    const filtered = data.filter(game =>
      game.name.toLowerCase().includes(query)
    );
    renderData(filtered);
  }
}

/*=============================*/

loadGames();
searchbar.addEventListener("input", searchGame);