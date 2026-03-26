const images = ["../assets/animation/tour1.png", "../assets/animation/tour2.png", "../assets/animation/tour3.png", "../assets/animation/tour4.png", "../assets/animation/tour5.png", "../assets/animation/tour6.png", "../assets/animation/tour7.png"];
const txt = ["aller...", "plus vite !!!", "aaaahh", "Le savait tu ? Triscplay à été crée le 5 Janvier 2026", "Vive le régime communiste chinois", "Chargement de marceau.png", "Quel GOAT ce marceau", "SPINNINGGGGGGGGG", "Wesh wesh canne à peche"];

function goToPage(url) {
    const overlay = document.getElementById("transition");
    const loader = document.getElementById("loader");
    const text = document.getElementById("loadingText");

    overlay.style.display = "flex";

    text.textContent = txt[getRandomArbitrary(0, txt.length)];
        
    let index = 0;

    const intervalTime = 200;
    const minDuration = 2000; 


    const interval = setInterval(() => {
        loader.src = images[index];
        index = (index + 1) % images.length;
    }, intervalTime);

    setTimeout(() => {
        clearInterval(interval);
        window.location.href = url;
    }, minDuration);


    
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
     
}