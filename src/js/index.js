// import $ from "jquery";
import Swiper from 'swiper';
import { add } from './modules/math';

import 'swiper/css';
import '../scss/style.scss';


const result = add(1, 2);
console.log(result);

// $('body').append(result);

const swiper = new Swiper('.swiper', {

});
