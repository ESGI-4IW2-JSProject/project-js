import { calendarCreate, setDayDetailView } from "./js/calendar.mjs";
import { Router } from './js/router.mjs';

var today = new Date();

document.addEventListener("DOMContentLoaded", function() {

    calendarCreate(today.getMonth(), today.getFullYear())

    Router.config({ mode: 'history'});

    Router.navigate();

    Router
        .add(/about/, function() {
            console.log('about');
        })
        .add(/products\/(.*)\/edit\/(.*)/, function() {
            console.log('products', arguments);
        })
        .add(function() {
            console.log('default');
        })
        .check('/products/12/edit/22').listen();

    //Router.navigate('/about');
});

export { today };