    function handleAvatar(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const img = document.getElementById('avatar-img');
        img.src = ev.target.result;
        img.style.display = 'block';
        document.getElementById('avatar-preview').style.fontSize = '0';
      };
      reader.readAsDataURL(file);
    }
 
    // ── Char counter
    function updateChar(inputId, countId, max) {
      const el = document.getElementById(inputId);
      const counter = document.getElementById(countId);
      const len = el.value.length;
      counter.textContent = `${len} / ${max}`;
      counter.classList.toggle('warn', len > max * 0.85);
    }
    // init counters
    updateChar('display-name','name-count',30);
    updateChar('bio','bio-count',150);
 
    // ── Password strength
    function checkStrength(val) {
      const fill = document.getElementById('strength-fill');
      const label = document.getElementById('strength-label');
      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      const levels = [
        { w: '0%',   bg: 'transparent', txt: '—' },
        { w: '25%',  bg: '#e94560',     txt: 'FAIBLE' },
        { w: '50%',  bg: '#e97c45',     txt: 'MOYEN' },
        { w: '75%',  bg: '#e9c845',     txt: 'FORT' },
        { w: '100%', bg: '#4ecca3',     txt: 'EXCELLENT' },
      ];
      const lvl = val.length === 0 ? levels[0] : levels[score];
      fill.style.width = lvl.w;
      fill.style.background = lvl.bg;
      label.textContent = `FORCE : ${lvl.txt}`;
      label.style.color = val.length ? lvl.bg : 'rgba(255,255,255,0.3)';
    }
 
    // ── Toggle password visibility
    function togglePwd(id, btn) {
      const input = document.getElementById(id);
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      btn.querySelector('svg').innerHTML = isText
        ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
        : '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
    }

    function save() {
      const toast = document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2800);
    }



