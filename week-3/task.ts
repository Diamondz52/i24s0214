function introduceYourself(name: string, age?: number): string {
    if (age == undefined){
        return(`Привет, меня зовут ${name}`)
    }else{
        return(`Привет, меня зовут ${name} мне ${age} лет`)
    }
}
console.log('Петр', 30)
console.log('Анна')

interface Book{
    title: string, 
    author: string,
    year?: number
}
const myLibrary: Book[] = [
    { 
        title: '451 градус по фаренгейту',
        author: 'Рэй брэдбери',
        year: 1953
    },

    { 
        title: 'Уличный кот по кличке Боб',
        author: 'Джэймс Боуэн',
    }
]
console.log(myLibrary)