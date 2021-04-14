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

const SigninScreen = () => {
	const { state, signin, clearErrorMessage } = useContext(AuthContext);

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
				buttonText="Sign in"
				icon={<FontAwesome name="google" style={styles.googleIcon} />}
				onSubmit={signin}
			/>

			<NavLink
				text="Don't have an account? Sign up instead!"
				routeName="Signup"
			/>
		</SafeAreaView>
	);
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;
