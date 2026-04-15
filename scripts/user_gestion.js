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
        <h2>${user.id_name}</h2>
        <p>${user.email}</p>
        <p>ID : ${user.id_user}</p>
        <p class="meta">${user.user_name} | ${user.role}</p>
      </div>
    </div>
    `).join("");

}

async function loadUsers() {
  const res = await fetch(`http://localhost:3000/user/`, {
    method: "GET",
    headers: getAuthHeaders()
});
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
