import moment from 'moment';
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

/** Action function that add a new task.
 * It sends a request with the params of the task, if this is succesful, it
 * navigates to TaskHome. If not, sends an error message.
 */
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

/** Action function that updates a task by id.
 * It sends a request with the id and params, if this is succesful, it
 * update the desired task.
 */
const updateTask = (dispatch) => async ({
	taskId,
	title,
	description,
	day,
	duration,
	repetition,
	category,
	color,
	isPomodoro,
	isDone,
}) => {
	try {
		await miTiempoApi.post('/updateTask', {
			taskId,
			title,
			description,
			day,
			duration,
			repetition,
			category,
			color,
			isPomodoro,
			isDone,
		});
		navigate('TaskHome');
	} catch (error) {
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong updating the task. Try again.',
		});
	}
};

/** Action function that removes a task by id.
 * It sends a request with the id and params, if this is succesful, it
 * delete the desired task.
 */
const deleteTask = (dispatch) => async ({ taskId }) => {
	try {
		await miTiempoApi.delete('/deleteTask', { data: { taskId } });
		navigate('TaskHome');
	} catch (error) {
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong deleting the task. Try again.',
		});
	}
};

/**  Function that launch an action with an array with the days of the week. */
const getDays = (dispatch) => () => {
	const days = getDaysArray();
	dispatch({ type: 'getDays', payload: days });
};

/** Function that returns an array with the days of the week, indicating the current day. */
function getDaysArray() {
	const today = moment().format('dddd');

	switch (today) {
		case 'Monday':
			return [
				'Today',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			];
		case 'Tuesday':
			return [
				'Today',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
				'Monday',
			];
		case 'Wednesday':
			return [
				'Today',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
				'Monday',
				'Tuesday',
			];
		case 'Thursday':
			return [
				'Today',
				'Friday',
				'Saturday',
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
			];
		case 'Friday':
			return [
				'Today',
				'Saturday',
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
			];
		case 'Saturday':
			return [
				'Today',
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
			];
		case 'Sunday':
			return [
				'Today',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
			];
	}
}

/** Function that launch an action with the tasks durations. */
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

/** Function that launch an action with the repetitions values. */
const getRepetitions = (dispatch) => () => {
	const repetitions = ['Never', 'Every day', 'Every week'];
	dispatch({ type: 'getRepetitions', payload: repetitions });
};

/** Function that launch an action with the categories values. */
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

/** Function that launch an action with the colors values. */
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

/** Function that launch an action with the isPomodoro values. */
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
		updateTask,
		deleteTask,
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
