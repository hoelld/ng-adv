# Why dependency injection

Whats wrong with this code

```typescript
class Car {
  constructor() {
    this.engine = new Engine();
    this.tires = Tires.getInstance();
    this.doors = app.get('doors');
  }
}
```

Possible Answer:
Car directly depends on engine, Tires and doors.
Car even knows how to create those objects

This code is hard to maintain.

Imagine how to test the Cars functionality against its engine - it is not possible.

A better solution is to create the objects Car depend on elsewhere.

```typescript
class Car {
  constructor(engine, tires, doors) {
    this.engine = engine;
    this.tires = tires;
    this.doors = doors;
  }
}


// now we can:
var car = new Car(
  new Engine(),
  new Tires(),
  new Doors()
);

// But also:
var car = new Car(
  new MockEngine(),
  new MockTires(),
  new MockDoors()
);

```

Dependency Injection as a principle means that all objects we may depend on are injected into the new object.

# Dependency Inection in Angular

Code such as following tells angular what is needed to create a car.

```typescript
import { Inject } from '@angular/core';

class Car {
  constructor(
    @Inject(Engine) engine,
    @Inject(Tires) tires,
    @Inject(Doors) doors
  ) {
    ...
  }
}
```


to make this possible somewhere the classes that should be injected must be registered:

```typescript
var injector = Injector.ceate([
  { provide: Car, deps: [Engine, Tires, Doors] },
  { provide: Engine, deps: [] },
  { provide: Tires, deps: [] },
  { provide: Doors, deps: [] }
]);
```



It is also possible to provide other values:

```typescript
{ provide: 'some value', useValue: 'Hello World' }
{ provide: Engine, useClass: Engine }
{ provide: V8, useExisting: Engine }
```

But also to provide Factory Methods:

```typescript
{ 
  provide: Engine,
  useFactory: () => {
    if (IS_V8) {
      return new V8Engine();
    } else {
      return new V6Engine();
    }
  }
}
```

Even Factories with own dependencies

```typescript
{
  provide: Engine,
  useFactory: (car, engine) => {

  },
  deps: [Car, Engine]
}
```

more details and (c) of the abouve:
https://pascalprecht.github.io/slides/di-in-angular-2/#/1