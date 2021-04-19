import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar, Text } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import TaskList from '../components/TaskList';
import { Context as TaskContext } from '../context/TaskContext';

const TaskHomeScreen = () => {
	const { state, listTasks, listTodayTasks } = useContext(TaskContext);
	const [category, setcategory] = useState('allCategories');
	// console.log(state.tasks);

	/** Use of useEffect Hook to load data. */
	useEffect(() => {
		listTasks({ category });
		listTodayTasks({ category });
	}, []);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			{/* <NavigationEvents onWillFocus={listTodayTasks} /> */}
			{/* <NavigationEvents onWillFocus={() => listTasks({ category })} /> */}
			<SearchBar
				round
				lightTheme
				showCancel
				containerStyle={styles.searchBarContainer}
				inputStyle={styles.searchBarInputStyle}
				inputContainerStyle={styles.searchBarInputContainerStyle}
			/>
			<Spacer>
				<Text h4>Today</Text>
				<TaskList data={state.todayTasks} />
			</Spacer>
			<Spacer>
				<Text h4>My Tasks</Text>
				<TaskList data={state.tasks} />
			</Spacer>
		</SafeAreaView>
	);
};

TaskHomeScreen.navigationOptions = {
	headerShown: false,
	cardStyle: { backgroundColor: 'white' },
};

const styles = StyleSheet.create({
	searchBarContainer: {
		backgroundColor: 'transparent',
		borderWidth: 0,
		shadowColor: 'transparent',
		borderBottomColor: 'transparent',
		borderTopColor: 'transparent',
		marginRight: 15,
		marginLeft: 15,
	},
	searchBarInputStyle: {
		fontSize: 14,
		color: 'black',
	},
	searchBarInputContainerStyle: {
		backgroundColor: '#E7ECF0',
		height: 10,
	},
});

export default TaskHomeScreen;
