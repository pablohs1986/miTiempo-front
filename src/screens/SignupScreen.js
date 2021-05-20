import React, { useContext } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { Image } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { FontAwesome } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

const SignupScreen = () => {
	const { state, signup, clearErrorMessage } = useContext(AuthContext);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<NavigationEvents onWillFocus={clearErrorMessage} />

			<Spacer>
				<Image
					source={require('../../assets/img/logoMiTiempo.png')}
					containerStyle={styles.logo}
				/>
			</Spacer>

			<AuthForm
				errorMessage={state.errorMessage}
				buttonText="Sign up"
				icon={<FontAwesome name="google" style={styles.googleIcon} />}
				showGoogleButton={true}
				onSubmit={signup}
			/>

			<View style={styles.linkContainer}>
				<NavLink
					text="Already have an account? Sign in instead!"
					routeName="Signin"
				/>
			</View>
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
	logo: {
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 5,
		...Platform.select({
			android: {
				width: 250,
				height: 250,
			},
			ios: {
				width: 250,
				height: 250,
			},
			default: {
				width: 350,
				height: 350,
			},
		}),
	},
	googleIcon: {
		marginLeft: 5,
		fontSize: 24,
		color: '#C830CC',
	},
	linkContainer: {
		alignSelf: 'center',
		...Platform.select({
			android: {
				width: '100%',
			},
			ios: {
				width: '100%',
			},
			default: {
				width: '40%',
			},
		}),
	},
});

export default SignupScreen;
