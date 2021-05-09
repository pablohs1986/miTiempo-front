import React, { useContext } from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import SectionContainer from '../components/SectionContainer.js';
import MoveToBottom from '../components/MoveToBottom';
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
							value={state.email}
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
							value={state.name}
						/>
						{/* <Input
							leftIcon={
								<Feather
									name="compass"
									style={styles.inputIcons}
								/>
							}
							autoCapitalize="none"
							autoCorrect={false}
							placeholder="City"
							value={state.city}
						/> */}

						<Spacer />

						{errorMessage ? (
							<Text style={styles.errorMessage}>
								{errorMessage}
							</Text>
						) : null}
					</Spacer>
				</SectionContainer>
			</ScrollView>

			<MoveToBottom>
				<Spacer>
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
			</MoveToBottom>
		</SafeAreaView>
	);
};

AccountScreen.navigationOptions = () => {
	return {
		headerShown: false,
		cardStyle: { backgroundColor: '#F2F1F6' },
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
		fontSize: 24,
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
				width: '25%',
				padding: 10,
			},
		}),
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
				width: '25%',
				padding: 10,
			},
		}),
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
