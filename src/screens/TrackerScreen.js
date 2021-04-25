import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';

const TrackerScreen = () => {
	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Text>TrackerScreen</Text>
		</SafeAreaView>
	);
};

TrackerScreen.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<FontAwesome5 name="clock" size={20} style={{ color: tintColor }} />
	),
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: '#F2F1F6',
	},
});

export default TrackerScreen;
