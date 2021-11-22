class Favorite extends HTMLElement {
  connectedCallback () {
    this.render();
  }

  render () {
    this.innerHTML = `
      <p>Favorite</p>
    `;
  }
}

export default Favorite;
