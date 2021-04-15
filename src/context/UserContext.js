import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import miTiempoApi from '../api/miTiempoApi';
import { navigate } from '../navigation/externalNavigator';

/** Reducer that takes the state and an action. According to the type of
 * action passed, it returns a certain change on the state.
 * */
const userReducer = (state, action) => {
	switch (action.type) {
		case 'getUserInfo':
			return { user: action.payload };
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};

/** Action function that makes a request to get the information of a user.
 * It checks if there is a token in the device, in which case it sends the request
 * with the token. If this is successful, it launches an action with the user
 * it receives from the backend. If not, it returns an error message.
 */
const getUserInfo = (dispatch) => async () => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
		try {
			const response = await miTiempoApi.get('/getUserInfo', { token });
			console.log(response.data);
			dispatch({
				type: 'getUserInfo',
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: 'add_error',
				payload: 'Something went wrong retrieving user data.',
			});
		}
	} else {
		navigate('Signup');
	}
};

/** Export and call createDataContext to create the context and its provider. */
export const { Provider, Context } = createDataContext(
	userReducer,
	{ getUserInfo },
	{ user: null, errorMessage: '' }
);