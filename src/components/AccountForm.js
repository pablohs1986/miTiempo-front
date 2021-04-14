import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button, Divider } from 'react-native-elements';
import Spacer from '../components/Spacer';
import ConfirmPasswordForm from './ConfirmPasswordOverlay';

const AccountForm = () => {
	const [overlayVisibility, serOverlayVisibility] = useState(false);

	const toggleOverlay = () => {
		setVisible(!visible);
	};

	return (
		<>
			<Text style={styles.header} h4>
				My Account
			</Text>

			<ConfirmPasswordForm
				overlyVisibility={overlayVisibility}
				toggleOverlay={toggleOverlay}
			></ConfirmPasswordForm>

			<Spacer>
				<Input
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Email"
					// value="{email}"
					onChangeText="{setEmail}"
				/>
				<Input
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Password"
					// value="{password}"
					onChangeText="{setPassword}"
				/>
				{/* {errorMessage ? (
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				) : null} */}
				<Divider style={styles.divider} />

				<Text>Aditional data (optional)</Text>

				<Input
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Name"
					// value="{email}"
					onChangeText="{setEmail}"
				/>
				<Input
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="City"
					// value="{password}"
					onChangeText="{setPassword}"
				/>
				<Spacer />
				<Button
					buttonStyle={styles.solidButton}
					title="Update"
					// onPress={() => onSubmit({ email, password })}
					onPress={toggleOverlay}
				/>
				<Button
					buttonStyle={styles.outlineButton}
					titleStyle={styles.titleColorOutlineButton}
					type="outline"
					title="Sign out"
					// icon={icon}
					iconRight
					// onPress={() => navigation.navigate('mainFlow')}
				/>
			</Spacer>
		</>
	);
};

const styles = StyleSheet.create({
	header: {
		marginTop: 10,
		alignSelf: 'center',
	},
	divider: {
		width: '100%',
		alignSelf: 'center',
		margin: 20,
	},
	solidButton: {
		backgroundColor: '#C830CC',
		marginTop: 5,
		marginBottom: 10,
	},
	outlineButton: {
		borderColor: 'red',
		borderWidth: 1,
	},
	titleColorOutlineButton: {
		color: 'red',
	},
	errorMessage: {
		alignSelf: 'center',
		fontSize: 16,
		color: 'red',
		marginBottom: 15,
	},
});

export default AccountForm;
