import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Feather } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';
import { withNavigation } from 'react-navigation';

const AccountScreen = ({ navigation }) => {
	const { signout } = useContext(AuthContext);
	const { state, getUserInfo, errorMessage } = useContext(UserContext);

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
				/>
				<Input
					leftIcon={<Feather name="user" style={styles.inputIcons} />}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Name"
					value={state.name}
				/>
				<Input
					leftIcon={
						<Feather name="compass" style={styles.inputIcons} />
					}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="City"
					value={state.city}
				/>

				<Spacer />
				{errorMessage ? (
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				) : null}

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
		marginRight: 10,
		color: '#C830CC',
		fontSize: 24,
	},
});

export default withNavigation(AccountScreen);
