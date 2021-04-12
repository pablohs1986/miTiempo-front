import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountScreen = () => {
	return (
		<View>
			<Text>AccountScreen</Text>
		</View>
	);
};

AccountScreen.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<MaterialCommunityIcons
			name="account"
			size={25}
			style={{ color: tintColor }}
		/>
	),
};

const styles = StyleSheet.create({});

export default AccountScreen;
