console.log('hey');
let count = 1;
// setInterval(function() {
//     console.log(++count);

// }, 200);


// setTimeout(function() {
//     console.log("labas");

// }, 2000);


let width = 15; //tables width
let height = 15; //tables height
let times = 50; //how many times game will generate
let tableWidth = '400px'; // max-width limited to 100vw
let tableHeight = '400px'; // max-height limited to 100vh
let timeInterval = 250;

gameOfLife(); // starts the game of life





function gameOfLife() {
    let area = [
        []
    ];
    firstTable(area);
    printTable(area, 0);
    lifeBegins(area);
}

function firstTable(area) {
    for (let i = 0; i < height; i++) {
        area[0].push([]);
        for (let a = 0; a < width; a++) {
            if (Math.random() > 0.5) {
                area[0][i].push(" ");
            } else {
                area[0][i].push("■");
            }
        }
    }
}


async function lifeBegins(area) {
    // for (let era = 1; era < times; era++) {
    let era = 0;
    while (true) {
        era++;
        area.push([]);
        for (let Y = 0; Y < height; Y++) {
            area[era].push([]);
            for (let X = 0; X < width; X++) {
                let count = neighborCount(area[era - 1], Y, X);
                setCellValue(area, era, X, Y, count);
            }
        }
        if (areTablesEquals(area[era - 1], area[era])) { //we check if current and last tables are identical
            console.log("pasiekėme ekvilibriumą");
            break;
        }
        printTable(area, era);

        if (hasOscillation(area)) {
            console.log("pasiekėme periodinį pasikartojamumą");
            break;
        }
        await sleep(500);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hasOscillation(area) {
    for (let i = 0; i < area.length - 2; i++) {
        if (areTablesEquals(area[i], area[area.length - 1])) {
            return true;
        }
    }
    return false;
}



function areTablesEquals(pastTable, currentTable) {

    for (let i = 0; i < currentTable.length; i++) {
        for (let a = 0; a < currentTable[i].length; a++) {
            if (currentTable[i][a] != pastTable[i][a]) {
                return false;
            }
        }
    }
    return true;
}


function setCellValue(area, era, X, Y, count) {
    //  Any live cell with two or three live neighbours survives.
    //  Any dead cell with three live neighbours becomes a live cell.
    //  All other live cells die in the next generation. Similarly, all other dead cells stay dead.

    if ((count == 2 || count == 3) && area[era - 1][Y][X] == "■") {
        area[era][Y].push("■");
    } else if (count == 3 && area[era - 1][Y][X] == " ") {
        area[era][Y].push("■");
    } else {
        area[era][Y].push(' ');
    }
}




function neighborCount(society, row, col) {
    count = 0;
    for (i = row - 1; i <= row + 1; i++) {
        if (i >= 0 && i < society.length) { // fixed here
            for (j = col - 1; j <= col + 1; j++) {
                if (j >= 0 && j < society[i].length) { // fixed here
                    if (i != row || j != col) {
                        if (society[i][j] == '■') {
                            count++;
                        }
                    }
                }
            }
        }
    }
    return count;
}

function printTable(area, era) {
    for (let i = 0; i < area[era].length; i++) {
        let row = "";
        for (let a = 0; a < area[era][i].length; a++) {
            row += "[" + area[era][i][a] + "]";
        }
        console.log(row, i);
    }
    console.log('------------------');
    buildTable(area[era]);
}

function buildTable(array) {
    let html = ``;
    for (let row = 0; row < array.length; row++) {
        html += `<tr>`;
        for (let column = 0; column < array[0].length; column++) {
            if (array[row][column] == '■')
                html += `<td class="live"></td>`;
            else
                html += `<td></td>`;
        }
        html += `</tr>`;
    }

    let table = document.getElementById('game');
    table.innerHTML = html;
    table.style = `width: ${tableWidth}; height: ${tableHeight}`;
}