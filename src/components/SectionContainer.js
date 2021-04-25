import React from 'react';
import { View, StyleSheet } from 'react-native';

/** Component that adds background and some margin to a child component. */
const SectionContainer = ({ children }) => {
	return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		margin: 15,
		borderRadius: 4,
	},
});

export default SectionContainer;
