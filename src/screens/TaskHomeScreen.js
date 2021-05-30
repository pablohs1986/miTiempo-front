import React, { useContext, useState, useEffect } from 'react';
import {
	Dimensions,
	StyleSheet,
	View,
	ScrollView,
	Platform,
} from 'react-native';
import { SearchBar, Text } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import TaskList from '../components/TaskList';
import HorizontalList from '../components/HorizontalList';
import { Context as TaskContext } from '../context/TaskContext';
import moment from 'moment';

const TaskHomeScreen = () => {
	const { state, listTasks, listTodayTasks, updateTask, getCategories } =
		useContext(TaskContext);
	const [category, setCategory] = useState('All');
	const [searchTerm, setSearchTerm] = useState('');

	/** Use of useEffect Hook to load data. */
	useEffect(() => {
		listTasks({ category });
		listTodayTasks({ category });
		getCategories();
		handleRoutines();
	}, [category]);

	/** Method that reloads the task lists. */
	function refreshData() {
		listTasks({ category });
		listTodayTasks({ category });
	}

	/** Function that handles tasks that are routines. */
	function handleRoutines() {
		const today = moment().format('dddd');
		const inAWeek = moment().add(6, 'days').format('dddd');

		state.tasks.forEach((task) => {
			if (task.day === moment().subtract(1, 'days').format('dddd')) {
				let taskId = task._id;
				let day = '';
				let isDone = false;

				switch (task.repetition) {
					case 'Every day':
						day = today;
						updateTask({ taskId, day, isDone });
						break;

					case 'Every week':
						day = inAWeek;
						updateTask({ taskId, day, isDone });
						break;

					default:
						break;
				}
			}
		});
	}

	return (
		<SafeAreaView
			style={
				Dimensions.get('window').width < 1200
					? styles.containerWeb1200
					: styles.container
			}
			forceInset={{ top: 'always' }}
		>
			<NavigationEvents onWillFocus={refreshData} />

			<SearchBar
				round
				lightTheme
				placeholder="Search"
				showCancel
				containerStyle={styles.searchBarContainer}
				inputStyle={styles.searchBarInputStyle}
				inputContainerStyle={styles.searchBarInputContainerStyle}
				onChangeText={setSearchTerm}
				value={searchTerm}
			/>
			<View style={styles.horizontalList}>
				<HorizontalList
					data={state.categories}
					onSubmit={setCategory}
					style={styles.horizontalList}
				/>
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<Spacer>
					<Text h4>Today</Text>
					<TaskList data={state.todayTasks} searchTerm={searchTerm} />
				</Spacer>
				<Spacer>
					<Text h4>My Tasks</Text>
					<TaskList data={state.tasks} searchTerm={searchTerm} />
				</Spacer>
			</ScrollView>
		</SafeAreaView>
	);
};

TaskHomeScreen.navigationOptions = {
	headerShown: false,
	cardStyle: { backgroundColor: '#F2F1F6' },
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignContent: 'space-around',
		...Platform.select({
			android: {
				marginLeft: 0,
				marginRight: 0,
			},
			ios: {
				marginLeft: 0,
				marginRight: 0,
			},
			default: {
				marginLeft: 300,
				marginRight: 300,
			},
		}),
	},
	containerWeb1200: {
		flex: 1,
		justifyContent: 'flex-start',
		alignContent: 'space-around',
		marginLeft: 0,
		marginRight: 0,
	},
	searchBarContainer: {
		backgroundColor: 'transparent',
		borderWidth: 0,
		shadowColor: 'transparent',
		borderBottomColor: 'transparent',
		borderTopColor: 'transparent',
		marginRight: 7,
		marginLeft: 7,
		marginTop: 5,
		marginBottom: 25,
	},
	searchBarInputStyle: {
		// fontSize: 14,
		color: 'black',
	},
	searchBarInputContainerStyle: {
		backgroundColor: '#E4E3E8',
		height: 10,
		alignSelf: 'center',
		...Platform.select({
			android: {
				width: '100%',
			},
			ios: {
				width: '100%',
			},
			default: {
				width: '67%',
				marginBottom: -15,
			},
		}),
	},
	horizontalList: {
		marginLeft: 15,
		marginRight: 15,
	},
});

export default TaskHomeScreen;
