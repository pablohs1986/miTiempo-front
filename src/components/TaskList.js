import React from 'react';
import { StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { ListItem, Avatar, Text } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

const TaskList = ({ data, searchTerm }) => {
	let tasks = filterTasks(data, searchTerm);

	// FIXME:
	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			data={tasks}
			keyExtractor={(task) => task._id}
			renderItem={({ item }) => {
				return (
					<ListItem
						pad={20}
						containerStyle={styles.itemContainer}
						style={styles.item}
					>
						{/* <FontAwesome5 name="play" size={24} color="#C830CC" /> */}
						<FontAwesome5 name="circle" size={24} color="#C830CC" />
						<ListItem.Content>
							<ListItem.Title>{item.title}</ListItem.Title>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>
				);
			}}
		/>
	);
};

/** Method that filters the tasks according to the searchTerm. */
function filterTasks(data, searchTerm) {
	return searchTerm === ''
		? data
		: data.filter((task) => task.title === searchTerm);
}

const styles = StyleSheet.create({
	itemContainer: {
		margin: 3,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	item: {
		// marginVertical: 50,
	},
});

export default TaskList;
