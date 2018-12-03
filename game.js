// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/

const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    aiHand: "",
}

const hands = [...document.querySelectorAll(".select img")];

// Pierwsza funkcja
function handSelection() {
    game.playerHand = this.dataset.option
    console.log(game.playerHand);
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px yellow';

}

function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function checkResult(player, ai) {
    if (player === ai) {
        return 'draw';
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return 'win';
    } else {
        return 'loss';
    }



}
// Publikacja wyniku 
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;
    const winner = document.querySelector('[data-summary="who-win"]')
    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        winner.textContent = "WYGRAŁEŚ WARIACIE";
    } else if (result === "loss") {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        winner.textContent = "PRZEGRAŁEŚ :(";

    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        winner.textContent = "TO JEST REMIS!!!";

    }

}

function endGame() {
    document.querySelector(`[data-option=${game.playerHand}]`).style.boxShadow = "";
    game.playerHand = "";
}

// funkcja sterująca
function startGame() {
    if (!game.playerHand) {
        return alert("wybierz dłoń!!!")
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();


}

hands.forEach(hand => hand.addEventListener('click', handSelection))

document.querySelector(".start").addEventListener("click", startGame)