import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import SectionContainer from '../components/SectionContainer';
import TaskItem from './TaskItem';

const PomodoroTimer = ({ timerTask }) => {
	const [minutes, setMinutes] = useState(1);
	const [seconds, setSeconds] = useState(0);
	const [displayMessage, setDisplayMessage] = useState(false);

	// duracion total de la tarea
	// tiempo restante

	const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

	// https://dev.to/alekswritescode/infinite-pomodoro-app-in-react-52jj

	useEffect(() => {
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
					let minutes = displayMessage ? 24 : 4;
					let seconds = 59;

					setSeconds(seconds);
					setMinutes(minutes);
					setDisplayMessage(!displayMessage);
				}
			} else {
				setSeconds(seconds - 1);
			}
		}, 1000);
	};

	return (
		<>
			<SectionContainer>
				<View style={styles.container}>
					<Text>
						{displayMessage && (
							<Text>Break time! New session starts in:</Text>
						)}
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
