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

function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.remove();
  window.location.reload()
}

async function toggleScorePopup() {
  if (document.getElementById("modal-overlay")) {
    closeModal();
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "modal-overlay";
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });


  const popup = document.createElement("div");
  popup.id = "score-popup";

  popup.innerHTML = `
    <div class="popup-header">
      <div class="popup-title">NOUVEAU SCORE</div>
      <button class="popup-close" id="popup-close-btn">✕</button>
    </div>

    <div class="popup-field">
      <label>JEU</label>
      <select id="score-game-select" disabled>
        <option>CHARGEMENT...</option>
      </select>
      <div class="popup-loading" id="popup-loading">
        <div class="spinner"></div>
        RÉCUPÉRATION DES JEUX...
      </div>
    </div>

    <div class="popup-field">
      <label>TON SCORE</label>
      <input type="text" id="score-input" placeholder="Ex : 48500" />
    </div>

    <div class="popup-feedback" id="popup-feedback"></div>

    <div class="popup-footer">
      <button class="popup-btn-post" id="popup-post-btn" disabled>POSTER</button>
      <button class="popup-btn-cancel" id="popup-cancel-btn">ANNULER</button>
    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  document.getElementById("popup-close-btn").addEventListener("click", closeModal);
  document.getElementById("popup-cancel-btn").addEventListener("click", closeModal);

  const onKey = (e) => { if (e.key === "Escape") { closeModal(); document.removeEventListener("keydown", onKey); } };
  document.addEventListener("keydown", onKey);

  const select   = document.getElementById("score-game-select");
  const postBtn  = document.getElementById("popup-post-btn");
  const feedback = document.getElementById("popup-feedback");
  const loading  = document.getElementById("popup-loading");

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = "popup-feedback " + type;
  }

  /* load games */
  try {
    const games = await loadGames();
    loading.style.display = "none";
    select.innerHTML = `<option value="">-- CHOISIR UN JEU --</option>`;
    games.forEach(g => {
      const opt = document.createElement("option");
      opt.value = g.id_game;
      opt.textContent = g.name.toUpperCase();
      select.appendChild(opt);
    });
    select.disabled = false;
    postBtn.disabled = false;
  } catch (err) {
    loading.style.display = "none";
    select.innerHTML = `<option>ERREUR DE CHARGEMENT</option>`;
    showFeedback("// IMPOSSIBLE DE CHARGER LES JEUX", "error");
    console.error(err);
  }


  postBtn.addEventListener("click", async () => {
    const selectedGameId = select.value;
    const score = document.getElementById("score-input").value.trim();

    if (!selectedGameId) { showFeedback("// SÉLECTIONNE UN JEU D'ABORD", "error"); return; }
    if (!score || isNaN(Number(score))) { showFeedback("// ENTRE UN SCORE VALIDE", "error"); return; }

    postBtn.disabled = true;
    postBtn.textContent = "ENVOI...";

    try {
      const res = await fetch("http://localhost:3000/scoreboard", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id_game: parseInt(selectedGameId, 10), score: Number(score) })
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Erreur API :", err);
        showFeedback("// ERREUR LORS DE L'ENVOI", "error");
        postBtn.disabled = false;
        postBtn.textContent = "POSTER";
        return;
      }

      showFeedback("✓ SCORE POSTÉ AVEC SUCCÈS !", "success");
      postBtn.textContent = "POSTÉ ✓";
      setTimeout(closeModal, 1200);

    } catch (err) {
      console.error(err);
      showFeedback("// IMPOSSIBLE DE CONTACTER LE SERVEUR", "error");
      postBtn.disabled = false;
      postBtn.textContent = "POSTER";
    }
  });
  
}

