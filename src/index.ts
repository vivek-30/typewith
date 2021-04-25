import { FloatingActionButton } from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css'

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
    });
});

console.log('Working With TypeScript.');
