import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import {
	SearchBar,
	Text,
	Input,
	Button,
	ListItem,
	Avatar,
} from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import TaskItem from '../components/TaskItem';

const TaskHomeScreen = () => {
	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<SearchBar
				round
				lightTheme
				showCancel
				containerStyle={styles.searchBarContainer}
				inputStyle={styles.searchBarInputStyle}
				inputContainerStyle={styles.searchBarInputContainerStyle}
			/>
			<Spacer>
				<Text h4>Today</Text>
				<ListItem
					Component={TouchableHighlight}
					containerStyle={{}}
					disabledStyle={{ opacity: 0.5 }}
					onLongPress={() => console.log('onLongPress()')}
					onPress={() => console.log('onLongPress()')}
					pad={20}
				>
					<Avatar
						source={{
							uri:
								'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
						}}
					/>
					<TaskItem />
				</ListItem>
			</Spacer>
			<Spacer>
				<Text h4>My Tasks</Text>
				<ListItem
					Component={TouchableHighlight}
					containerStyle={{}}
					disabledStyle={{ opacity: 0.5 }}
					onLongPress={() => console.log('onLongPress()')}
					onPress={() => console.log('onLongPress()')}
					pad={20}
				>
					<Avatar
						source={{
							uri:
								'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
						}}
					/>
					<TaskItem />
				</ListItem>
			</Spacer>
		</SafeAreaView>
	);
};

TaskHomeScreen.navigationOptions = {
	headerShown: false,
	cardStyle: { backgroundColor: 'white' },
};

const styles = StyleSheet.create({
	searchBarContainer: {
		backgroundColor: 'transparent',
		borderWidth: 0,
		shadowColor: 'transparent',
		borderBottomColor: 'transparent',
		borderTopColor: 'transparent',
		marginRight: 15,
		marginLeft: 15,
	},
	searchBarInputStyle: {
		fontSize: 14,
		color: 'black',
	},
	searchBarInputContainerStyle: {
		backgroundColor: '#E7ECF0',
		height: 10,
	},
});

export default TaskHomeScreen;
