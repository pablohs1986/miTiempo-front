import createDataContext from './createDataContext';
import miTiempoApi from '../api/miTiempoApi';

const authReducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

/** Action functions */
const signup = (dispatch) => {
	return async ({ email, password }) => {
		// TODO:
		// Request to sign up with email and pass
		// if we sign up, modify our state
		// if fails, reflect error message
		try {
			// prettier-ignore
			const response = await miTiempoApi.post('/signup', { email, password });
			console.log(response.data);
		} catch (error) {
			// FIXME: Operation `users.insertOne()` buffering timed out after 10000ms. OJO -> BACK
			console.log(error.response.data);
		}
	};
};

const signin = (dispatch) => {
	return ({ email, password }) => {
		// TODO:
		// Request ti sign in
		// if we sign in, modify state
		// if fails, reflect
	};
};

const signout = (dispatch) => {
	return () => {
		// TODO:
		//sign out
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signup, signin, signout },
	{ isSignedin: false }
);
