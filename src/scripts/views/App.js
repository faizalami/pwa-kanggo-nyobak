class App {
  constructor (componentsInitiators) {
    this._components = componentsInitiators;

    this._initComponents();
  }

  _initComponents () {
    Object.values(this._components).forEach(component => {
      if (component.init) {
        component.init();
      }
    });
  }

  render () {
    // todo: next to do
  }
}

export default App;
