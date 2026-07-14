// ============================================
// SOUTH AFRICAN LOTTO AI
// checker.js
// ============================================

// --------------------------------------------
// CHECK ALL GENERATED TICKETS
// --------------------------------------------

function checkTickets(){

    const input = document
        .getElementById("winningNumbers")
        .value
        .trim();

    if(input===""){

        alert("Please enter 6 winning numbers.");

        return;

    }

    let winning = input
        .split(/[ ,]+/)
        .map(Number)
        .filter(n=>!isNaN(n));

    if(winning.length!==6){

        alert("Enter exactly 6 numbers.");

        return;

    }

    winning = [...new Set(winning)];

    if(winning.length!==6){

        alert("Duplicate numbers are not allowed.");

        return;

    }

    if(winning.some(n=>n<1||n>52)){

        alert("Numbers must be between 1 and 52.");

        return;

    }

    let bestTicket = -1;
    let bestMatches = -1;

    let results = "";

    generatedTickets.forEach((ticket,index)=>{

        const matches =
            countMatches(ticket.numbers,winning);

        results +=
        "Ticket "
        +(index+1)
        +" : "
        +matches
        +" matches\n";

        if(matches>bestMatches){

            bestMatches=matches;
            bestTicket=index+1;

        }

    });

    results +=
    "\nBest Ticket : "
    +bestTicket
    +"\nMatches : "
    +bestMatches;

    alert(results);

    highlightBestTicket(bestTicket);

}

// --------------------------------------------
// COUNT MATCHES
// --------------------------------------------

function countMatches(ticket,winning){

    let count=0;

    ticket.forEach(number=>{

        if(winning.includes(number))
            count++;

    });

    return count;

}

// --------------------------------------------
// HIGHLIGHT BEST TICKET
// --------------------------------------------

function highlightBestTicket(index){

    const cards =
        document.querySelectorAll(".ticket");

    cards.forEach(card=>{

        card.style.border="";

        card.style.boxShadow="";

    });

    if(index<=0)
        return;

    cards[index-1].style.border =
        "3px solid gold";

    cards[index-1].style.boxShadow =
        "0 0 25px gold";

}

// --------------------------------------------
// DISPLAY MATCH MESSAGE
// --------------------------------------------

function getMatchMessage(matches){

    switch(matches){

        case 6:
            return "🏆 JACKPOT!";
        case 5:
            return "⭐⭐⭐⭐⭐ Five Matches!";
        case 4:
            return "⭐⭐⭐⭐ Four Matches!";
        case 3:
            return "⭐⭐⭐ Three Matches!";
        case 2:
            return "⭐⭐ Two Matches";
        case 1:
            return "⭐ One Match";
        default:
            return "No Matches";

    }

}

// --------------------------------------------
// CHECK ONE TICKET
// --------------------------------------------

function checkSingle(ticket,winning){

    const matches =
        countMatches(ticket.numbers,winning);

    return{

        matches:matches,

        message:getMatchMessage(matches)

    };

}

// --------------------------------------------
// OPTIONAL CELEBRATION
// --------------------------------------------

function celebrate(){

    document.body.animate(

    [

        {

            transform:"scale(1)"

        },

        {

            transform:"scale(1.01)"

        },

        {

            transform:"scale(1)"

        }

    ],

    {

        duration:500,

        iterations:2

    });

}