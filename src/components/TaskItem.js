import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

const TaskItem = () => {
	return (
		<>
			<ListItem.Content>
				<ListItem.Title>
					<Text>Task 1</Text>
				</ListItem.Title>
			</ListItem.Content>
		</>
	);
};

const styles = StyleSheet.create({});

export default TaskItem;
