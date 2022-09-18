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
		if (name instanceof Functin) {
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


Brigde  -> Муторная штука, лучше смотреть отдельно. Нерекомендуемая к использованию.

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


Flyweight . Легковес . Cash . Выделяет повторяющие элементы ООП дизайна в отдельную сущность и при потребности даёт instance через factory
Не сохраняет дважды объекты при наличии одинакового имени.
Не добавлена реализация ибо нет практичного примера использования.


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
Поведенческие шаблоны.

Chain . Пример handler'a:
class VirtualChains {
	handler() {
		if (this.hasHand()) { // Условие выполнения
			console.log('Handler has done');
		}
		else if (this.incomer) { // Проверка на существование приемника у обработчика
			console.log('Next handler')
			this.incomer.handler() // Запуск рекурсивно преемника
		}
		else {	console.log('Ни один хендлер не справился и приемника дальше нет')	}
	}
	hasHand() {	return false }
	setIncomer(chain) {	this.incomer = chain }
}

class Chain1 extends VirtualChains {
	constructor() {
		super()
		// ...logic
	}
}
class Chain2 extends VirtualChains {
	constructor() { super() }
}
class Chain3 extends VirtualChains {
	constructor() { super() }
}

let chain1 = new Chain1; let chain2 = new Chain2; let chain3 = new Chain3
chain1.setIncomer(chain2) // Установка зависимостей
chain2.setIncomer(chain3) // Если 1 не справится - работает 2 и дальше
chain1.handler() // Выполнение с 1-го обработчика


Command


Iterpraton


Iterator . Итератор . Интерфейс для обхода коллекции интансов. Формально обертка над коллекцией для настраиваемого обхода по коллекции.
class Iterator {
	constructor(collection) {
		this.index = 0
		this.collection = collection
	}
	next() { return this.collection[this.index++] }
	hasNext() { return this.index < this.elements.length }
}

let coll = new Iterator(['a', 'b', 'c'])
console.log(coll.next())


Mediator Посредник . Нужно для переписи логики взаимодействия независимых блоков кода. 
В случае обращения такого блока - он обращается в медиатор, который либо внутри себя исполняет код, либо передаёт дальше.
Сборник функций при обращении разных независимых блоков кода. В конструкторе скорее всего держит intances всех рассматр. блоков.
class Mediator {
	constructor() {
		this.customers = []
		... and other linked components
	}
	addToCustomersList(name) { this.customers.push(name) }
	midiatorFunc(customer) {     // Функция связывающая сам блок медиатора с объектами Customer
		let name = customer.getName()
		this.addToCustomersList(name)
	}
}
class Customer { // Интерфейс одного из связающихся блоков
	constructor(name, mediatorInstance) {
		this.name = name
		this.mediator = mediatorInstance
	}
	makeSmth() {
		this.mediator.midiatorFunc(this)
	}
	getName() {	return this.name } // Для медиатора
}

const mediator = new Mediator()
let customer = new Customer('Ivan', mediator)
let customer2 = new Customer('Sav', mediator) // sample text


Memento . Снимок . Хранитель . Создаёт обёртку для сохранения значений некоторых объектов.


Observer
State
Stronger


Visitor . К уже созданному ООП интерфейсу требуется добавить функционал. Создаём независимый класс/функцию,
к которому в конструкторе требуем instance всех интресуемых классов. В интересуемом интерфейсе
передаём this визитёру, а он уже накидывает допоплнительные плюшки на instance.
function Visitor(instance){
	if (instance intanceof Component){instance.somth = () => {...} }
}
Внутри класса для instance добавить метод be like accept(visitor){ visitor(this); }
Вызов intance.accept(Visitor) => добавлен новый функционал без нагромождения кода в основном интерфейсе.

	
	
Strategy Имеется общий интерфейс.
Функции стратегии описывают параметры конструктора для создания instances этого интерфейса.

function strategy1() { return '1' }
function strategy2() { return '2' }
function strategy3() { return '3' }

class CommonInterface {
	constructor(strategy) {
		console.log(`Выполняется в соответствии с параметрами стратегии ${strategy()}`);
	}
}

let instance1 = new CommonInterface(strategy3)
let instance2 = new CommonInterface(strategy2)
