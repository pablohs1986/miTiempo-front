import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import SectionContainer from '../components/SectionContainer';
import TaskItem from './TaskItem';

const PomodoroTimer = ({ timerTask }) => {
	const [isPomodoro, setIsPomodoro] = useState(timerTask.isPomodoro);
	const [duration, setDuration] = useState(timerTask.duration);
	const [minutes, setMinutes] = useState(1);
	const [seconds, setSeconds] = useState(0);
	const [displayMessage, setDisplayMessage] = useState(false);
	const [pomodorosCounter, setPomodorosCounter] = useState(0);

	// descanso corto = 5min
	// descanso largo = 15min
	// cada 4 cortos, 1 largo

	// duracion total de la tarea
	// tiempo restante

	const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

	// https://dev.to/alekswritescode/infinite-pomodoro-app-in-react-52jj

	useEffect(() => {
		timer();
	}, [seconds]);

	const timer = () => {
		console.log(pomodorosCounter);
		let interval = setInterval(() => {
			clearInterval(interval);

			if (seconds === 0) {
				if (minutes !== 0) {
					setSeconds(59);
					setMinutes(minutes - 1);
				} else {
					let minutes;

					if (pomodorosCounter < 4) {
						console.log('corto');
						minutes = displayMessage ? 24 : 4;
					} else if (pomodorosCounter === 4) {
						console.log('largo');
						// setPomodorosCounter(0);
						minutes = displayMessage ? 24 : 14;
					}
					let seconds = 59;

					setSeconds(seconds);
					setMinutes(minutes);
					setDisplayMessage(!displayMessage);
					pomodorosCounter < 4
						? setPomodorosCounter(pomodorosCounter + 1)
						: setPomodorosCounter(0);
				}
			} else {
				setSeconds(seconds - 1);
			}
		}, 1);
	};

	return (
		<>
			<SectionContainer>
				<View style={styles.container}>
					<Text>
						{displayMessage && pomodorosCounter < 4 ? (
							<Text>
								Short break '{pomodorosCounter}'! New session
								starts in:
							</Text>
						) : null}
						{displayMessage && pomodorosCounter === 4 ? (
							<Text>Long break! New session starts in:</Text>
						) : null}

						{/* {displayMessage && (
							<Text>Break time! New session starts in:</Text>
						)} */}
					</Text>
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
	},
});

export default PomodoroTimer;
