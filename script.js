// =============================================
// SOUTH AFRICAN LOTTO AI GENERATOR
// =============================================

const MAX_NUMBER = 52;
const MAIN_NUMBERS = 6;

let totalTickets = 0;
let totalOdd = 0;
let totalEven = 0;
let totalSum = 0;

// Generate tickets
function generateTickets(amount) {

    const container = document.getElementById("ticketContainer");
    container.innerHTML = "";

    totalTickets = amount;
    totalOdd = 0;
    totalEven = 0;
    totalSum = 0;

    for (let i = 1; i <= amount; i++) {

        const ticket = generateBalancedTicket();
        displayTicket(ticket, i);

    }

    updateStatistics();

}

// Generate one balanced ticket
function generateBalancedTicket() {

    while (true) {

        let numbers = [];

        while (numbers.length < MAIN_NUMBERS) {

            let number = Math.floor(Math.random() * MAX_NUMBER) + 1;

            if (!numbers.includes(number)) {
                numbers.push(number);
            }

        }

        numbers.sort((a, b) => a - b);

        if (passesRules(numbers)) {

            let bonus;

            do {

                bonus = Math.floor(Math.random() * MAX_NUMBER) + 1;

            } while (numbers.includes(bonus));

            return {

                numbers: numbers,
                bonus: bonus

            };

        }

    }

}

// AI-inspired balancing rules
function passesRules(numbers) {

    let odd = 0;
    let even = 0;
    let low = 0;
    let high = 0;
    let sum = 0;
    let consecutive = 0;

    for (let i = 0; i < numbers.length; i++) {

        let n = numbers[i];

        sum += n;

        if (n % 2 === 0)
            even++;
        else
            odd++;

        if (n <= 26)
            low++;
        else
            high++;

        if (i > 0 && numbers[i] === numbers[i - 1] + 1)
            consecutive++;

    }

    if (odd < 2 || odd > 4) return false;
    if (even < 2 || even > 4) return false;
    if (low < 2 || low > 4) return false;
    if (high < 2 || high > 4) return false;
    if (sum < 90 || sum > 210) return false;
    if (consecutive > 2) return false;

    totalOdd += odd;
    totalEven += even;
    totalSum += sum;

    return true;

}

// Display ticket
function displayTicket(ticket, index) {

    const container = document.getElementById("ticketContainer");

    const card = document.createElement("div");
    card.className = "ticket";

    let html = `<h3>Ticket ${index}</h3>`;

    ticket.numbers.forEach(number => {

        html += `<div class="ball">${String(number).padStart(2, '0')}</div>`;

    });

    html += `<br><br>`;

    html += `<strong>Bonus Ball</strong><br>`;

    html += `<div class="ball bonus">${String(ticket.bonus).padStart(2, '0')}</div>`;

    card.innerHTML = html;

    container.appendChild(card);

}

// Update statistics
function updateStatistics() {

    document.getElementById("ticketCount").innerHTML = totalTickets;

    document.getElementById("oddCount").innerHTML = totalOdd;

    document.getElementById("evenCount").innerHTML = totalEven;

    if (totalTickets > 0) {

        document.getElementById("averageSum").innerHTML =
            Math.round(totalSum / totalTickets);

    }

}

// Generate one ticket when page loads
window.onload = function () {

    generateTickets(1);

};