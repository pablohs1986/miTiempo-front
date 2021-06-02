import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Platform, View } from 'react-native';
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
		<SafeAreaView
			style={
				Dimensions.get('window').width < 1200
					? styles.containerWeb1200
					: styles.container
			}
			forceInset={{ top: 'always' }}
		>
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
				showGoogleButton={false}
				onSubmit={signin}
			/>

			<View style={styles.linkContainer}>
				<NavLink
					text="Don't have an account? Sign up instead!"
					routeName="Signup"
				/>
			</View>
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
		...Platform.select({
			android: {
				justifyContent: 'flex-start',
				marginLeft: 0,
				marginRight: 0,
			},
			ios: {
				justifyContent: 'flex-start',
				marginLeft: 0,
				marginRight: 0,
			},
			default: {
				justifyContent: 'center',
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

export default SigninScreen;
