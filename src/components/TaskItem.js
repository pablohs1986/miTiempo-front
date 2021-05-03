import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { Context as TaskContext } from '../context/TaskContext';

const TaskItem = ({ item, navigation }) => {
	const { updateTask } = useContext(TaskContext);
	const [isTaskDone, setIsTaskDone] = useState(item.isDone);

	/** Function that mark a task as done.
	 * Check de isDone param, if it's true, set it to false, if it's false,
	 * set it to true, launch updateTask for that task and change se isTaskDone.
	 */
	function markTaskDone(taskId, isDone, category) {
		category = category === 'Done' ? 'All' : 'Done';
		isDone = isDone ? false : true;
		updateTask({ taskId, isDone, category });
		setIsTaskDone(isDone);
	}

	return (
		<ListItem
			disabled={isTaskDone}
			disabledStyle={{ opacity: 0.5 }}
			pad={20}
			containerStyle={styles.itemContainer}
			style={styles.item}
		>
			<TouchableOpacity onPress={() => navigation.navigate('TaskTimer')}>
				<FontAwesome5 name="play" size={20} color="#C830CC" />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					markTaskDone(item._id, item.isDone, item.category)
				}
			>
				{isTaskDone ? (
					<FontAwesome5 name="dot-circle" size={20} color="#C830CC" />
				) : (
					<FontAwesome5 name="circle" size={20} color="#C830CC" />
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
				<FontAwesome5 name="chevron-right" size={20} color="#C830CC" />
			</TouchableOpacity>
		</ListItem>
	);
};

const styles = StyleSheet.create({
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
});

export default withNavigation(TaskItem);
