import { FloatingActionButton } from 'materialize-css';
import { ToolBarButton, drawerBtn } from './Elements';
import { handleSideBarDisplay } from './helperFunctions';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';

FloatingActionButton.init(ToolBarButton, {
    direction: 'left',
    hoverEnabled: false
});

drawerBtn.addEventListener('click', handleSideBarDisplay);

console.log('Working With TypeScript.');
