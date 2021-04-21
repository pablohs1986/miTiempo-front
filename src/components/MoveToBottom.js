import React from 'react';
import { View, StyleSheet } from 'react-native';

/** Component that places a child component at the bottom of the container. */
const MoveToBottom = ({ children }) => {
	return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 10,
	},
});

export default MoveToBottom;
