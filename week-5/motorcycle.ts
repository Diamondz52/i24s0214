import { Vehicle } from "./vehicle";

export class Motorcycle extends Vehicle{
    type:string

    constructor(brand: string, year: number, type: string){
        super(brand, year)
        this.type = type
    }
    getInfo(): string {
        return 'Мотоцикл ${this.brand}, тип ${this.type}, ${this.year} г.в. (ID: ${this.getId()})';
    }
    override startEngine(){
        console.log('Автомобиль заводится с ключа')
        super.startEngine();
    }
}
