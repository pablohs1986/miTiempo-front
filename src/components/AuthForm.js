import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';

const AuthForm = ({ navigation, buttonText, icon, errorMessage, onSubmit }) => {
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
				<Button
					buttonStyle={styles.outlineButton}
					titleStyle={styles.titleColorOutlineButton}
					type="outline"
					title={`${buttonText} with `}
					icon={icon}
					iconRight
					onPress={() => navigation.navigate('mainFlow')}
				/>
			</Spacer>
		</>
	);
};

const styles = StyleSheet.create({
	solidButton: {
		backgroundColor: '#C830CC',
		marginTop: 5,
		marginBottom: 10,
	},
	outlineButton: {
		borderColor: '#C830CC',
		borderWidth: 1,
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
