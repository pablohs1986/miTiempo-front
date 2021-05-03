import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import SectionContainer from '../components/SectionContainer';
import MoveToBottom from '../components/MoveToBottom';
import PomodoroTimer from '../components/PomodoroTimer';

const TaskTimerScreen = () => {
	return (
		<View>
			<PomodoroTimer />
		</View>
	);
};

TaskTimerScreen.navigationOptions = {
	headerShown: false,
	cardStyle: { backgroundColor: '#F2F1F6' },
};

const styles = StyleSheet.create({});

export default TaskTimerScreen;
