import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button, Overlay } from 'react-native-elements';

const ConfirmPasswordForm = ({ overlyVisibility: overlayVisibility, toggleOverlay }) => {
	return (
		<>
			<Overlay
				isVisible={overlayVisibility}
				onBackdropPress={toggleOverlay} // TODO: cambiar nombre del onSubmit... on togle o algo parecido??
				overlayStyle={styles.passwordOverlay}
			>
				<Text>
					Please enter your current password to confirm the changes:
				</Text>
				<Input
					style={styles.passwordInput}
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Confirm password"
					// value="{password}"
					onChangeText="{setPassword}"
				/>
				<Button
					buttonStyle={styles.passwordUpdateButton}
					title="Commit changes"
					onPress={toggleOverlay}
				/>
			</Overlay>
		</>
	);
};

const styles = StyleSheet.create({
	passwordOverlay: {
		justifyContent: 'space-between',
		flexBasis: '35%',
		width: '90%',
		height: '30%',
		padding: 30,
	},
	passwordInput: {
		alignSelf: 'center',
	},
	passwordUpdateButton: {
		backgroundColor: '#C830CC',
	},
});

export default ConfirmPasswordForm;
