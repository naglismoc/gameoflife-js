console.log('hey');
let count = 1;
// setInterval(function() {
//     console.log(++count);

// }, 200);


// setTimeout(function() {
//     console.log("labas");

// }, 2000);

let area = [];
// sukuriame pirmajį table
for (let i = 0; i < 5; i++) {
    area.push([]);
    for (let a = 0; a < 5; a++) {
        if (Math.random() > 0.5) {
            area[i].push(" ");
        } else {
            area[i].push("X");
        }
    }
}
console.log(area);
//atvaizduojame pirmą table
for (let i = 0; i < area.length; i++) {
    let row = "";
    for (let a = 0; a < area[i].length; a++) {
        row += "[" + area[i][a] + "]";

    }
    console.log(row, i);
}

area2 = [];

// generuojame antrą table
for (let i = 0; i < 5; i++) {
    area2.push([]);
    for (let a = 0; a < 5; a++) {
        if (area[i][a] == " ") {
            area2[i].push(" ");
        } else {
            area2[i].push("0");
        }
    }
}

//atvaizduojame antrą table
console.log('------------------');
for (let i = 0; i < area2.length; i++) {
    let row = "";
    for (let a = 0; a < area2[i].length; a++) {
        row += "[" + area2[i][a] + "]";

    }
    console.log(row, i);
}