import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const TrackerScreen = () => {
	return (
		<View>
			<Text>TrackerScreen</Text>
		</View>
	);
};

TrackerScreen.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<FontAwesome5 name="clock" size={20} style={{ color: tintColor }} />
	),
};

const styles = StyleSheet.create({});

export default TrackerScreen;
