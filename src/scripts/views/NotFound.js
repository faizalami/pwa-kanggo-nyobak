class NotFound extends HTMLElement {
  connectedCallback () {
    this.render();
  }

  render () {
    this.innerHTML = `
      <p>404 Not Found</p>
    `;
  }
}
customElements.define('not-found', NotFound);
