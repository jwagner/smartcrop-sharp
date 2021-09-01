import {crop} from '..';

crop(`${__dirname}/flower.jpg`, {
  width: 16,
  height: 16
}).then(crop => console.log(crop));