function toArray<T>(...args: T[]): T[] {
  return args;
}

const numbers = toArray(1, 2, 3, 4, 5);       
const strings = toArray('a', 'b', 'c');        
const booleans = toArray(true, false, true);   

console.log(numbers); 
console.log(strings); 
console.log(booleans); 