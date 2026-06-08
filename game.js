let hp = 100;
let currentAnswer = 0;

function startBattle() {
    let playerName = document.getElementById("name").value;
    if (playerName.trim() === "") {
        alert("Bhai, name chhara battleground-e jawa nishedh!");
        return;
    }
    
    // Switch screens
    document.getElementById("lobby").classList.add("hidden");
    document.getElementById("game-zone").classList.remove("hidden");
    
    generateQuestion();
}

function generateQuestion() {
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    currentAnswer = num1 + num2;
    
    document.getElementById("question-text").innerText = `Enemy Spotted! Fast calculate: ${num1} + ${num2} = ?`;
    document.getElementById("answer").value = "";
}

function fireWeapon() {
    let userAnswer = document.getElementById("answer").value;
    
    if (userAnswer == currentAnswer) {
        alert("💥 Headshot! Perfect Answer.");
        generateQuestion(); // Clear & give new puzzle
    } else {
        hp -= 20;
        document.getElementById("hp").innerText = hp;
        alert("❌ Miss! Enemy tomake damage dise (-20 HP).");
        
        if (hp <= 0) {
            alert("☠️ Tumi sesh! Chicken Dinner missed.");
            location.reload(); // Reset game
        } else {
            generateQuestion();
        }
    }
}
