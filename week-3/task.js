function introduceYourself(name, age) {
    if (age == undefined) {
        return ("\u041F\u0440\u0438\u0432\u0435\u0442, \u043C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 ".concat(name));
    }
    else {
        return ("\u041F\u0440\u0438\u0432\u0435\u0442, \u043C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 ".concat(name, " \u043C\u043D\u0435 ").concat(age, " \u043B\u0435\u0442"));
    }
}
console.log('Петр', 30);
console.log('Анна');
var myLibrary = [
    {
        title: '451 градус по фаренгейту',
        author: 'Рэй брэдбери',
        year: 1953
    },
    {
        title: 'Уличный кот по кличке Боб',
        author: 'Джэймс Боуэн',
    }
];
console.log(myLibrary);
