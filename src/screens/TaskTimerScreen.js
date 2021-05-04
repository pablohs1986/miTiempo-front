import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import SectionContainer from '../components/SectionContainer';
import MoveToBottom from '../components/MoveToBottom';
import PomodoroTimer from '../components/PomodoroTimer';
import { Context as TaskContext } from '../context/TaskContext';

const TaskTimerScreen = ({ navigation }) => {
	const taskId = navigation.getParam('id');
	const { state } = useContext(TaskContext);
	const task = state.tasks.find((task) => task._id === taskId);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<PomodoroTimer timerTask={task} />
		</SafeAreaView>
	);
};

TaskTimerScreen.navigationOptions = {
	headerShown: false,
	cardStyle: { backgroundColor: '#F2F1F6' },
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignContent: 'space-around',
		backgroundColor: '#F2F1F6',
	},
});

export default TaskTimerScreen;
