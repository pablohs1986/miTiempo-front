import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar, Text } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import TaskList from '../components/TaskList';
import CategoryList from '../components/CategoryList';
import { Context as TaskContext } from '../context/TaskContext';

const TaskHomeScreen = () => {
	const { state, listTasks, listTodayTasks, listCategories } = useContext(
		TaskContext
	);
	const [category, setCategory] = useState('All');
	const [searchTerm, setSearchTerm] = useState('');

	/** Use of useEffect Hook to load data. */
	useEffect(() => {
		listTasks({ category });
		listTodayTasks({ category });
		listCategories();
	}, [category]);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
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
			<CategoryList
				data={state.categories}
				changeCategory={setCategory}
			/>
			<Spacer>
				<Text h4>Today</Text>
				<TaskList data={state.todayTasks} searchTerm={searchTerm} />
			</Spacer>
			<Spacer>
				<Text h4>My Tasks</Text>
				<TaskList data={state.tasks} searchTerm={searchTerm} />
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
		marginRight: 7,
		marginLeft: 7,
		marginTop: 5,
		marginBottom: 25,
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
