const fs = require('fs');
let textByLine = fs.readFileSync('./victor.txt').toString().split("");
console.log(textByLine.join(""))

// remove accents 
const accents = ["à", "é", "è", "ù", "â", "ê" , "î"  
 , "ô" , "û" , "ç" , "œ", "ï", "ë", "ü"]
const accent = { "à" : "a", "é" : "e", "è" : "e", "ù" : "u", "ê" : "e" , "â" : "a"
, "î" : "i", "ô" : "o", "û" : "u", "ç" : "c", "œ" : "oe", "ï" : "i" , "ë" : "e", "ü" : "ü"}

let sentence = []
let count = 0 

const remove_accent = string => {
    for (let i = 0; i < string.length; i ++ ) {
        let a = string[i] 
        for (let j = 0; j<string.length; j++) {
            if (string[i] === accents[j]) {
                sentence.push(accent[accents[j]])
                count += 1 
            }
        } 
        if (count === 1) {
            count = 0 
        }
        else {
            sentence.push(string[i])
        }
        
        
    } 
    return sentence.join("")

}

console.log(remove_accent(textByLine))
