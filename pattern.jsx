Factory


Builder
Prototype
Singleton
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
