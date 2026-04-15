const addbtn = document.getElementById("get")
const delbtn = document.getElementById("del")

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "x-session-id": localStorage.getItem("session_id")
  };
}

function renderData(data) {
  const container = document.getElementById("reponse");
    container.innerHTML = data.map(user => `
    <div class="card">
      <div class="card-inner">
        <h2>${user.email}</h2>
        <p>${user.id_name}</p>
        <p class="meta">User name : ${user.user_name} | Role : ${user.role}</p>
        <small>ID : ${user.id_user}</small>
      </div>
    </div>
    `).join("");

}

async function loadUsers() {
  const res = await fetch("http://localhost:3000/user/");
  const data = await res.json();
  console.log(data);
  renderData(data);
}

async function delUser(id) {
    const res = await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });
      try {
        const data = await res.json();
        console.log(data);
      } catch(e) {}

    await loadUsers()
}


addbtn.addEventListener("click", () => {
    loadUsers();
    
})

delbtn.addEventListener("click", () => {
    const id = prompt("id del")
    delUser(id);

})
