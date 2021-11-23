export default function (selector) {
  const pictures = document.body.querySelectorAll(selector);
  if (pictures && pictures.length) {
    pictures.forEach(picture => {
      picture.addEventListener('error', item => {
        if (picture.getAttribute('src') !== './images/sorry.jpg') {
          picture.setAttribute('src', './images/sorry.jpg');
          const defaultAlt = picture.getAttribute('alt');
          picture.setAttribute('alt', `${defaultAlt} Picture Cannot be Loaded`);
        }
      });
    });
  }
}
