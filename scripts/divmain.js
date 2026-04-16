async function loadMain() {
    let data = []; 

    try {
        const res = await fetch(`http://localhost:3000/scoreboard/`);
        data = await res.json();
        console.log(data);
    } catch {
        alert("sa marche pas zebi");
        return; // stop si erreur
    }
    const cardsdiv = document.getElementById("cardsdiv");
    data.forEach((s, index) => {
        const card = document.createElement('div');
        card.className = "card";
        card.innerHTML = `
        <div class="card-label">${s.game.name}</div>
        <div class="card-value">${s.score}</div>
        <div class="card-desc">${s.user.user_name}</div>
        `;

        cardsdiv.appendChild(card);
    });
}

loadMain()