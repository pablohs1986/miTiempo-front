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

/** Navegation */
const switchNavigator = createSwitchNavigator({
	loginFlow: createStackNavigator({
		Signup: SignupScreen,
		Signin: SigninScreen,
	}),
	mainFlow: createBottomTabNavigator({
		homeFlow: createStackNavigator({
			TaskList: TaskListScreen,
			TaskDetail: TaskDetailScreen,
			TaskTimer: TaskTimerScreen,
		}),
		TaskTime: TrackerScreen,
		TaskCreate: TaskCreateScreen,
		Account: AccountScreen,
	}),
});

const App = createAppContainer(switchNavigator);

export default () => {
	return <App />;
};
