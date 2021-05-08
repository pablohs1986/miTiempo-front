import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import SectionContainer from '../components/SectionContainer';
import TaskItem from './TaskItem';

const Timer = ({ timerLoad, refreshTimer }) => {
	const [minutes, setMinutes] = useState(timerLoad);
	const [seconds, setSeconds] = useState(0);

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
				}
			} else {
				setSeconds(seconds - 1);
			}
			if (minutes === 0 && seconds === 0) {
				console.log('finn');
				refreshTimer();
			}
		}, 5);
	};

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.clock}>
					{timerMinutes}:{timerSeconds}
				</Text>
			</View>
			<Text>Carga en timer: {timerLoad}</Text>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		justifyContent: 'center',
		// height: 350,
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

export default Timer;
