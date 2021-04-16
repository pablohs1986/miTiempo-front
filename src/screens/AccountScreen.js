import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button, Divider } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import { withNavigation } from 'react-navigation';

const AccountScreen = ({ navigation }) => {
	const { signout } = useContext(AuthContext);
	const { state, getUserInfo, updateUserInfo } = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<NavigationEvents onWillFocus={getUserInfo} />

			<Text style={styles.header} h4>
				My Account
			</Text>

			<Spacer>
				<Input
					leftIcon={<Feather name="mail" style={styles.inputIcons} />}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Email"
					value={state.email}
					onChangeText={setEmail}
				/>

				<Input
					leftIcon={<Feather name="user" style={styles.inputIcons} />}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Name"
					value={state.name}
					onChangeText={setName}
				/>
				<Input
					leftIcon={
						<Feather name="compass" style={styles.inputIcons} />
					}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="City"
					value={state.city}
					onChangeText={setCity}
				/>

				<Spacer />

				<Button
					buttonStyle={styles.solidButton}
					title="Edit"
					onPress={() => navigation.navigate('EditAccount')}
				/>
				<Button
					buttonStyle={styles.outlineButton}
					titleStyle={styles.titleColorOutlineButton}
					type="outline"
					title="Sign out"
					onPress={signout}
				/>
			</Spacer>
		</SafeAreaView>
	);
};

AccountScreen.navigationOptions = () => {
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
		borderColor: 'red',
		borderWidth: 1,
	},
	titleColorOutlineButton: {
		color: 'red',
	},
	inputIcons: {
		color: 'black',
		fontSize: 24,
		marginRight: 10,
	},
});

export default withNavigation(AccountScreen);
