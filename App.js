import React from 'react';
import { createAppContainer } from 'react-navigation';
import appNavigator from './src/navigation/appNavigator';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigation/externalNavigator';

const App = createAppContainer(appNavigator());

export default () => {
	return (
		<AuthProvider>
			<App ref={setNavigator} />
		</AuthProvider>
	);
};
