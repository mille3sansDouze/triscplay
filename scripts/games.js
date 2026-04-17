const grid = document.getElementById('scoresGrid');

async function loadGame() {
    const user_cookie = localStorage.getItem("user");
    if (!user_cookie) return;

    const user = JSON.parse(user_cookie);

    let data = []; 

    try {
        const res = await fetch(`http://localhost:3000/scoreboard/game/4`);
        data = await res.json();
        console.log(data);
    } catch {
        alert("sa marche pas zebi");
        return; // stop si erreur
    }

    data.forEach((s, index) => {
        const card = document.createElement('div');
        card.className = 'scoreCard';
        
        card.innerHTML = `
            <div class="score-game">${s.user.user_name}</div>
            <div class="score-value">${s.score}</div>
            
            <div class="score-meta">
                <div class="score-rank">#${index + 1}</div>
                <div>${new Date(s.created_at).toLocaleDateString()}</div>
            </div>

            <div class="score-bar">
                <div class="score-bar-fill" style="width:100}%"></div>
            </div>
        `;

        grid.appendChild(card);
    });

    const res = await fetch(`http://localhost:3000/game/4`);
    const gamedata = await res.json();
    console.log(gamedata);
    console.log(data.length);
    let total = 0;

        data.forEach(s => {
        total += s.score;
        });

    console.log(total);


    gamedatadiv = document.getElementById("profilepre")
    gamedatadiv.innerHTML = `
    
        <div class="profilePicture">
          <img class="profileAvatar"
            src="${gamedata.img_url}"
            alt="avatar">
          <div class="rank-badge">Pegi:${gamedata.pegi}</div>
        </div>
 
        <div class="profileInformation">
          <div class="profileHeader">
            <p class="profilePseudo">${gamedata.name}</p>
            <!-- <span class="profileTag">#1029</span> -->
          </div>
            <p class="profileName">Nombre de joueurs : ${gamedata.player_count}</p>
            <p class="profileBio">${gamedata.description}</p>
            <div class="profileStats">
                <div><span>MULTIJOUEUR?</span>${gamedata.is_multiplayer}</div>
                <div><span>TOTAL SCORE</span>${total}</div>
                <div><span>NOMBRES DE SCORE</span>${data.length}</div>
            </div>
        </div>`
}

loadGame();


