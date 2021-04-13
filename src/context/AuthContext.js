import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import miTiempoApi from '../api/miTiempoApi';
import { navigate } from '../navigation/externalNavigator';

// TODO: documentar
const authReducer = (state, action) => {
	switch (action.type) {
		case 'signInUp':
			return { errorMessage: '', token: action.payload };
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};

// Action functions

/** Action function that makes a request to sign up a user.
 * If the record is not accepted by the backend, it returns an error message.
 * If it is successful, it takes the token that is returned from the backend,
 * stores it on the device with AsyncStorage to maintain the session,
 * launch an action and takes the user to the main flow.
 */
const signup = (dispatch) => async ({ email, password }) => {
	try {
		const response = await miTiempoApi.post('/signup', { email, password }); // make post request to backend
		await AsyncStorage.setItem('token', response.data.token); // stores the token
		dispatch({ type: 'signInUp', payload: response.data.token }); // launch an action
		navigate('mainFlow'); // navigate to main flow
	} catch (error) {
		console.log(error.response.data);
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong with sign up',
		});
	}
};

/** Action function that makes a request to sign in a user.
 * If the login is not accepted by the backend, it returns an error message.
 * If it is successful, it takes the token that is returned from the backend,
 * stores it on the device with AsyncStorage to maintain the session,
 * launch an action and takes the user to the main flow.
 */
const signin = (dispatch) => async ({ email, password }) => {
	try {
		const response = await miTiempoApi.post('/signin', { email, password }); // make post request to backend
		await AsyncStorage.setItem('token', response.data.token); // stores the token
		dispatch({ type: 'signInUp', payload: response.data.token }); // launch an action
		navigate('mainFlow'); // navigate to main flow
	} catch (error) {
		console.log(error.response.data);
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong with sign in',
		});
	}
};

/** Method that checks if the user has a stored token. If so, log into the app.
 * If not, it redirects to the registration screen.  */
const tryLocalSignIn = (dispatch) => async () => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
		dispatch({ type: 'signInUp', payload: token });
		navigate('mainFlow');
	} else {
		navigate('Signup');
	}
};

const signout = (dispatch) => {
	return () => {
		// TODO:
		//sign out
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signup, signin, tryLocalSignIn, signout },
	{ token: null, errorMessage: '' }
);

