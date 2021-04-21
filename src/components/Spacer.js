import React from 'react';
import { View, StyleSheet } from 'react-native';

/** Component that adds margin to a child component. */
const Spacer = ({ children }) => {
	return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
	spacer: {
		margin: 15,
	},
});

export default Spacer;
