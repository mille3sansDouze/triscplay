    // const scores = [
    //   { game: "TRIS CLASSIQUEezez",  value: "9 870",  rank: "S+",    rankClass: "gold",   trend: "+340",  trendDir: "up",   pct: 98, accent: "#e94560" },
    //   { game: "SPRINT 40L",      value: "00:42.3", rank: "GOLD",  rankClass: "gold",   trend: "-1.2S", trendDir: "up",   pct: 91, accent: "#f0c040" },
    //   { game: "BLITZ 2MIN",      value: "18 450",  rank: "PLAT",  rankClass: "silver", trend: "+820",  trendDir: "up",   pct: 76, accent: "#85b7eb" },
    //   { game: "MARATHON",        value: "120K",    rank: "OR",    rankClass: "gold",   trend: "+5K",   trendDir: "up",   pct: 85, accent: "#f0c040" },
    //   { game: "ULTRA 3MIN",      value: "24 110",  rank: "A",     rankClass: "red",    trend: "-200",  trendDir: "down", pct: 62, accent: "#e94560" },
    //   { game: "CHEESE RACE",     value: "01:14.8", rank: "B+",    rankClass: "",       trend: "+4.2S", trendDir: "down", pct: 47, accent: "#cd7f32" },
    //   { game: "ZENITH",          value: "LVL 38",  rank: "A+",    rankClass: "red",    trend: "+2",    trendDir: "up",   pct: 71, accent: "#e94560" },
    //   { game: "SURVIVAL",        value: "08:32",   rank: "ARGENT",rankClass: "silver", trend: "+1:04", trendDir: "up",   pct: 55, accent: "#a8b2c0" },
    // ];
 
    // const grid = document.getElementById('scoresGrid');
    // scores.forEach(s => {
    //   const card = document.createElement('div');
    //   card.className = 'scoreCard';
    //   card.style.setProperty('--accent', s.accent);
    //   card.innerHTML = `
    //     <div class="score-game">${s.game}</div>
    //     <div class="score-value">${s.value}</div>
    //     <div class="score-meta">
    //       <div class="score-rank ${s.rankClass}">${s.rank}</div>
    //       <div class="score-trend ${s.trendDir}">${s.trendDir === 'up' ? '▲' : '▼'} ${s.trend}</div>
    //     </div>
    //     <div class="score-bar">
    //       <div class="score-bar-fill" style="width:0%" data-pct="${s.pct}"></div>
    //     </div>
    //   `;
    //   grid.appendChild(card);
    // });
 
    // // animate bars after render
    // requestAnimationFrame(() => {
    //   document.querySelectorAll('.score-bar-fill').forEach(el => {
    //     setTimeout(() => { el.style.width = el.dataset.pct + '%'; }, 120);
    //   });
    // });


const grid = document.getElementById('scoresGrid');

async function loadProfile() {
    const user_cookie = localStorage.getItem("user");
    if (!user_cookie) return;

    const user = JSON.parse(user_cookie);

    let data = []; 

    try {
        const res = await fetch(`http://localhost:3000/scoreboard/user/${user.id_user}`);
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
            <div class="score-game">${s.game.name}</div>
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

    const res = await fetch(`http://localhost:3000/user/${user.id_user}`);
    const profile = await res.json();
    console.log(profile);
    console.log(data.length);
    let total = 0;

        data.forEach(s => {
        total += s.score;
        });

    console.log(total);


    profilediv = document.getElementById("profilepre")
    profilediv.innerHTML = `
    
        <div class="profilePicture">
          <img class="profileAvatar"
            src="${profile.profile_pic_url}"
            alt="avatar">
          <div class="rank-badge">${profile.role}</div>
        </div>
 
        <div class="profileInformation">
          <div class="profileHeader">
            <p class="profilePseudo">${profile.user_name}</p>
            <!-- <span class="profileTag">#1029</span> -->
          </div>
            <p class="profileName">@${profile.id_name}</p>
            <p class="profileBio">${profile.description}</p>
            <div class="profileStats">
                <div><span>LVL</span>${getLevel(data.length)}</div>
                <div><span>TOTAL SCORE</span>${total}</div>
                <div><span>NOMBRES DE SCORE</span>${data.length}</div>
            </div>
        </div>

        <div class="status-row">
            <div class="dot"></div>
            <div class="status-label">EN LIGNE</div>
        </div>
    
    `


}

loadProfile();


function getLevel(score) {
  if (score <= 0) return 1;
  return Math.floor((0.9 * Math.pow(score, 1.1)) / (1 + 0.002 * score));
}