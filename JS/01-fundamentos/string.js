function rot13(str) {
const letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const res = []
let simbolos = /[&\/\\#,+$~%.'":*?<>{}!]/g
let letra = /[A-Z]/g
for (let i = 0; i < str.length; i++)
{
  let index = letras.indexOf(str[i])
  console.log(str[i])
  if(str[i] != " " && str[i] != str.match(simbolos))
  {
    if ( index <= 12)
    {
      res.push(letras[index + 13])
    }
    else
    {
      res.push(letras [index - 13])
    }
  }
  else if (str[i] != str.match(letra))
  {
    res.push(str[i])
  }
  else
  {
    res.push(" ")
  }
}
console.log(res.join(""))
  return res.join("");
}
rot13("SERR YBIR?");