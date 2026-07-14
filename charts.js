// ============================================
// SOUTH AFRICAN LOTTO AI
// charts.js
// ============================================

let frequency = new Array(53).fill(0);

// --------------------------------------------
// UPDATE ALL STATISTICS
// --------------------------------------------

function updateCharts() {

    calculateFrequency();

    updateHotCold();

    updateDistribution();

    drawFrequencyChart();

}

// --------------------------------------------
// CALCULATE FREQUENCY
// --------------------------------------------

function calculateFrequency() {

    frequency.fill(0);

    generatedTickets.forEach(ticket => {

        ticket.numbers.forEach(number => {

            frequency[number]++;

        });

    });

}

// --------------------------------------------
// HOT & COLD NUMBERS
// --------------------------------------------

function updateHotCold() {

    const numbers = [];

    for(let i=1;i<=52;i++){

        numbers.push({

            number:i,

            count:frequency[i]

        });

    }

    numbers.sort((a,b)=>b.count-a.count);

    const hot = numbers.slice(0,5);

    const cold = [...numbers]
        .reverse()
        .slice(0,5);

    document.getElementById("hotNumbers").innerHTML =

        hot.map(n=>n.number).join(" • ");

    document.getElementById("coldNumbers").innerHTML =

        cold.map(n=>n.number).join(" • ");

}

// --------------------------------------------
// ODD / EVEN
// --------------------------------------------

function updateDistribution(){

    let odd=0;
    let even=0;

    generatedTickets.forEach(ticket=>{

        ticket.numbers.forEach(number=>{

            if(number%2===0)
                even++;
            else
                odd++;

        });

    });

    console.log(

        "Odd:",odd,

        "Even:",even

    );

}

// --------------------------------------------
// DRAW SIMPLE BAR CHART
// --------------------------------------------

function drawFrequencyChart(){

    const canvas = document.getElementById("frequencyChart");

    if(!canvas)
        return;

    const ctx = canvas.getContext("2d");

    canvas.width = 1000;

    canvas.height = 350;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const max = Math.max(...frequency);

    const width = canvas.width/52;

    for(let i=1;i<=52;i++){

        const h =

        max===0

        ?

        0

        :

        (frequency[i]/max)*250;

        ctx.fillStyle="#FFD700";

        ctx.fillRect(

            i*width,

            300-h,

            width-3,

            h

        );

        ctx.fillStyle="white";

        ctx.font="10px Arial";

        ctx.fillText(

            i,

            i*width,

            320

        );

    }

}

// --------------------------------------------
// MOST FREQUENT
// --------------------------------------------

function mostFrequent(){

    let highest=0;

    let number=1;

    for(let i=1;i<=52;i++){

        if(frequency[i]>highest){

            highest=frequency[i];

            number=i;

        }

    }

    return number;

}

// --------------------------------------------
// LEAST FREQUENT
// --------------------------------------------

function leastFrequent(){

    let lowest=999999;

    let number=1;

    for(let i=1;i<=52;i++){

        if(frequency[i]<lowest){

            lowest=frequency[i];

            number=i;

        }

    }

    return number;

}

// --------------------------------------------
// AVERAGE
// --------------------------------------------

function averageFrequency(){

    let total=0;

    for(let i=1;i<=52;i++){

        total+=frequency[i];

    }

    return total/52;

}

// --------------------------------------------
// REFRESH
// --------------------------------------------

setInterval(function(){

    if(generatedTickets.length>0){

        updateCharts();

    }

},1000);