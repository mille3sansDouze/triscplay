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
        console.log(s);
        const card = document.createElement('div');
        card.className = 'scoreCard';
        
        card.innerHTML = `
            
            <div class="score-game">${s.game.name}<button class="card-close" id="card-close-btn">✕</button></div>
            <div class="score-value">${s.score}</div>
            
            <div class="score-meta">
                <div class="score-rank">#${index + 1}</div>
                <div>${new Date(s.created_at).toLocaleDateString()}</div>
            </div>

            <div class="score-bar">
                <div class="score-bar-fill" style="width:100}%"></div>
            </div>
        `;

        card.querySelector('.card-close').addEventListener('click', () => {
        deleteScore(s.id, card);
        });

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