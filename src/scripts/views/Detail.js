class Detail extends HTMLElement {
  connectedCallback () {
    this.render();
  }

  render () {
    this.innerHTML = `
      <p>Detail</p>
    `;
  }
}

export default Detail;
