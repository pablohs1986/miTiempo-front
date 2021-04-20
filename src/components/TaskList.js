import React from 'react';
import { StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { ListItem, Avatar, Text } from 'react-native-elements';

const TaskList = ({ data, searchTerm }) => {
	let tasks = filterTasks(data, searchTerm);

	return (
		<>
			<FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={tasks}
				keyExtractor={(task) => task._id}
				renderItem={({ item }) => {
					return (
						<ListItem bottomDivider>
							<ListItem.Content>
								<ListItem.Title>{item.title}</ListItem.Title>
							</ListItem.Content>
							<ListItem.Chevron />
						</ListItem>
					);
				}}
			/>
		</>
	);
};

/** Method that filters the tasks according to the searchTerm. */
function filterTasks(data, searchTerm) {
	return searchTerm === ''
		? data
		: data.filter((task) => task.title === searchTerm);
}

const styles = StyleSheet.create({});

export default TaskList;
