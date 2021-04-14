import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import miTiempoApi from '../api/miTiempoApi';
import { navigate } from '../navigation/externalNavigator';

// TODO: documentar
const authReducer = (state, action) => {
	switch (action.type) {
		case 'getUserInfo':
			return { errorMessage: '', token: action.payload };
		default:
			return state;
	}
};

// Action functions

/**
 * Get user info.
 */
const getUserInfo = (dispatch) => async ({ email, password }) => {
	try {
	} catch (error) {
		console.log(error.response.data);
	}
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ getUserInfo },
	{ user: null, errorMessage: '' }
);
