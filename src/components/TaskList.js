import React from 'react';
import { StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { ListItem, Avatar, Text } from 'react-native-elements';
import TaskItem from '../components/TaskItem';

const TaskList = ({ data }) => {
	return (
		<>
			<FlatList
				data={data}
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

const styles = StyleSheet.create({});

export default TaskList;

/**
 * 
 * 
 * 
 * 
 * 		<ListItem
			Component={TouchableHighlight}
			containerStyle={{}}
			disabledStyle={{ opacity: 0.5 }}
			onLongPress={() => console.log('onLongPress()')}
			onPress={() => console.log('onLongPress()')}
			pad={20}
			bottomDivider
		>
			<Avatar
				source={{
					uri:
						'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
				}}
			/>
			<TaskItem />
		</ListItem>
 * 
 * 
 * 
 * 
 * 
 */
