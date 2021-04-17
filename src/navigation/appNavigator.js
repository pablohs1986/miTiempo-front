import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoadingScreen from '../screens/LoadingScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import TaskCreateScreen from '../screens/TaskCreateScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskHomeScreen from '../screens/TaskHomeScreen';
import TaskTimerScreen from '../screens/TaskTimerScreen';
import TrackerScreen from '../screens/TrackerScreen';
import AccountScreen from '../screens/AccountScreen';
import EditAccountScreen from '../screens/EditAccountScreen';
import { FontAwesome5 } from '@expo/vector-icons';

/** Method that generates the navigation of the application. */
export default () => {
	const homeFlow = createStackNavigator({
		TaskHome: TaskHomeScreen,
		TaskDetail: TaskDetailScreen,
		TaskTimer: TaskTimerScreen,
	});

	homeFlow.navigationOptions = {
		tabBarIcon: ({ tintColor }) => (
			<FontAwesome5 name="home" size={20} style={{ color: tintColor }} />
		),
	};

	const accountFlow = createStackNavigator({
		Account: AccountScreen,
		EditAccount: EditAccountScreen,
	});

	accountFlow.navigationOptions = {
		tabBarIcon: ({ tintColor }) => (
			<FontAwesome5 name="cog" size={20} style={{ color: tintColor }} />
		),
	};

	const switchNavigator = createSwitchNavigator({
		loadingApp: LoadingScreen,
		loginFlow: createStackNavigator({
			Signup: SignupScreen,
			Signin: SigninScreen,
		}),
		mainFlow: createBottomTabNavigator(
			{
				homeFlow,
				Tracker: TrackerScreen,
				TaskCreate: TaskCreateScreen,
				accountFlow,
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

	return switchNavigator;
};
