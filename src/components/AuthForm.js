import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';
import { Linking } from 'react-native';
import { Platform } from 'react-native';

const AuthForm = ({
	navigation,
	buttonText,
	icon,
	showGoogleButton,
	errorMessage,
	onSubmit,
}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<Spacer>
				<Input
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
				/>
				<Input
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
				/>

				{errorMessage ? (
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				) : null}

				<Button
					buttonStyle={styles.solidButton}
					title={buttonText}
					onPress={() => onSubmit({ email, password })}
				/>

				{showGoogleButton ? (
					<Button
						buttonStyle={styles.outlineButton}
						titleStyle={styles.titleColorOutlineButton}
						type="outline"
						title={`${buttonText} with `}
						icon={icon}
						iconRight
						onPress={() =>
							Platform.OS === 'web'
								? window.open(
										'http://mitiempo-back.herokuapp.com/auth/google',
										'_blank'
								  )
								: Linking.openURL(
										'http://mitiempo-back.herokuapp.com/auth/google',
										'_self'
								  )
						}
					/>
				) : null}
			</Spacer>
		</>
	);
};

const styles = StyleSheet.create({
	solidButton: {
		backgroundColor: '#C830CC',
		...Platform.select({
			android: {
				backgroundColor: '#C830CC',
				marginTop: 5,
				marginBottom: 10,
			},
			ios: {
				backgroundColor: '#C830CC',
				marginTop: 5,
				marginBottom: 10,
			},
			default: {
				alignSelf: 'center',
				backgroundColor: '#C830CC',
				marginTop: 30,
				marginBottom: 10,
				width: '40%',
				padding: 10,
			},
		}),
	},
	outlineButton: {
		...Platform.select({
			android: {
				borderColor: '#C830CC',
				borderWidth: 1,
				backgroundColor: 'white',
			},
			ios: {
				borderColor: '#C830CC',
				borderWidth: 1,
				backgroundColor: 'white',
			},
			default: {
				alignSelf: 'center',
				borderColor: '#C830CC',
				borderWidth: 1,
				backgroundColor: 'white',
				width: '40%',
				padding: 10,
			},
		}),
	},
	titleColorOutlineButton: {
		color: '#C830CC',
	},
	errorMessage: {
		alignSelf: 'center',
		fontSize: 16,
		color: 'red',
		marginBottom: 15,
	},
});

export default withNavigation(AuthForm);
