class Animal{
    name;
    age;
    makeSound(){
        console.log("...");
    }
};

class Dog extends Animal{
    makeSound(){
        console.log("Гав!");
    }
};

class Cat extends Animal{
    makeSound(){
        console.log("Мяу!");
    }
};

class Parrot extends Animal{
    makeSound(){
        console.log("Привіт!");
    }   
};

class Zoo{
    animals = [];

    addAnimal(animal){
        if(!(animal instanceof Animal)){
            throw new Error("You can add only instances of Animal or its subclasses.");
        }
        this.animals.push(animal);
    }

    makeAllSounds(){
        this.animals.forEach(animal => animal.makeSound());
    }

    feedAnimals(){
        this.animals.forEach(animal => {
            if (animal instanceof Dog) {
            console.log("Собака їсть м'ясо");
            } else if (animal instanceof Cat) {
            console.log("Кіт їсть рибу");
            } else if (animal instanceof Parrot) {
            console.log("Папуга їсть зерно");
            } else {
            console.log(`Годуємо ${animal.name}`);
            }
        });
    }

    transferAnimal(animal, otherZoo){
        const index = this.animals.indexOf(animal);
        if (index !== -1) {
            this.animals.splice(index, 1);
            otherZoo.addAnimal(animal);
            console.log(`${animal.name} переміщено до іншого зоопарку.`);
        } else {
            console.log(`${animal.name} не знайдено у зоопарку.`);
        }
    }

    toJSON(){
        return JSON.stringify(this.animals.map(animal => ({
            type: animal.constructor.name,
            name: animal.name,
            age: animal.age
        })));
    }

    static fromJSON(jsonString){
        const data = JSON.parse(jsonString);
        const zoo = new Zoo();
        data.forEach(item => {
            let animal;
            switch (item.type) {
                case "Dog":
                    animal = new Dog();
                    break;
                case "Cat":
                    animal = new Cat();
                    break;
                case "Parrot":
                    animal = new Parrot();
                    break;
                default:
                    throw new Error(`Unknown animal type: ${item.type}`);
            }
            animal.name = item.name;
            animal.age = item.age;
            zoo.addAnimal(animal);
        });
        return zoo;
    }

};

class ZooKeeper {
    name;
    animalsTypes;

    constructor(name, animalsTypes) {
        this.name = name;
        this.animalsTypes = animalsTypes; // Array of allowed classes, e.g. [Dog, Cat]
    }

    feedAnimals(animals) {
        animals.forEach(animal => {
            if (this.animalsTypes.some(type => animal instanceof type)) {
                if (animal instanceof Dog) {
                    console.log("Собака їсть м'ясо");
                } else if (animal instanceof Cat) {
                    console.log("Кіт їсть рибу");
                } else if (animal instanceof Parrot) {
                    console.log("Папуга їсть зерно");
                } else {
                    console.log(`Годуємо ${animal.name}`);
                }
            } else {
                console.log(`${this.name} не може годувати ${animal.name}`);
            }
        });
    }
}


//test code
const zoo1 = new Zoo();
const zoo2 = new Zoo();

const dog1 = new Dog();
dog1.name = "Бобік";
dog1.age = 3;
const cat1 = new Cat();
cat1.name = "Мурчик";
cat1.age = 2;
const parrot1 = new Parrot();
parrot1.name = "Кеша";
parrot1.age = 1;

zoo1.addAnimal(dog1);
zoo1.addAnimal(cat1);
zoo1.addAnimal(parrot1);
zoo1.makeAllSounds();
zoo1.feedAnimals();

// Testing ZooKeeper
const dogKeeper = new ZooKeeper("Іван", [Dog]);
const catKeeper = new ZooKeeper("Олена", [Cat]);
const allKeeper = new ZooKeeper("Петро", [Dog, Cat, Parrot]);
dogKeeper.feedAnimals([dog1, cat1, parrot1]);
catKeeper.feedAnimals([dog1, cat1, parrot1]);
allKeeper.feedAnimals([dog1, cat1, parrot1]);

// Transfer cat1 from zoo1 to zoo2
zoo1.transferAnimal(cat1, zoo2);
zoo1.makeAllSounds();
zoo2.makeAllSounds();

// Testing serialization and deserialization
const json = zoo1.toJSON();
console.log(json);

const zoo3 = Zoo.fromJSON(json);
zoo3.makeAllSounds();

