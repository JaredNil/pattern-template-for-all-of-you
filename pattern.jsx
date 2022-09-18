Factory method . Объединение инициализации инстансов в одном методе.
{ // ES6
	class Item {
		constructor(prop1, prop2){
			this.prop1 = prop1; this.prop2 = prop2;
		}
	};
	class FactoryItem{
		create(type){
		if(type=='...') return new Item(value1(prop1), value2(prop2))
		if(type=='...') return new Item(value3(prop1), value4(prop2))
		}
	}
	const factory = new FactoryItem(); let instance = factory.create('...')
}

{ // ES5
	function BlockFactory() { };

	BlockFactory.register = function (name, ItemConstructor) { // Outer
		if (name instanceof Function) {
			ItemConstructor = name
			name = null
		}

		if (!(ItemConstructor instanceof Function)) {
			throw { name: 'Error', message: 'ItemConstructor is not function' }
		}
		this[name || ItemConstructor.name] = ItemConstructor
	}

	BlockFactory.create = function (itemName) {
		let ItemConstructor = this[itemName];
		if (!(ItemConstructor instanceof Function)) {
			throw {	name: 'Error',	message: 'constructor "' + itemName + '" undefined' }
		}
		return new ItemConstructor();
	}

	BlockFactory.register('dog', function () {

		this.say = () => console.log('gav') // BODY-CONSTRUCTOR ITEMS FOR FACTORY

	})

	let dogInstanse = BlockFactory.create('dog') // create instance
	dogInstanse.say()  // closures
}


Builder . Класс обёртка, которая за счет chain может создавать в упрощенном интерфейсе сложные штуки.
class Item {
	constructor() {
		this.prop1
		this.prop2
		this.prop3
	}
}

class ItemBuilder {
	constructor() {
		this.item = new Item()
		// return this.item
	}
	handlerProp(changeProp1) {
		this.item.prop1 = changeProp1
		return this // for chains
	}

	build() {
		return this.item // finally
	}
}

let itemIntance = new ItemBuilder()
	.handlerProp('...')
	.handlerProp('...')
	.build()

Prototype . Добавление в класс метода копирующий конструктор, позволяя копировать instance с всеми вложенными пропсами.
class Item{
	constructor(prop1, prop2, prop3){
		this.prop1 = prop1;
		this.prop2 = prop2;
		this.prop3 = prop3;
	}
	
	clone(){   // prototype
		return new Item(this.prop1, this.prop2, this.prop3)
	}
}

Singleton . Функция, которая создаёт один и тот же объект с неизменяемыми свойствами. Сам объект вшит в прототип.
// CLASS
let instance 
class Counter {
	constructor(){
		if (!instance) instance = this
		return instance
	}
}
// FUNCTION
function SingletonFunction() { 
	let instance; 
	SingletonFunction = function () {
		return instance;
	}
	SingletonFunction.prototype = this;

	instance = new SingletonFunction();
	instance.constructor = SingletonFunction;
	instance.property1 = 'value';
	instance.property2 = 'value';

	return instance;
}

//////////////////////////////////////////////////////////////////////////////
Adapter . Класс прослойка, чтобы привести интерфейсы к одинаковым методам при помощи переоопределия instance
class someClass{
	someFunc(){...}
};
class otherClass{
	otherFunc(){...}
};
class otherClassAdapter{
	constructor(otherClass){
		this.otherClass = otherClass
	}
	someClass{
		this.otherClass.otherFunc()
	}
}
let a = new someClass()  -> same interface
let b = new otherClassAdapter() -> same interface


Brigde
Composite . Компоновщик -> 
class Component {
	getPrice() { return this.price || 0 }
	getName() { return this.name }
	setPrice(price) { this.price = price }
	setName(name) { this.name = name }
}
class Composite extends Component {
	constructor() {
		super()
		this.components = []
	}
	add(component) {
		this.components.push(component)
	}
	getPrice() {
		return this.components
			.map(component => component.getPrice())
			.reduce((a, b) => a + b)
	}
}

let isn = new Composite()
isn.add(new Component)
isn.getPrice() -> ...
	
	
Decorator - Изменяет значения свойств объекта, цепляясь к интерфейсу виртуального класса
class VirtualItem {
	constructor() {
		this.prop1
		this.prop2
	}
	getProp1() { return this.prop1 }
	getProp2() { return this.prop2 }
}

class Item extends VirtualItem {
	constructor() {
		super();
		this.prop1 = concreteValue1
		this.prop2 = concreteValue2
	}
}

class DecoratorProp1 {
	constructor(item) {
		this.item = item // instance of VirtualItem or Item
	}
	getProp1() { return `${this.item.getProp1()}` + DecoratorChange }
	getProp2() { return `${this.item.getProp2()}` + DecoratorChange }
}

let item = new Item();  item = new DecoratorProp1(item)

Facade . Класс, упрощающий взаимодействие с сложными повтояющими кусками кода.
class AbstractInterface {
	someFunc1() { console.log('Func1'); }
	someFunc2() { console.log('Func2'); }
	someFunc3() { console.log('Func3'); }
	someFunc4() { console.log('Func4'); }
}

class Facade {
	constructor(instance) {
		this.instance = instance
	}

	executing() {
		this.instance.someFunc1()
		this.instance.someFunc2()
		this.instance.someFunc3()
		this.instance.someFunc4()
	}
}

let instance = new AbstractInterface
new Facade(instance).executing()


Flyweight


Proxy . Оболочка для частичного доступа к необходимому объекту
class Interface {
	someFunc() { console.log('Func'); }
}
class ProxyAccess {
	constructor(instance) { // instance of Interface
		this.instance = instance
	}
	someFunc() {
		if ('какая-то проверка') this.instance.someFunc()
	}
}

const instance = new ProxyAccess(new Interface)
instance.someFunc()



//////////////////////////////////////////////////////////////////////////////
Chain
Command
Iterpraton
Iteration
Mediator
Memento
Observer
State
Stronger
template method
Visitor
