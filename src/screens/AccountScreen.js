import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button, Divider } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import AccountForm from '../components/AccountForm';

const AccountScreen = () => {
	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<AccountForm></AccountForm>
		</SafeAreaView>
	);
};

AccountScreen.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<FontAwesome5 name="cog" size={20} style={{ color: tintColor }} />
	),
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
});

export default AccountScreen;
