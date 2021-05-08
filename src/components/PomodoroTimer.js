import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import SectionContainer from '../components/SectionContainer';
import TaskItem from './TaskItem';

const PomodoroTimer = ({ timerTask }) => {
	const [isPomodoro, setIsPomodoro] = useState(timerTask.isPomodoro);
	const [duration, setDuration] = useState(timerTask.duration);
	const [timeToExpend, setTimeToExpend] = useState(0);
	const [minutes, setMinutes] = useState(timeToExpend);
	const [seconds, setSeconds] = useState(0);
	const [pomodorosCounter, setPomodorosCounter] = useState(1);
	const [isBreakTime, setIsBreakTime] = useState(true);
	const [message, setMessage] = useState('Work!!!\n ');

	// descanso corto = 5min
	// descanso largo = 15min
	// cada 4 cortos, 1 largo

	// duracion total de la tarea
	// tiempo restante

	const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

	// https://dev.to/alekswritescode/infinite-pomodoro-app-in-react-52jj

	useEffect(() => {
		handleTimeToExpend();
		console.log(timeToExpend);
		timer();
	}, [seconds]);

	const timer = () => {
		let interval = setInterval(() => {
			clearInterval(interval);

			if (seconds === 0) {
				if (minutes !== 0) {
					setSeconds(59);
					setMinutes(minutes - 1);
				} else {
					// Break or reset the timer
					let minutes = 0;
					let seconds = 0;

					if (isBreakTime) {
						// Short break
						if (pomodorosCounter >= 1 || pomodorosCounter <= 3) {
							minutes = 0;
							seconds = 59;
							setMessage(
								'Short break ' +
									pomodorosCounter +
									' of 4!\nNew session starts in:'
							);
							setPomodorosCounter(pomodorosCounter + 1);
						}
						// Long break
						if (pomodorosCounter === 5) {
							minutes = 1;
							seconds = 59;
							setMessage(`Long break!\nNew session starts in:`);
							setPomodorosCounter(1);
							setPomodorosCounter(1);
						}
					} else if (!isBreakTime) {
						minutes = 1;
						seconds = 59;
						setMessage(`Work!!!\n `);
					}

					setSeconds(seconds);
					setMinutes(minutes);
					setIsBreakTime(!isBreakTime);
					// setDisplayMessage(!displayMessage);
				}
			} else {
				setSeconds(seconds - 1);
				setDuration(duration - 1);
			}
		}, 0.1);
	};

	const handleTimeToExpend = () => {
		if (duration - 25 <= 0) {
			setTimeToExpend(duration);
		}

		if (duration - 25 > 0) {
			setTimeToExpend(25);
		}
	};

	return (
		<>
			<SectionContainer>
				<View style={styles.container}>
					<Text style={styles.message}>{message}</Text>
					<Text style={styles.clock}>
						{timerMinutes}:{timerSeconds}
					</Text>
				</View>
			</SectionContainer>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		justifyContent: 'center',
		height: 350,
	},
	clock: {
		fontSize: 120,
		fontWeight: '900',
		color: '#C830CC',
	},
	message: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: '900',
	},
});

export default PomodoroTimer;
