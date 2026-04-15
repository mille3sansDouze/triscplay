    const scores = [
      { game: "TRIS CLASSIQUEezez",  value: "9 870",  rank: "S+",    rankClass: "gold",   trend: "+340",  trendDir: "up",   pct: 98, accent: "#e94560" },
      { game: "SPRINT 40L",      value: "00:42.3", rank: "GOLD",  rankClass: "gold",   trend: "-1.2S", trendDir: "up",   pct: 91, accent: "#f0c040" },
      { game: "BLITZ 2MIN",      value: "18 450",  rank: "PLAT",  rankClass: "silver", trend: "+820",  trendDir: "up",   pct: 76, accent: "#85b7eb" },
      { game: "MARATHON",        value: "120K",    rank: "OR",    rankClass: "gold",   trend: "+5K",   trendDir: "up",   pct: 85, accent: "#f0c040" },
      { game: "ULTRA 3MIN",      value: "24 110",  rank: "A",     rankClass: "red",    trend: "-200",  trendDir: "down", pct: 62, accent: "#e94560" },
      { game: "CHEESE RACE",     value: "01:14.8", rank: "B+",    rankClass: "",       trend: "+4.2S", trendDir: "down", pct: 47, accent: "#cd7f32" },
      { game: "ZENITH",          value: "LVL 38",  rank: "A+",    rankClass: "red",    trend: "+2",    trendDir: "up",   pct: 71, accent: "#e94560" },
      { game: "SURVIVAL",        value: "08:32",   rank: "ARGENT",rankClass: "silver", trend: "+1:04", trendDir: "up",   pct: 55, accent: "#a8b2c0" },
    ];
 
    const grid = document.getElementById('scoresGrid');
    scores.forEach(s => {
      const card = document.createElement('div');
      card.className = 'scoreCard';
      card.style.setProperty('--accent', s.accent);
      card.innerHTML = `
        <div class="score-game">${s.game}</div>
        <div class="score-value">${s.value}</div>
        <div class="score-meta">
          <div class="score-rank ${s.rankClass}">${s.rank}</div>
          <div class="score-trend ${s.trendDir}">${s.trendDir === 'up' ? '▲' : '▼'} ${s.trend}</div>
        </div>
        <div class="score-bar">
          <div class="score-bar-fill" style="width:0%" data-pct="${s.pct}"></div>
        </div>
      `;
      grid.appendChild(card);
    });
 
    // animate bars after render
    requestAnimationFrame(() => {
      document.querySelectorAll('.score-bar-fill').forEach(el => {
        setTimeout(() => { el.style.width = el.dataset.pct + '%'; }, 120);
      });
    });