
function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "x-session-id": localStorage.getItem("session_id")
  };
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

const savebtn = document.getElementById('save_btn')

savebtn.addEventListener("click", () => {
    console.log("oki")
    save()
    
})



async function save() {
    const toast = document.getElementById('toast');
    const displayName = document.getElementById('display-name');
    const description = document.getElementById('bio')
    const currentPwd = document.getElementById('')
    const newPwd = document.getElementById('')
    const newPwdConfirm = document.getElementById('')
    const pdp = document.getElementById('pdp-input')
    
    const user_cookie = localStorage.getItem("user");
    if (!user_cookie) return;

    const user = JSON.parse(user_cookie);


    const body = {
        user_name: displayName.value,
        description: description.value,
        profile_pic_url: pdp.value
    }
    console.log("check")
    await fetch(`http://localhost:3000/user/${user.id_user}`, {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify(body)
        });

    

    toast.textContent = "✓ MODIFICATIONS ENREGISTRÉES | reload de la page automatique veuillez patienter "
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
    setTimeout(() => window.location.reload(), 3100);
}





async function loadProfile() {
    const displayName = document.getElementById('display-name');
    const description = document.getElementById('bio')
    const user_cookie = localStorage.getItem("user");
    const pdp = document.getElementById('pdp-input')
    const avatar = document.getElementById('avatar-img')

    if (!user_cookie) {
        alert("erreur de connexion veuillez vous reconnecter")
        localStorage.clear()
        window.location.href = "./page_connexion.html"
        return;
    }
    const user = JSON.parse(user_cookie);

    const res = await fetch(`http://localhost:3000/user/${user.id_user}`);
    const data = await res.json();
    console.log(data);
    //renderData(data);

    displayName.value = data.user_name
    description.value = data.description
    pdp.value = data.profile_pic_url
    avatar.src = data.profile_pic_url
}
loadProfile()

