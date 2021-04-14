import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button, Divider } from 'react-native-elements';
import Spacer from '../components/Spacer';

const AccountForm = ({ signout }) => {
	return (
		<>
			<Text style={styles.header} h4>
				My Account
			</Text>

			<Spacer>
				<Input
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Email"
					// value="{email}"
					onChangeText="{setEmail}"
				/>

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

				<Divider style={styles.divider} />

				<Input
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="New password"
					// value="{password}"
					onChangeText="{setPassword}"
				/>
				<Input
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Confirm password"
					// value="{password}"
					onChangeText="{setPassword}"
				/>
				<Spacer />
				{/* {errorMessage ? (
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				) : null} */}
				<Button
					buttonStyle={styles.solidButton}
					title="Update"
					// onPress={() => onSubmit({ email, password })}
					// onPress={toggleOverlay}
				/>
				<Button
					buttonStyle={styles.outlineButton}
					titleStyle={styles.titleColorOutlineButton}
					type="outline"
					title="Sign out"
					// icon={icon}
					iconRight
					onPress={signout}
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
		margin: 10,
	},
	solidButton: {
		backgroundColor: '#C830CC',
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
