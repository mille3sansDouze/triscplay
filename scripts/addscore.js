function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "x-session-id": localStorage.getItem("session_id")
  };
}

async function loadGames() {
  const res = await fetch("http://localhost:3000/game/");
  const data = await res.json();
  return data;
}

async function toggleScorePopup() {
  //Vérifie si un pop-up est déjà ouvert. Si oui, le ferme.
  const existing = document.getElementById("score-popup");
  if (existing) {
    existing.remove();
    return;
  }

  //Crée le conteneur 'score-popup'
  const popup = document.createElement("div");
  popup.id = "score-popup";

  //Insère le pop-up juste au-dessus du bouton 'CESI ton score'
  const btn = document.getElementById("cesiscore");
  btn.parentNode.insertBefore(popup, btn);

  //Crée la liste déroulante où choisir les jeux
  const selectLabel = document.createElement("p");
  selectLabel.textContent = "Sélectionne un jeu";

  const select = document.createElement("select");
  select.id = "score-game-select";
  select.disabled = true; //La liste déroulante est désactivée le temps de charger l'API

  //Options visibles au chargement
  const loadingOption = document.createElement("option");
  loadingOption.textContent = "Chargement...";
  select.appendChild(loadingOption);

  // Champ texte pour le score
  const inputLabel = document.createElement("p");
  inputLabel.textContent = "Ton score";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "score-input";
  input.placeholder = "Ex: 48500";

  // Bouton Post
  const postBtn = document.createElement("button");
  postBtn.textContent = "Post";
  postBtn.disabled = true; //Désactivé aussi pendant le chargement de l'API

  // Assemblage des éléments de la pop-up
  popup.appendChild(selectLabel);
  popup.appendChild(select);
  popup.appendChild(inputLabel);
  popup.appendChild(input);
  popup.appendChild(postBtn);

  try {
    const games = await loadGames();

    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- Choisir un jeu --";
    select.appendChild(defaultOption);

    //Place les jeux de l'API dans la liste déroulante
    games.forEach((game) => {
      const option = document.createElement("option");
      option.value = game.id_game;
      option.textContent = game.name;
      select.appendChild(option);
    });

    //Réactive les boutons une fois que l'API est chargée
    select.disabled = false;
    postBtn.disabled = false;
    postBtn.style.opacity = "1";

  } catch (error) {
    select.innerHTML = "";
    const errorOption = document.createElement("option");
    errorOption.textContent = "Erreur de chargement";
    select.appendChild(errorOption);
    console.error("Impossible de charger les jeux :", error);
  }

  postBtn.addEventListener("click", async () => {
  const selectedGameId = select.value;   // option.value doit contenir l'id du jeu (number)
  const score = input.value.trim();

  if (!selectedGameId || isNaN(parseInt(selectedGameId)) || !score) {
    alert("Merci de sélectionner un jeu et d'entrer un score !");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/scoreboard", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        id_game: parseInt(selectedGameId, 10),
        score: Number(score),
      })
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Erreur API :", err);
      alert("Erreur lors de l'envoi du score.");
      return;
    }

    alert("Score posté avec succès !");
    popup.remove();

  } catch (error) {
    console.error("Erreur réseau :", error);
    alert("Impossible de contacter le serveur.");
  }
});
}