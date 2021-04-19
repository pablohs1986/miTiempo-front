import createDataContext from './createDataContext';
import miTiempoApi from '../api/miTiempoApi';
import { navigate } from '../navigation/externalNavigator';

/** Reducer that takes the state and an action. According to the type of
 * action passed, it returns a certain change on the state.
 * */
const taskReducer = (state, action) => {
	switch (action.type) {
		case 'listTasks':
			return {
				...state,
				tasks: action.payload,
			};
		case 'listTodayTasks':
			return {
				...state,
				todayTasks: action.payload,
			};
		case 'listTodayTasks':
			return {
				...state,
				title: action.payload.title,
				description: action.payload.description,
				category: action.payload.category,
				duration: action.payload.duration,
				repeat: action.payload.repeat,
				color: action.payload.color,
				creationDate: action.payload.creationDate,
				expirationDate: action.payload.expirationDate,
				isPomodoro: action.payload.isPomodoro,
				isDone: action.payload.isDone,
			};
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};

/** Add task */

/** Action function that fetch all tasks, filtered by category or not.
 * It sends a request with the type of category, if this is succesful, it
 * launches an action with the tasks.
 */
const listTasks = (dispatch) => async ({ category }) => {
	try {
		const response = await miTiempoApi.get(`/listTasks/${category}`);
		dispatch({ type: 'listTasks', payload: response.data });
	} catch (error) {
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong retrieving tasks data.',
		});
	}
};

/** Action function that fetch today tasks, filtered by category or not.
 * It sends a request with the type of category, if this is succesful, it
 * launches an action with the tasks.
 */
const listTodayTasks = (dispatch) => async ({ category }) => {
	try {
		const response = await miTiempoApi.get(`/listTodayTasks/${category}`);
		dispatch({ type: 'listTodayTasks', payload: response.data });
	} catch (error) {
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong retrieving today tasks data.',
		});
	}
};

/** Update task */

/** Delete task */

/** Export and call createDataContext to create the context and its provider. */
export const { Provider, Context } = createDataContext(
	taskReducer,
	{ listTasks, listTodayTasks },
	{
		tasks: [],
		todayTasks: [],
		errorMessage: '',
	}
);
