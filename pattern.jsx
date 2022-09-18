Factory method. Объединение инициализации инстансов в одном методе с замыканием.
{
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


Builder. 



Prototype

Singleton. Функция, которая создаёт один и тот же объект с неизменяемыми свойствами. Сам объект вшит в прототип.
let instance
class Counter {
	constructor(){
		if (!instance) instance = this
		return instance
	}
}

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
Adapter
Brigde
Composite
Decorator
Fasade
Flyweight
Proxy

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
