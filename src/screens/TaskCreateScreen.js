import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const TaskCreateScreen = () => {
	return (
		<View>
			<Text>TaskCreateScreen</Text>
		</View>
	);
};

TaskCreateScreen.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<FontAwesome5 name="plus" size={20} style={{ color: tintColor }} />
	),
};

const styles = StyleSheet.create({});

export default TaskCreateScreen;
