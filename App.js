import React from 'react';
import { createAppContainer } from 'react-navigation';
import appNavigator from './src/navigation/appNavigator';
import { setNavigator } from './src/navigation/externalNavigator';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as UserProvider } from './src/context/UserContext';

const App = createAppContainer(appNavigator());

export default () => {
	return (
		<UserProvider>
			<AuthProvider>
				<App ref={setNavigator} />
			</AuthProvider>
		</UserProvider>
	);
};
