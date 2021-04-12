import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';

// prettier-ignore
const AuthForm = ({ navigation, buttonText, icon, errorMessage, onSubmit }) => {
	return (
		<>
			<Spacer>
				<Input
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Email"
				/>
				<Input
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Password"
				/>
				<Button buttonStyle={styles.solidButton} title={buttonText} />
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
});

export default withNavigation(AuthForm);
