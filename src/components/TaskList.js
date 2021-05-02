import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { Context as TaskContext } from '../context/TaskContext';

const TaskList = ({ data, searchTerm, navigation }) => {
	let tasks = filterTasks(data, searchTerm);
	const { updateTask } = useContext(TaskContext);

    // TODO: marcar circulo y deshabilitar tarea nada más marcarla + uptate.
    // 

	/** TODO: */
	function markTaskDone(taskId, isDone) {
		console.log(isDone);
		isDone = isDone ? false : true;
		console.log(isDone);
		updateTask({ taskId, isDone });
	}

	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			style={styles.listContainer}
			data={tasks}
			keyExtractor={(task) => task._id}
			renderItem={({ item }) => {
				return (
					<ListItem
						disabled={item.isDone}
						disabledStyle={{ opacity: 0.5 }}
						pad={20}
						containerStyle={styles.itemContainer}
						style={styles.item}
					>
						<TouchableOpacity onPress={() => console.log('play')}>
							<FontAwesome5
								name="play"
								size={20}
								color="#C830CC"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => markTaskDone(item._id, item.isDone)}
						>
							{item.isDone ? (
								<FontAwesome5
									name="dot-circle"
									size={20}
									color="#C830CC"
								/>
							) : (
								<FontAwesome5
									name="circle"
									size={20}
									color="#C830CC"
								/>
							)}
						</TouchableOpacity>

						<ListItem.Content>
							<ListItem.Title>
								<Text>{item.title}</Text>
							</ListItem.Title>
						</ListItem.Content>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('TaskDetail', {
									id: item._id,
								})
							}
						>
							<FontAwesome5
								name="chevron-right"
								size={20}
								color="#C830CC"
							/>
						</TouchableOpacity>
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
	listContainer: {
		marginTop: 7,
	},
	itemContainer: {
		margin: 3,
		borderRadius: 4,
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

export default withNavigation(TaskList);
