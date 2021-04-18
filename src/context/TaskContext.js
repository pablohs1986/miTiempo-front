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

/** List tasks */
/** FIXME: no se puede enviar nada en el body en una petición GET. Cambiar
 * de body a PARAM. Modificar en BACK primero.
 */
const listTasks = (dispatch) => async ({ categoryFilter }) => {
	console.log('>>>>>>>>' + categoryFilter);
	categoryFilter = 'Study';
	try {
		const response = await miTiempoApi.get('/listTasks', {
			categoryFilter,
		});
		dispatch({ type: 'listTasks', payload: response.data });
		console.log(response);
	} catch (error) {
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong retrieving tasks data.',
		});
	}
};

/** List today tasks */
const listTodayTasks = (dispatch) => async () => {
	try {
		const response = await miTiempoApi.get('/listTodayTasks');
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
