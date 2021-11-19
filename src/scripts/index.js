import 'regenerator-runtime'; /* for async await transpile */
import '../styles/style.scss';
import swRegister from './utils/sw-register';
import data from '../DATA.json';

const articlesContainer = document.body.querySelector('#articles-container');

function showArticles (search) {
  articlesContainer.innerHTML = '';
  let articles = '';
  const result = data.restaurants
    .filter(item => {
      if ([null, undefined, ''].includes(search)) {
        return true;
      }

      let found = false;
      ['name', 'description', 'city'].some(key => {
        found = item[key].toLowerCase().includes(search.toLowerCase());
        return found;
      });
      return found;
    });
  if (result.length) {
    result.forEach(item => {
      articles += `
      <article class="bg-white border-primary border-rad-8px">
          <img class="pictures border-rad-8px" src="${item.pictureId}" alt="${item.name} Picture">
          <section class="m-a-8px">
              <h3 class="m-y-0 txt-primary">
                  <a href="#" class="flex align-items-center">${item.name}</a>
              </h3>
              <ul class="m-y-8px flex txt-primary">
                  <li>
                      <span role="note" aria-label="Rating">
                          <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                      </span>
                      ${item.rating}
                  </li>
                  <li class="m-l-8px">
                      <span role="note" aria-label="Location">
                          <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                          </svg>
                      </span>
                      ${item.city}
                  </li>
              </ul>
              <p class="txt-justify">${item.description}</p>
          </section>
      </article>
    `;
    });

    articlesContainer.innerHTML = articles;

    const pictures = document.body.querySelectorAll('.pictures');
    if (pictures && pictures.length) {
      pictures.forEach(picture => {
        picture.addEventListener('error', item => {
          if (picture.getAttribute('src') !== './images/sorry.jpg') {
            picture.setAttribute('src', './images/sorry.jpg');
            const defaultAlt = picture.getAttribute('alt');
            picture.setAttribute('alt', `${defaultAlt} Cannot be Loaded`);
          }
        });
      });
    }
  } else {
    articlesContainer.innerHTML = `
      <div class="grid-col-span-1 laptop-grid-col-span-3">
        <h3 tabindex="0" class="txt-center txt-primary">No Restaurant Found.</h3>
      </div>
    `;
  }
}

if (articlesContainer) {
  showArticles();
  document.body.querySelector('#search-button').addEventListener('click', () => {
    const searchBox = document.body.querySelector('#search');
    if (searchBox) {
      showArticles(searchBox.value);
    }
  });

  document.body.querySelector('#year').innerHTML = new Date().getFullYear();

  if (document.documentElement.clientWidth <= 640) {
    document.body.querySelectorAll('.max-height-0 .menu-item').forEach(item => {
      item.setAttribute('tabindex', '-1');
    });
  }
  document.body.querySelector('#show-menu').addEventListener('click', () => {
    const menu = document.body.querySelector('#menu');
    menu.classList.toggle('max-height-0');
    menu.classList.toggle('max-height-screen');

    document.body.querySelectorAll('.menu-item').forEach(item => {
      item.setAttribute('tabindex', [0].includes(parseInt(item.getAttribute('tabindex'), 10)) ? '-1' : '0');
    });
  });

  window.addEventListener('resize', event => {
    if (document.documentElement.clientWidth <= 640) {
      document.body.querySelectorAll('.max-height-0 .menu-item').forEach(item => {
        item.setAttribute('tabindex', '-1');
      });
      document.body.querySelectorAll('.max-height-screen .menu-item').forEach(item => {
        item.setAttribute('tabindex', '0');
      });
    } else {
      document.body.querySelectorAll('.menu-item').forEach(item => {
        item.setAttribute('tabindex', '0');
      });
    }
  });
}

window.addEventListener('load', () => {
  swRegister();
});
