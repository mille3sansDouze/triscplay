const addbtn = document.getElementById("get")
const postbtn = document.getElementById("post")
const delbtn = document.getElementById("del")
/*const addbtn = document.getElementById("get")*/

async function loadGames() {
  const res = await fetch("http://localhost:3000/game/");
  const data = await res.json();
  console.log(data);
}


async function postGame() {
  let name = prompt("nom");
  let description = prompt("description");

  const res = await fetch("http://localhost:3000/game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      description: description,
      pegi: 18,
      playerCount: 1,
      isMultiplayer: false
    })
  });

  const data = await res.json();
  console.log(data);
}



async function delGame(id) {
    const res = await fetch(`http://localhost:3000/game/${id}`, {
        method: "DELETE"
    });
    const data = await res.json();
    console.log(data);
}

addbtn.addEventListener("click", () => {
    loadGames();
    
})

postbtn.addEventListener("click", () =>{
    postGame();
})

delbtn.addEventListener("click", () => {
    const id = prompt("id del")
    delGame(id);

})