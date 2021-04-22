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
		// case 'listCategories':
		// 	return {
		// 		...state,
		// 		categories: action.payload,
		// 	};
		case 'getDays':
			return {
				...state,
				days: action.payload,
			};
		case 'getDurations':
			return {
				...state,
				durations: action.payload,
			};
		case 'getRepetitions':
			return {
				...state,
				repetitions: action.payload,
			};
		case 'getCategories':
			return {
				...state,
				categories: action.payload,
			};
		case 'getColors':
			return {
				...state,
				colors: action.payload,
			};
		case 'getPomodoro':
			return {
				...state,
				pomodoro: action.payload,
			};
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};

/** TODO: Add task */
const addTask = (dispatch) => async ({
	title,
	description,
	day,
	duration,
	repetition,
	category,
	color,
	isPomodoro,
}) => {
	try {
		await miTiempoApi.post('/addTask', {
			title,
			description,
			day,
			duration,
			repetition,
			category,
			color,
			isPomodoro,
		});
		navigate('TaskHome');
	} catch (error) {
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong adding task.',
		});
	}
};

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

/** List categories */
const listCategories = (dispatch) => async () => {
	try {
		const response = await miTiempoApi.get('/listCategories');
		const categories = response.data;
		categories.unshift('All'); // add All category to de beginning of the array
		dispatch({ type: 'listCategories', payload: categories });
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong retrieving categories.',
		});
	}
};

/** Update task */

/** Delete task */

// TODO: documentar bloque
/**  Get days */
const getDays = (dispatch) => () => {
	const days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];
	dispatch({ type: 'getDays', payload: days });
};

/** Get durations */
const getDurations = (dispatch) => () => {
	const durations = [
		'5 min',
		'15 min',
		'30 min',
		'45 min',
		'1 h',
		'2 h',
		'3 h',
		'4 h',
		'5 h',
		'6 h',
		'7 h',
		'8 h',
	];
	dispatch({ type: 'getDurations', payload: durations });
};

/** Get repeat */
const getRepetitions = (dispatch) => () => {
	const repetitions = ['Never', 'Every day', 'Every week'];
	dispatch({ type: 'getRepetitions', payload: repetitions });
};

/** Get categories */
const getCategories = (dispatch) => () => {
	const categories = [
		'All',
		'Done',
		'Routines',
		'Study',
		'Family',
		'Leisure',
		'Readings',
		'Cook',
		'Sports',
		'Other',
	];
	dispatch({ type: 'getCategories', payload: categories });
};

/** Get colors */
const getColors = (dispatch) => () => {
	const colors = [
		'Black',
		'White',
		'Blue',
		'Brown',
		'Grey',
		'Green',
		'Orange',
		'Pink',
		'Purple',
		'Red',
		'Yellow',
	];
	dispatch({ type: 'getColors', payload: colors });
};

/** Get pomodoro */
const getPomodoro = (dispatch) => () => {
	const pomodoro = ['Yes', 'No'];
	dispatch({ type: 'getPomodoro', payload: pomodoro });
};

/** Export and call createDataContext to create the context and its provider. */
export const { Provider, Context } = createDataContext(
	taskReducer,
	{
		addTask,
		listTasks,
		listTodayTasks,
		listCategories,
		getDays,
		getDurations,
		getRepetitions,
		getCategories,
		getColors,
		getPomodoro,
	},
	{
		tasks: [],
		todayTasks: [],
		days: [],
		durations: [],
		repetitions: [],
		categories: [],
		colors: [],
		isPomodoro: [],
		errorMessage: '',
	}
);
