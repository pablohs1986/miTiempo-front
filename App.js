import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TaskCreateScreen from './src/screens/TaskCreateScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskTimerScreen from './src/screens/TaskTimerScreen';
import TrackerScreen from './src/screens/TrackerScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Provider as AuthProvider } from './src/context/AuthContext';

/** Navigation */
const homeFlow = createStackNavigator({
	TaskList: TaskListScreen,
	TaskDetail: TaskDetailScreen,
	TaskTimer: TaskTimerScreen,
});

homeFlow.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<FontAwesome5 name="home" size={20} style={{ color: tintColor }} />
	),
};

const switchNavigator = createSwitchNavigator({
	loginFlow: createStackNavigator({
		Signup: SignupScreen,
		Signin: SigninScreen,
	}),
	mainFlow: createBottomTabNavigator(
		{
			homeFlow,
			Tracker: TrackerScreen,
			TaskCreate: TaskCreateScreen,
			Account: AccountScreen,
		},
		{
			tabBarOptions: {
				showLabel: false,
				activeTintColor: '#C830CC',
				inactiveTintColor: 'grey',
			},
		}
	),
});

const App = createAppContainer(switchNavigator);

export default () => {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	);
};
