import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ data, searchTerm }) => {
	let tasks = filterTasks(data, searchTerm);

	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			style={styles.listContainer}
			data={tasks}
			keyExtractor={(task) => task._id}
			renderItem={({ item }) => {
				return <TaskItem item={item} />;
			}}
		/>
	);
};

/** Method that filters the tasks if they include the searchTerm. */
function filterTasks(data, searchTerm) {
	return searchTerm === ''
		? data
		: data.filter((task) =>
				task.title.toLowerCase().includes(searchTerm.toLowerCase())
		  );
}

const styles = StyleSheet.create({
	listContainer: {
		marginTop: 7,
	},
});

export default TaskList;
