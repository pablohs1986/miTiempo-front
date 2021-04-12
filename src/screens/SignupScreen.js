import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button, Image } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { FontAwesome } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Spacer>
				<Image
					source={require('../../assets/img/logoMiTiempo.png')}
					containerStyle={styles.logo}
				/>
			</Spacer>

			<Spacer>
				<Input
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Email"
				/>
				<Input
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Password"
				/>
				<Button buttonStyle={styles.solidButton} title="Sign up" />
				<Button
					buttonStyle={styles.outlineButton}
					titleStyle={styles.titleColorOutlineButton}
					type="outline"
					title="Sign up with "
					icon={
						<FontAwesome name="google" style={styles.googleIcon} />
					}
					iconRight
					onPress={() => navigation.navigate('mainFlow')}
				/>
			</Spacer>
			<Spacer>
				<TouchableOpacity onPress={() => navigation.navigate(homeFlow)}>
					<Text style={styles.link}>
						Already have an account? Sign in instead!
					</Text>
				</TouchableOpacity>
			</Spacer>
		</SafeAreaView>
	);
};

SignupScreen.navigationOptions = () => {
	return {
		headerShown: false,
		cardStyle: { backgroundColor: 'white' },
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1, // rellena todo el alto
		justifyContent: 'flex-start',
	},
	logo: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 5,
	},
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
	link: {
		color: '#C830CC',
	},
	googleIcon: {
		marginLeft: 5,
		fontSize: 24,
		color: '#C830CC',
	},
});

export default SignupScreen;
