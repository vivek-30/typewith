import { FloatingActionButton } from 'materialize-css';
import { ToolBarButton, drawerBtn, tools } from './Elements';
import { handleSideBarDisplay, handleUsersToolChoice } from './helperFunctions';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';

FloatingActionButton.init(ToolBarButton, {
    direction: 'left',
    hoverEnabled: false
});

drawerBtn.addEventListener('click', handleSideBarDisplay);
tools.addEventListener('click', handleUsersToolChoice);
