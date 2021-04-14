import 'materialize-css/dist/css/materialize.min.css';
import { FloatingActionButton } from 'materialize-css';

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
    });
});

console.log('Working With TypeScript.');
