// ============================================
// SOUTH AFRICAN LOTTO AI ENGINE
// ai.js
// Version 2.0
// ============================================

const MAX_NUMBER = 52;
const MAIN_NUMBERS = 6;

// Generate one balanced ticket
function createBalancedTicket() {

    while (true) {

        let numbers = [];

        while (numbers.length < MAIN_NUMBERS) {

            const candidate = weightedRandom();

            if (!numbers.includes(candidate)) {

                numbers.push(candidate);

            }

        }

        numbers.sort((a, b) => a - b);

        if (passesRules(numbers)) {

            let bonus;

            do {

                bonus = randomNumber();

            } while (numbers.includes(bonus));

            return {

                numbers: numbers,
                bonus: bonus,
                sum: calculateSum(numbers),
                odd: countOdd(numbers),
                even: countEven(numbers),
                confidence: calculateConfidence(numbers)

            };

        }

    }

}

// ---------------------------
// RANDOM NUMBER
// ---------------------------

function randomNumber() {

    return Math.floor(Math.random() * MAX_NUMBER) + 1;

}

// ---------------------------
// WEIGHTED RANDOM
// ---------------------------

function weightedRandom() {

    let value;

    do {

        value = randomNumber();

    } while (Math.random() > getWeight(value));

    return value;

}

// ---------------------------
// WEIGHTS
// ---------------------------

function getWeight(number) {

    if (number >= 10 && number <= 45)

        return 0.95;

    if (number <= 5)

        return 0.70;

    if (number >= 46)

        return 0.80;

    return 0.90;

}

// ---------------------------
// AI RULES
// ---------------------------

function passesRules(numbers) {

    const odd = countOdd(numbers);

    const even = countEven(numbers);

    const low = numbers.filter(n => n <= 26).length;

    const high = numbers.filter(n => n > 26).length;

    const sum = calculateSum(numbers);

    if (odd < 2 || odd > 4) return false;

    if (even < 2 || even > 4) return false;

    if (low < 2 || low > 4) return false;

    if (high < 2 || high > 4) return false;

    if (sum < 90 || sum > 210) return false;

    if (hasTooManyConsecutive(numbers)) return false;

    return true;

}

// ---------------------------
// CONSECUTIVE NUMBERS
// ---------------------------

function hasTooManyConsecutive(numbers) {

    let consecutive = 0;

    for (let i = 1; i < numbers.length; i++) {

        if (numbers[i] === numbers[i - 1] + 1) {

            consecutive++;

        }

    }

    return consecutive > 2;

}

// ---------------------------
// SUM
// ---------------------------

function calculateSum(numbers) {

    return numbers.reduce((a, b) => a + b, 0);

}

// ---------------------------
// ODD
// ---------------------------

function countOdd(numbers) {

    return numbers.filter(n => n % 2 !== 0).length;

}

// ---------------------------
// EVEN
// ---------------------------

function countEven(numbers) {

    return numbers.filter(n => n % 2 === 0).length;

}

// ---------------------------
// AI CONFIDENCE
// ---------------------------

function calculateConfidence(numbers) {

    let score = 100;

    const sum = calculateSum(numbers);

    if (sum < 120 || sum > 180)

        score -= 8;

    const odd = countOdd(numbers);

    if (odd !== 3)

        score -= 5;

    if (hasTooManyConsecutive(numbers))

        score -= 10;

    return Math.max(score, 75);

}

// ---------------------------
// HOT NUMBERS (Demo)
// ---------------------------

function getHotNumbers() {

    return [11, 18, 27, 34, 42];

}

// ---------------------------
// COLD NUMBERS (Demo)
// ---------------------------

function getColdNumbers() {

    return [2, 8, 15, 29, 51];

}

// ---------------------------
// LUCKY PICK
// ---------------------------

function luckyPick() {

    return createBalancedTicket();

}

// ---------------------------
// RANDOM MODE
// ---------------------------

function randomMode() {

    let numbers = [];

    while (numbers.length < MAIN_NUMBERS) {

        let n = randomNumber();

        if (!numbers.includes(n))

            numbers.push(n);

    }

    numbers.sort((a, b) => a - b);

    return {

        numbers: numbers,

        bonus: randomNumber(),

        sum: calculateSum(numbers),

        odd: countOdd(numbers),

        even: countEven(numbers),

        confidence: 80

    };

}