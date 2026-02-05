
function parseInput(input: string): number;
function parseInput(input: string, radix: number): number;


function parseInput(input: string, radix?: number): number {
    if (radix !== undefined) {
        return parseInt(input, radix);
    }
    return parseInt(input);
}


const decimalNumber = parseInput("123"); 
console.log("Десятичное число:", decimalNumber); 


const binaryNumber = parseInput("1010", 2); 
console.log("Двоичное число:", binaryNumber); 

const hexNumber = parseInput("FF", 16); 
console.log("Шестнадцатеричное число:", hexNumber); 

const octalNumber = parseInput("77", 8); 
console.log("Восьмеричное число:", octalNumber); 

console.log("\nДополнительные примеры:");
console.log(parseInput("10")); 
console.log(parseInput("10", 2));
console.log(parseInput("10", 8)); 
console.log(parseInput("10", 16));
console.log(parseInput("0xFF", 16)); 
console.log(parseInput("101", 2)); 