import ComponentInitiator from './ComponentInitiator';

class HeroPictureInitiator extends ComponentInitiator {
  constructor ({ heroPictureContainer, responsiveImages, responsiveImagesWebp, imageType }) {
    super();

    this._heroPictureContainer = heroPictureContainer;
    this._responsiveImages = responsiveImages;
    this._responsiveImagesWebp = responsiveImagesWebp;
    this._imageType = imageType;
  }

  _sourceWebp () {
    return this._responsiveImagesWebp.images.map(image => {
      return `
        <source media="(max-width: ${image.width}px)" srcset="${image.path}" type="image/webp">
      `;
    });
  }

  _sourceNormal () {
    return this._responsiveImages.images.map(image => {
      return `
        <source media="(max-width: ${image.width}px)" srcset="${image.path}" type="${this._imageType}">
      `;
    });
  }

  _fallbackImage () {
    return this._responsiveImages.images[this._responsiveImages.images.length - 1];
  }

  init () {
    this._heroPictureContainer.innerHTML = `
      <picture>
        ${this._sourceWebp().join('')}
        ${this._sourceNormal().join('')}
        <img
          src="${this._fallbackImage().path}"
          width="${this._fallbackImage().width}"
          height="250"
          alt=""
        />
      </picture>
    `;
  }
}

export default HeroPictureInitiator;
