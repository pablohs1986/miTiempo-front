import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SearchBar, Text } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import TaskList from '../components/TaskList';
import HorizontalList from '../components/HorizontalList';
import { Context as TaskContext } from '../context/TaskContext';

const TaskHomeScreen = () => {
	const { state, listTasks, listTodayTasks, getCategories } = useContext(
		TaskContext
	);
	const [category, setCategory] = useState('All');
	const [searchTerm, setSearchTerm] = useState('');

	/** Use of useEffect Hook to load data. */
	useEffect(() => {
		listTasks({ category });
		listTodayTasks({ category });
		getCategories();
	}, [category, state.tasks]);

	/** Method that reloads the task lists. */
	function refreshData() {
		listTasks({ category });
		listTodayTasks({ category });
	}

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
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
	},
	horizontalList: {
		marginLeft: 15,
		marginRight: 15,
	},
});

export default TaskHomeScreen;
