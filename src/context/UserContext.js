import createDataContext from './createDataContext';
import miTiempoApi from '../api/miTiempoApi';
import { navigate } from '../navigation/externalNavigator';

/** Reducer that takes the state and an action. According to the type of
 * action passed, it returns a certain change on the state.
 * */
const userReducer = (state, action) => {
	switch (action.type) {
		case 'getUserInfo':
			return {
				...state,
				email: action.payload.email,
				name: action.payload.name,
				city: action.payload.city,
			};
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};

/** Action function that makes a request to get the information of a user.
 * It sends the request, if this is successful, it launches an action with
 * the user it receives from the backend. If not, it returns an error message.
 */
const getUserInfo = (dispatch) => async () => {
	try {
		const response = await miTiempoApi.get('/getUserInfo');
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
};

/** Action that makes a request to update the user's information.
 * If there's some problem updating, returns an error message.
 */
const updateUserInfo = (dispatch) => async ({
	email,
	name,
	city,
	newPassword,
}) => {
	try {
		await miTiempoApi.post('/updateUserInfo', {
			email,
			name,
			city,
			newPassword,
		});
		navigate('Account');
	} catch (error) {
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong updating your data. Try again.',
		});
	}
};

/** Export and call createDataContext to create the context and its provider. */
export const { Provider, Context } = createDataContext(
	userReducer,
	{ getUserInfo, updateUserInfo },
	{ email: '', name: '', city: '', errorMessage: '' }
);
