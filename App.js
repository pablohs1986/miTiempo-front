import React from 'react';
import { LogBox, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import appNavigator from './src/navigation/appNavigator';
import { setNavigator } from './src/navigation/externalNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as UserProvider } from './src/context/UserContext';
import { Provider as TaskProvider } from './src/context/TaskContext';

// Ignore logs on emulator screen
if (Platform.OS != 'web') {
	LogBox.ignoreAllLogs();
}

const App = createAppContainer(appNavigator());

export default () => {
	return (
		<SafeAreaProvider>
			<TaskProvider>
				<UserProvider>
					<AuthProvider>
						<App ref={setNavigator} />
					</AuthProvider>
				</UserProvider>
			</TaskProvider>
		</SafeAreaProvider>
	);
};
