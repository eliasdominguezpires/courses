const multiplicar = (base, li = false, l = 10) => {
    let salida = '', consola = '';

    for (let i = 1; i <= l; i++) {
        consola += `${base} ${'x'.blue} ${i} = ${base * i} \n`;
        salida += `${base} ${'x'} ${i} = ${base * i} \n`;
    }
    if (li)
        console.log(consola);
    return salida;
}

module.exports = {
    multiplicar
}