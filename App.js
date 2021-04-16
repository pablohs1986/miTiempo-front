import React from 'react';
import { LogBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import appNavigator from './src/navigation/appNavigator';
import { setNavigator } from './src/navigation/externalNavigator';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as UserProvider } from './src/context/UserContext';

// LogBox.ignoreAllLogs(); // Ignore all log notifications on dev device

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
