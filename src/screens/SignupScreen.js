import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
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
				onSubmit={signup}
			/>

			<NavLink
				text="Already have an account? Sign in instead!"
				routeName="Signin"
			/>
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
	},
	logo: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 5,
	},
	googleIcon: {
		marginLeft: 5,
		fontSize: 24,
		color: '#C830CC',
	},
});

export default SignupScreen;
