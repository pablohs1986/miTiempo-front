import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import SectionContainer from '../components/SectionContainer';
import MoveToBottom from '../components/MoveToBottom';
import { Feather } from '@expo/vector-icons';
import { Context as UserContext } from '../context/UserContext';
import { withNavigation } from 'react-navigation';

const EditAccountScreen = ({ navigation }) => {
	const { state, updateUserInfo, errorMessage } = useContext(UserContext);
	const [email, setEmail] = useState(state.email);
	const [name, setName] = useState(state.name);
	const [city, setCity] = useState(state.city);
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
	console.log(state.errorMessage);
	return (
		<SafeAreaView
			style={
				Dimensions.get('window').width < 1200
					? styles.containerWeb1200
					: styles.container
			}
			forceInset={{ top: 'always' }}
		>
			<Text style={styles.header} h4>
				Edit My Account
			</Text>

			<ScrollView>
				<SectionContainer>
					<Spacer>
						<Input
							leftIcon={
								<Feather
									name="mail"
									style={styles.inputIcons}
								/>
							}
							autoCapitalize="none"
							autoCorrect={false}
							placeholder="Email"
							value={email}
							onChangeText={setEmail}
							errorMessage={
								state.errorMessage ? state.errorMessage : null
							}
						/>
						<Input
							leftIcon={
								<Feather
									name="user"
									style={styles.inputIcons}
								/>
							}
							autoCapitalize="none"
							autoCorrect={false}
							placeholder="Name"
							value={name}
							onChangeText={setName}
						/>
					</Spacer>
				</SectionContainer>

				<SectionContainer>
					<Spacer>
						<Input
							leftIcon={
								<Feather
									name="lock"
									style={styles.inputIcons}
								/>
							}
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
							placeholder={'New password'}
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
					</Spacer>
				</SectionContainer>
			</ScrollView>

			<MoveToBottom>
				<Spacer>
					<Button
						buttonStyle={styles.solidButton}
						title="Update"
						disabled={
							!(
								(newPassword === newPasswordConfirmation &&
									newPassword.length > 0) ||
								(newPassword === '' &&
									newPasswordConfirmation === '')
							)
						}
						onPress={() =>
							updateUserInfo({
								email,
								name,
								city,
								newPassword,
							})
						}
					/>
					<Button
						buttonStyle={styles.outlineButton}
						titleStyle={styles.titleColorOutlineButton}
						type="outline"
						title="Cancel"
						onPress={() => navigation.navigate('Account')}
					/>
				</Spacer>
			</MoveToBottom>
		</SafeAreaView>
	);
};

EditAccountScreen.navigationOptions = () => {
	return {
		headerShown: false,
		cardStyle: { backgroundColor: '#F2F1F6' },
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		...Platform.select({
			android: {
				marginLeft: 0,
				marginRight: 0,
			},
			ios: {
				marginLeft: 0,
				marginRight: 0,
			},
			default: {
				marginLeft: 300,
				marginRight: 300,
			},
		}),
	},
	containerWeb1200: {
		flex: 1,
		justifyContent: 'flex-start',
		alignContent: 'space-around',
		marginLeft: 0,
		marginRight: 0,
	},
	header: {
		alignSelf: 'center',
		...Platform.select({
			android: {
				marginTop: 10,
				marginBottom: 5,
			},
			ios: {
				marginTop: 0,
				marginBottom: 5,
			},
			default: {
				marginTop: 20,
				marginBottom: 20,
			},
		}),
	},
	divider: {
		width: '100%',
		alignSelf: 'center',
		margin: 10,
	},
	solidButton: {
		...Platform.select({
			android: {
				backgroundColor: '#C830CC',
				marginBottom: 10,
			},
			ios: {
				backgroundColor: '#C830CC',
				marginBottom: 10,
			},
			default: {
				alignSelf: 'center',
				backgroundColor: '#C830CC',
				marginBottom: 10,
				width: '40%',
				padding: 10,
			},
		}),
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
	divider: {
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 15,
		marginRight: 15,
	},
	outlineButton: {
		...Platform.select({
			android: {
				borderColor: 'red',
				borderWidth: 1,
				backgroundColor: 'white',
			},
			ios: {
				borderColor: 'red',
				borderWidth: 1,
				backgroundColor: 'white',
			},
			default: {
				alignSelf: 'center',
				borderColor: 'red',
				borderWidth: 1,
				backgroundColor: 'white',
				width: '40%',
				padding: 10,
			},
		}),
	},
	titleColorOutlineButton: {
		color: 'red',
	},
});

export default withNavigation(EditAccountScreen);
