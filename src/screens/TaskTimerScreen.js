import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Divider } from 'react-native-elements';
import Spacer from '../components/Spacer';
import SectionContainer from '../components/SectionContainer';
import MoveToBottom from '../components/MoveToBottom';
import Timer from '../components/Timer';
import { Context as TaskContext } from '../context/TaskContext';

const TaskTimerScreen = ({ navigation }) => {
	const taskId = navigation.getParam('id');
	const { state, updateTask } = useContext(TaskContext);
	const task = state.tasks.find((task) => task._id === taskId);
	const [taskDuration, setTaskDuration] = useState(
		task != undefined ? task.duration : 0
	);

	const [isTimerEnded, setIsTimerEnded] = useState(false);
	const [isPomodoro, setIsPomodoro] = useState(
		task != undefined ? task.isPomodoro : false
	);
	const [timerLoad, setTimerLoad] = useState(0);
	const [isBreakTime, setIsBreakTime] = useState(false);
	const [isLastLoad, setIsLastLoad] = useState(false);
	const [pomodorosCounter, setPomodorosCounter] = useState(0);
	const [message, setMessage] = useState('Work!\n ');
	const [isTaskDone, setIsTaskDone] = useState(false);

	/** Method that refresh the timer.
	 * Check if it is the last load and assign values ​​according to the case.
	 */
	const refreshTimer = () => {
		if (isLastLoad === true) {
			setTimerLoad(0);
			setMessage('Task completed');
			setIsTaskDone(true);
		} else {
			setTimerLoad(0);
			setIsBreakTime(!isBreakTime);
			setIsTimerEnded(!isTimerEnded);
		}
	};

	/** Method that handles the load of time to pass to the timer.
	 * Check if it is a pomodoro timer or not and manage the load accordingly.
	 */
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

	/** Function that mark a task as done and launch updateTask for the active task.
	 * Then, returns to TaskHome screen.
	 */
	function markTaskDoneAndGoBack() {
		let category = 'Done';
		let isDone = true;
		setIsTaskDone(true);
		updateTask({ taskId, isDone, category });
		navigation.navigate('TaskHome');
	}

	/** useEffect hook for launch timerLoadHandler every time that isTimerEnded changes. */
	useEffect(() => {
		timerLoadHandler();
	}, [isTimerEnded]);

	return (
		<SafeAreaView
			style={
				Dimensions.get('window').width < 1200
					? styles.containerWeb1200
					: styles.container
			}
			forceInset={{ top: 'always' }}
		>
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
				<Spacer>
					<Spacer>
						<Divider />
					</Spacer>

					<Text style={styles.infoMessage}>
						Total task time: {task != undefined ? task.duration : 0}{' '}
						min
					</Text>
					{isPomodoro ? (
						<Text style={styles.infoMessage}>
							Time remaining: {taskDuration} min
						</Text>
					) : null}

					<Text style={styles.infoMessage}>
						Pomodoro is {isPomodoro ? 'ON' : 'OFF'}
					</Text>
					<Spacer>
						<Divider />
					</Spacer>
				</Spacer>
			</SectionContainer>

			<MoveToBottom>
				<Spacer>
					{!isTaskDone ? (
						<Button
							buttonStyle={styles.solidButton}
							title="Cancel"
							onPress={() => navigation.navigate('TaskHome')}
						/>
					) : (
						<Button
							buttonStyle={styles.solidButton}
							title="Go back"
							onPress={() => markTaskDoneAndGoBack()}
						/>
					)}
				</Spacer>
			</MoveToBottom>
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
		...Platform.select({
			android: {
				marginLeft: 0,
				marginRight: 0,
			},
			ios: {
				marginLeft: 0,
				marginRight: 0,
			},
			default: {
				marginTop: 20,
				marginLeft: 300,
				marginRight: 300,
			},
		}),
	},
	containerWeb1200: {
		flex: 1,
		justifyContent: 'flex-start',
		alignContent: 'space-around',
		marginLeft: 0,
		marginRight: 0,
	},
	timerContainer: {
		alignSelf: 'center',
		justifyContent: 'center',
		...Platform.select({
			android: {
				height: 350,
			},
			ios: {
				height: 350,
			},
			default: {
				height: 400,
			},
		}),
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
	solidButton: {
		...Platform.select({
			android: {
				backgroundColor: '#C830CC',
				marginBottom: 10,
			},
			ios: {
				backgroundColor: '#C830CC',
				marginBottom: 10,
			},
			default: {
				alignSelf: 'center',
				backgroundColor: '#C830CC',
				marginBottom: 10,
				width: '40%',
				padding: 10,
			},
		}),
	},
	infoMessage: {
		textAlign: 'center',
		fontSize: 16,
	},
});

export default TaskTimerScreen;
