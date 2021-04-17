import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button, Divider } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Feather } from '@expo/vector-icons';
import { Context as UserContext } from '../context/UserContext';
import { withNavigation } from 'react-navigation';

const EditAccountScreen = ({ navigation }) => {
	const { updateUserInfo, errorMessage } = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Text style={styles.header} h4>
				Edit My Account
			</Text>

			<Spacer>
				<Input
					leftIcon={<Feather name="mail" style={styles.inputIcons} />}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
				/>
				<Input
					leftIcon={<Feather name="user" style={styles.inputIcons} />}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Name"
					value={name}
					onChangeText={setName}
				/>
				<Input
					leftIcon={
						<Feather name="compass" style={styles.inputIcons} />
					}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="City"
					value={city}
					onChangeText={setCity}
				/>

				<Divider style={styles.divider} />

				<Input
					leftIcon={<Feather name="lock" style={styles.inputIcons} />}
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="New password"
					value={newPassword}
					onChangeText={setNewPassword}
				/>
				<Input
					leftIcon={
						<Feather
							name="alert-triangle"
							style={styles.confirmPasswordIcon}
						/>
					}
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Confirm password"
					value={newPasswordConfirmation}
					onChangeText={setNewPasswordConfirmation}
					errorMessage={
						!(newPassword === newPasswordConfirmation)
							? 'Passwords must match'
							: null
					}
					disabledInputStyle={{ background: '#ddd' }}
				/>

				{errorMessage ? (
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				) : null}

				<Button
					buttonStyle={styles.solidButton}
					title="Update"
					disabled={
						!(
							newPassword === newPasswordConfirmation &&
							newPassword.length > 0
						)
					}
					onPress={() =>
						updateUserInfo({ email, name, city, newPassword })
					}
				/>
				<Button
					icon={
						<Feather
							name="chevron-left"
							style={styles.inputIcons}
						/>
					}
					buttonStyle={styles.outlineButton}
					titleStyle={styles.titleColorOutlineButton}
					type="outline"
					title="Go back"
					onPress={() => navigation.navigate('Account')}
				/>
			</Spacer>
		</SafeAreaView>
	);
};

EditAccountScreen.navigationOptions = () => {
	return {
		headerShown: false,
		cardStyle: { backgroundColor: 'white' },
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
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
		borderColor: '#C830CC',
		borderWidth: 1,
	},
	titleColorOutlineButton: {
		color: '#C830CC',
	},
	inputs: {
		alignSelf: 'center',
		fontSize: 16,
		color: 'red',
	},
	inputIcons: {
		marginRight: 5,
		fontSize: 24,
		color: '#C830CC',
	},
	confirmPasswordIcon: {
		marginRight: 5,
		fontSize: 24,
		color: 'red',
	},
});

export default withNavigation(EditAccountScreen);
