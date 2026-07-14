// ==========================================
// SOUTH AFRICAN LOTTO AI
// MAIN CONTROLLER
// Version 2.0
// ==========================================

const ticketContainer =
document.getElementById("ticketContainer");

const ticketCount =
document.getElementById("ticketCount");

const averageSum =
document.getElementById("averageSum");

const themeButton =
document.getElementById("themeButton");

let generatedTickets = [];

let darkMode = true;

/* ==========================
THEME
========================== */

themeButton.addEventListener("click",toggleTheme);

function toggleTheme(){

document.body.classList.toggle("light");

darkMode=!darkMode;

themeButton.innerHTML=

darkMode ?

"🌙 Dark Mode"

:

"☀ Light Mode";

}

/* ==========================
GENERATE BUTTON
========================== */

function generateTickets(amount){

ticketContainer.innerHTML="";

generatedTickets=[];

let total=0;

for(let i=0;i<amount;i++){

const ticket=createBalancedTicket();

generatedTickets.push(ticket);

total+=ticket.sum;

displayTicket(ticket,i+1);

}

ticketCount.innerHTML=amount;

averageSum.innerHTML=

Math.round(total/amount);

saveTickets();


updateCharts();

}

/* ==========================
DISPLAY
========================== */

function displayTicket(ticket,index){

const card=document.createElement("div");

card.className="ticket";

let html=

`<h3>Ticket ${index}</h3>`;

ticket.numbers.forEach(number=>{

html+=

`<div class="ball">

${number.toString().padStart(2,"0")}

</div>`;

});

html+=

`<br><br>

<strong>Bonus Ball</strong>

<br>

<div class="ball bonus">

${ticket.bonus.toString().padStart(2,"0")}

</div>

<br><br>

<button onclick="copyTicket(${index-1})">

📋 Copy

</button>

<button onclick="saveSingle(${index-1})">

💾 Save

</button>`;

card.innerHTML=html;

ticketContainer.appendChild(card);

}

/* ==========================
COPY
========================== */

function copyTicket(index){

const ticket=

generatedTickets[index];

const text=

ticket.numbers.join(" ")

+

" Bonus "

+

ticket.bonus;

navigator.clipboard.writeText(text);

alert("Ticket copied!");

}

/* ==========================
STARTUP
========================== */

window.onload=function(){

generateTickets(1);

};