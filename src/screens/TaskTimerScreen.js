import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import SectionContainer from '../components/SectionContainer';
import MoveToBottom from '../components/MoveToBottom';
import Timer from '../components/Timer';
import { Context as TaskContext } from '../context/TaskContext';

// TODO: implementar pausar, completar tarea al terminar temporizador y documentar
const TaskTimerScreen = ({ navigation }) => {
	const taskId = navigation.getParam('id');
	const { state } = useContext(TaskContext);
	const task = state.tasks.find((task) => task._id === taskId);
	const [taskDuration, setTaskDuration] = useState(task.duration);

	const [isTimerEnded, setIsTimerEnded] = useState(false);
	const [isPomodoro, setIsPomodoro] = useState(task.isPomodoro);
	const [timerLoad, setTimerLoad] = useState(0);
	const [isBreakTime, setIsBreakTime] = useState(false);
	const [isLastLoad, setIsLastLoad] = useState(false);
	const [pomodorosCounter, setPomodorosCounter] = useState(0);
	const [message, setMessage] = useState('Work!\n ');

	const refreshTimer = () => {
		if (isLastLoad === true) {
			setTimerLoad(0);
			setMessage('Task completed');
		} else {
			setTimerLoad(0);
			setIsBreakTime(!isBreakTime);
			setIsTimerEnded(!isTimerEnded);
		}
	};

	const timerLoadHandler = () => {
		if (isPomodoro) {
			// If pomodoro
			if (!isBreakTime) {
				// If is not breaktime
				setMessage('Work!');
				if (taskDuration - 25 <= 0) {
					// Work time less than break
					setTimerLoad(taskDuration);
					setIsLastLoad(true);
				}

				if (taskDuration - 25 > 0) {
					// Work time longer than break
					setTimerLoad(25);
					setTaskDuration(taskDuration - 25);
				}

				setPomodorosCounter(pomodorosCounter + 1);
			} else {
				// If is breaktime
				if (pomodorosCounter >= 1 && pomodorosCounter <= 4) {
					// Short breaks handler
					setTimerLoad(4);
					setMessage(
						'Short break ' +
							pomodorosCounter +
							' of 4!\nNew session starts in:'
					);
				} else if (pomodorosCounter === 5) {
					// Long breaks handler
					setTimerLoad(14);
					setMessage(`Long break!\nNew session starts in:`);
					setPomodorosCounter(0);
				}
			}
		} else {
			// If not pomodoro
			setTimerLoad(taskDuration);
			setIsLastLoad(true);
		}
	};

	useEffect(() => {
		timerLoadHandler();
	}, [isTimerEnded]);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<SectionContainer>
				<View style={styles.timerContainer}>
					<Text style={styles.message}>{message}</Text>

					{timerLoad === 0 ? (
						<Text style={styles.finalMessage}>GOOD JOB!</Text>
					) : (
						<Timer
							timerLoad={timerLoad}
							refreshTimer={refreshTimer}
						/>
					)}
				</View>
			</SectionContainer>

			<Text>Pomodoro? : {isPomodoro ? 'yes' : 'no'}</Text>
			<Text>Duracion tarae: {task.duration}</Text>
			<Text>Tiempo restante: {taskDuration}</Text>
			<Text>Break time: {isBreakTime ? 'yes' : 'no'} </Text>
			<Text>Descanso nº : {pomodorosCounter}</Text>
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
	timerContainer: {
		alignSelf: 'center',
		justifyContent: 'center',
		height: 350,
	},
	message: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: '900',
	},
	finalMessage: {
		fontSize: 120,
		fontWeight: '900',
		color: '#C830CC',
	},
	...Platform.select({
		android: {
			finalMessage: {
				textAlign: 'center',

				fontSize: 70,
				fontWeight: 'bold',
				color: '#C830CC',
			},
		},
		ios: {
			finalMessage: {
				fontSize: 120,
				fontWeight: '900',
				color: '#C830CC',
			},
		},
		default: {
			finalMessage: {
				textAlign: 'center',

				fontSize: 120,
				fontWeight: '900',
				color: '#C830CC',
			},
		},
	}),
});

export default TaskTimerScreen;
