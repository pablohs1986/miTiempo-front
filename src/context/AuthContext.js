import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import miTiempoApi from '../api/miTiempoApi';
import { navigate } from '../navigation/externalNavigator';

/** Reducer that takes the state and an action. According to the type of
 * action passed, it returns a certain change on the state.
 * */
const authReducer = (state, action) => {
	switch (action.type) {
		case 'signInUp':
			return { errorMessage: '', token: action.payload };
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		case 'clear_error_message':
			return { ...state, errorMessage: '' };
		case 'signout':
			return { token: null, errorMessage: '' };
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
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong with sign in',
		});
	}
};

/** Action function that checks if the user has a stored token. If so, log into 
 * the app. If not, it redirects to the registration screen.  
 * */
const tryLocalSignIn = (dispatch) => async () => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
		dispatch({ type: 'signInUp', payload: token });
		navigate('mainFlow');
	} else {
		navigate('Signup');
	}
};

/** Action function that sings out a user, removing his token from the device  */
const signout = (dispatch) => async () => {
	await AsyncStorage.removeItem('token');
	dispatch({ type: 'signout' });
	navigate('loginFlow');
};

/** Action function that clears the error message showed by sign screens */
const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: 'clear_error_message' });
};

/** Export and call createDataContext to create the context and its provider. */
export const { Provider, Context } = createDataContext(
	authReducer,
	{ signup, signin, tryLocalSignIn, signout, clearErrorMessage },
	{ token: null, errorMessage: '' }
);
