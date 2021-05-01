import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';

const TrackerScreen = () => {
	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Text style={styles.header} h4>
				My Time
			</Text>
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
	header: {
		marginTop: 10,
		alignSelf: 'center',
		fontSize: 24,
	},
});

export default TrackerScreen;
