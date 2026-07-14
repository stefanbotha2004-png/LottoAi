// ============================================
// SOUTH AFRICAN LOTTO AI
// storage.js
// ============================================

const STORAGE_KEY = "lottoSavedTickets";

// ---------------------------
// SAVE ALL GENERATED TICKETS
// ---------------------------

function saveTickets() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(generatedTickets)

    );

}

// ---------------------------
// SAVE ONE TICKET
// ---------------------------

function saveSingle(index) {

    let saved = getSavedTickets();

    saved.push(generatedTickets[index]);

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(saved)

    );

    displaySavedTickets();

    alert("Ticket Saved!");

}

// ---------------------------
// LOAD SAVED
// ---------------------------

function getSavedTickets() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data == null)

        return [];

    return JSON.parse(data);

}

// ---------------------------
// DISPLAY SAVED
// ---------------------------

function displaySavedTickets() {

    const container = document.getElementById("savedTickets");

    if (!container)

        return;

    const saved = getSavedTickets();

    if (saved.length === 0) {

        container.innerHTML =

        "<p>No saved tickets.</p>";

        return;

    }

    let html = "";

    saved.forEach((ticket,index)=>{

        html += `

        <div class="savedTicket">

        <strong>Ticket ${index+1}</strong>

        <br><br>

        ${ticket.numbers.join(" - ")}

        <br>

        Bonus :

        ${ticket.bonus}

        <br><br>

        <button onclick="favoriteTicket(${index})">

        ⭐ Favorite

        </button>

        <button onclick="deleteTicket(${index})">

        🗑 Delete

        </button>

        </div>

        <hr>

        `;

    });

    container.innerHTML = html;

}

// ---------------------------
// DELETE
// ---------------------------

function deleteTicket(index){

    let saved = getSavedTickets();

    saved.splice(index,1);

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(saved)

    );

    displaySavedTickets();

}

// ---------------------------
// FAVORITE
// ---------------------------

function favoriteTicket(index){

    let saved = getSavedTickets();

    saved[index].favorite = true;

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(saved)

    );

    alert("Ticket marked as favorite!");

}

// ---------------------------
// EXPORT
// ---------------------------

function exportTickets(){

    const saved = getSavedTickets();

    if(saved.length===0){

        alert("No saved tickets.");

        return;

    }

    let text="South African Lotto AI\n\n";

    saved.forEach((ticket,i)=>{

        text +=

        "Ticket "

        +(i+1)

        +"\n";

        text +=

        ticket.numbers.join(" ")

        +"\n";

        text +=

        "Bonus: "

        +ticket.bonus

        +"\n\n";

    });

    const blob = new Blob(

        [text],

        {type:"text/plain"}

    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "SavedTickets.txt";

    link.click();

}

// ---------------------------
// CLEAR ALL
// ---------------------------

function clearSavedTickets(){

    if(confirm("Delete all saved tickets?")){

        localStorage.removeItem(STORAGE_KEY);

        displaySavedTickets();

    }

}

// ---------------------------
// STARTUP
// ---------------------------

window.addEventListener(

"load",

displaySavedTickets

);