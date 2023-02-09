/// let A = [1, 3, 6, 4, 1, 2]; devolver 5
//Given A = [1, 2, 3], the function should return 4.
//Given A = [-1, -3], the function should return 1.
console.clear();
const long = 10;
const init = 1;
const value = [1, 3, 4, 6, 1, 2];

const min = Math.min(value);
const max = Math.max(value);
console.log("Min " + min, "Max " + max);

let secuencia = [];
for (let i = init; i <= long; i++) {
    secuencia.push(i);
};

console.log(secuencia);

value.map(v => {
    console.log(secuencia.indexOf(v))
});

/*value.forEach(v => {
    console.log(secuencia.find(e => {
        if (e != v){
            return e;
        }
    }));
})*/