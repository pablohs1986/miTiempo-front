import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PomodoroTimer = () => {
	const [minutes, setMinutes] = useState(25);
	const [seconds, setSeconds] = useState(0);
	const [displayMessage, setDisplayMessage] = useState(false);

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
		<View>
			<Text>
				{displayMessage && (
					<Text>Break time! New session starts in:</Text>
				)}
			</Text>
			<Text>
				asdas
				{timerMinutes}:{timerSeconds}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default PomodoroTimer;
