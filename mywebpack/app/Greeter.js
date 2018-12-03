

import config from './config.json';
import styles from './css.css';


export function greeter () {
    var greeter = document.createElement('div');

    greeter.textContent = 'Hello webpack!!! 111222' + config.greetText;
    greeter.className = styles.root;

    return greeter;
}