import {createApp} from 'vue';
import App from './App.vue';
import { rootContainerId } from "./.config";
import './css/tailwind.css';

createApp(App).mount('#' + rootContainerId);
