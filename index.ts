import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App);
// Também garante que, seja ao abrir no Expo Go ou em um build nativo,
// o ambiente seja configurado corretamente
registerRootComponent(App);
