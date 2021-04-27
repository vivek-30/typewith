import { FloatingActionButton, Tooltip } from 'materialize-css';
import { toolBarButton, toolTipps, drawerBtn, tools } from './Elements';
import { handleSideBarDisplay, handleUsersToolChoice } from './helperFunctions';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';

FloatingActionButton.init(toolBarButton, {
    direction: 'left',
    hoverEnabled: false
});

Tooltip.init(toolTipps, {
    position: 'top',
    exitDelay: 0,
    enterDelay: 1,
    inDuration: 300,
    outDuration: 0,
    margin: 10
});

drawerBtn.addEventListener('click', handleSideBarDisplay);
tools.addEventListener('click', handleUsersToolChoice);
