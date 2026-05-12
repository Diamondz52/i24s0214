import { Car } from "./car";
import { Garage } from "./garage";
import { Motorcycle } from "./motorcycle";

const garage = new Garage();

const car1 = new Car('brand_a', 2000, 'model_a');
const car2 = new Car('brand_b', 2001, 'model_b');
const car3 = new Car('brand_c', 2002, 'model_c');

const motorcycle1 = new Motorcycle('brand_d', 2000, 'type-a');
const motorcycle2 = new Motorcycle('brand_e', 2000, 'model-b');
const motorcycle3 = new Motorcycle('brand_f', 2000, 'model-c');

garage.addVehicle(car1);
garage.addVehicle(car2);
garage.addVehicle(car3);
garage.addVehicle(motorcycle1);
garage.addVehicle(motorcycle2);
garage.addVehicle(motorcycle3);
