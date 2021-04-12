import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const AccountScreen = () => {
	return (
		<View>
			<Text>AccountScreen</Text>
		</View>
	);
};

AccountScreen.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<FontAwesome5 name="cog" size={20} style={{ color: tintColor }} />
	),
};

const styles = StyleSheet.create({});

export default AccountScreen;
