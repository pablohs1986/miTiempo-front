import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TrackerScreen = () => {
	return (
		<View>
			<Text>TrackerScreen</Text>
		</View>
	);
};

TrackerScreen.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<MaterialCommunityIcons
			name="clock"
			size={25}
			style={{ color: tintColor }}
		/>
	),
};

const styles = StyleSheet.create({});

export default TrackerScreen;
