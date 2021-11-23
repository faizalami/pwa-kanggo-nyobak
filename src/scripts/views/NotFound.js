class NotFound extends HTMLElement {
  connectedCallback () {
    this.render();
  }

  render () {
    this.innerHTML = `
      <section class="txt-primary txt-center">
        <h2>404</h2>
        <p>Not Found.</p>
      </section>
    `;
  }
}
customElements.define('not-found', NotFound);
