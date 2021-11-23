## PWA Kanggo Nyobak

Website Progressive Web App sederhana dibangun pake web component dan di-bundle pake webpack.

### Development
```shell
# Setelah clone projek, install dependencies dengan
$ npm install
# atau
$ yarn install

# Setelah itu jangan lupa buat file .env, bisa copy dari .env.example kalo nggak ada customisasi
$ cp .env.example .env

# Projek siap di-run pake
$ npm run start-dev
# atau
$ yarn start-dev
```

### Production
```shell
# Untuk build production tinggal pake
$ npm run build
# atau
$ yarn build

# Kalo belum ada web server bisa dicoba pake
$ npm run start-prod
# atau
$ yarn start-prod
```
