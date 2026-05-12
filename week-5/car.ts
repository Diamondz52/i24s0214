import {Vehicle} from './vehicle'

export class Car extends Vehicle {
    model: string;

    constructor(brand: string, year: number, model: string) {
        super(brand, year);
        this.model = model;
    }

    getInfo(): string {
        return `Автомобиль ${this.brand} ${this.model}, ${this.year} г.в. (ID: ${this.getId()})`;
    }

    override startEngine() {
        console.log('Автомобиль заводится с ключа');
        super.startEngine();
    }
}