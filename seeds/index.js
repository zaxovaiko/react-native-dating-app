const faker = require('faker');
const gravatar = require('gravatar');
const admin = require('firebase-admin');
const serviceAccount = require('./lover-1b4a9-firebase-adminsdk-zd43d-0a4e8ce1b1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lover-1b4a9.firebaseio.com',
});

const db = admin.firestore();

const gravatarPicOptions = {
  s: '550',
  r: 'x',
  d: 'identicon',
};

(async () => {
  for (let i = 0; i < 20; i++) {
    const email = faker.internet.email();
    const user = {
      age: faker.random.number({min: 18, max: 40}),
      complete: true,
      email,
      gender: +!!(Math.random() > 0.5),
      interestedIn: +!!(Math.random() > 0.5),
      location: {
        geohash: 'u3h5n8144d',
        latitude: 51.1526983,
        longitude: 17.1621333,
      },
      name: faker.name.findName(),
      minAge: faker.random.number({min: 18, max: 24}),
      status: faker.lorem.paragraph(),
      tags: [],
      uid: '9VmRuT5V2ecdCJ33RshsgL1mGDp2',
      picture: gravatar.url(email, gravatarPicOptions, 'https'),
    };

    await db.collection('users').add(user);
  }

  console.log('Done');
})();
