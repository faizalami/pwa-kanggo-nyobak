class ComponentInitiator {
  constructor () {
    if (this.constructor === ComponentInitiator) {
      throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
    }
  }

  init () {
    throw new Error('You have to implement the method!');
  }
}

export default ComponentInitiator;
