import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TaskCreateScreen = () => {
	return (
		<View>
			<Text>TaskCreateScreen</Text>
		</View>
	);
};

TaskCreateScreen.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<MaterialCommunityIcons
			name="plus"
			size={25}
			style={{ color: tintColor }}
		/>
	),
};

const styles = StyleSheet.create({});

export default TaskCreateScreen;
