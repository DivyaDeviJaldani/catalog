const fs = require('fs');

function decodeValue(value, base) {
    return BigInt(parseInt(value, base)); 
}

function lagrangeInterpolation(points) {
    let secret = 0n;
    for (let i = 0; i < points.length; i++) {
        let xi = BigInt(points[i][0]);
        let yi = points[i][1];
        let num = 1n, den = 1n;
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let xj = BigInt(points[j][0]);
                num *= -xj;
                den *= (xi - xj);
            }
        }
        secret += yi * num / den;
    }
    return secret;
}

let data = JSON.parse(fs.readFileSync('input.json','utf8'));
let n = data.keys.n;
let k = data.keys.k;

let points = [];
Object.keys(data).forEach(key => {
    if (key !== 'keys') {
        let base = parseInt(data[key].base);
        let val = decodeValue(data[key].value, base);
        points.push([parseInt(key), val]);
    }
});
points = points.slice(0, k);

console.log(String(lagrangeInterpolation(points)));

