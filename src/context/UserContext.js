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
const updateUserInfo =
	(dispatch) =>
	async ({ email, name, city, newPassword }) => {
		let infoMessage = validateForm(email, newPassword);
		if (infoMessage === '') {
			try {
				if (newPassword === '') {
					await miTiempoApi.post('/updateUserInfo', {
						email,
						name,
						city,
					});
				} else {
					await miTiempoApi.post('/updateUserInfo', {
						email,
						name,
						city,
						newPassword,
					});
				}

				navigate('Account');
			} catch (error) {
				dispatch({
					type: 'add_error',
					payload:
						'Something went wrong updating your data. Try again.',
				});
			}
		} else {
			dispatch({
				type: 'add_error',
				payload: infoMessage,
			});
		}
	};

/** Method that validates the email and password fields of the forms. */
function validateForm(email, password) {
	const regexEmail =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (email === '') {
		return 'Please enter an email';
	}

	if (!regexEmail.test(email)) {
		return 'Please enter a valid email';
	}
	return '';
}

/** Export and call createDataContext to create the context and its provider. */
export const { Provider, Context } = createDataContext(
	userReducer,
	{ getUserInfo, updateUserInfo },
	{ email: '', name: '', city: '', errorMessage: '' }
);
