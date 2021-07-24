import 'react-native-gesture-handler';
import React from 'react';

// Redux
import { Provider } from 'react-redux'
import store from './redux/store';

import AppNavigator from './routes/AppNavigator';

const App: React.FC = () => (
	<Provider store={store}>
		<AppNavigator />
	</Provider>
)

export default App
