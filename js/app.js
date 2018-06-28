import "../scss/main.scss";

document.addEventListener("DOMContentLoaded", function () {

    const cardsColor = ["yellow", "yellow", "violet", "violet", "cadetblue", "cadetblue", "green", "green", "grey", "grey", "brown", "brown", "crimson", "crimson", "blue", "blue", "darkcyan", "darkcyan"];

    let cards = document.querySelectorAll(".square");
    cards = [...cards];
    const startTime = new Date().getTime();

    let activeCard = "";
    const activeCards = [];

    const gamePairs = cards.length / 2;
    let gameResult = 0;

    const clickCard = function () {
        activeCard = this;

        if (activeCard === activeCards[0]) return;

        activeCard.classList.remove('hidden');

        if (activeCards.length === 0) {
            activeCards[0] = activeCard;
            return;
        } else {
            cards.forEach(card => card.removeEventListener('click', clickCard));
            activeCards[1] = activeCard;

            setTimeout(function () {

                if (activeCards[0].className === activeCards[1].className) {
                    //console.log("you win!!!");

                    activeCards.forEach(card => card.classList.add("off"));
                    gameResult++;

                    cards = cards.filter(card => !card.classList.contains("off"));


                    if (gameResult === gamePairs) {
                        const endTime = new Date().getTime();
                        const gameTime = (endTime - startTime) / 1000;

                        alert(`Udało sie! twój wynik: ${gameTime} sekund`);
                        location.reload();
                    }


                } else {
                    //console.log("lose :(");
                    activeCards.forEach(card => card.classList.add("hidden"));
                }

                //RESET
                activeCard = "";
                activeCards.length = 0;
                cards.forEach(card => card.addEventListener("click", clickCard));
            }, 500);
        }
    };

    const init = function () {


        cards.forEach((card) => {
            const position = Math.floor(Math.random() * cardsColor.length);
            card.classList.add(cardsColor[position]);
            cardsColor.splice(position, 1);
        });

        setTimeout(function () {
            cards.forEach((card) => {
                card.classList.add("hidden");
                card.addEventListener("click", clickCard);
            });

        }, 2000);
    };

    const startBtn = document.querySelector('.startBtn');
    startBtn.addEventListener("click", function () {
        init();
        this.parentNode.removeChild(this);
    });

});
