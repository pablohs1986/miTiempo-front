import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Picker, ScrollView, View } from 'react-native';
import {
	Input,
	Text,
	CheckBox,
	Divider,
	Button,
	Icon,
} from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import {
	FontAwesome5,
	Feather,
	MaterialIcons,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import HorizontalList from '../components/HorizontalList';

const TaskCreateScreen = () => {
	const [selectedLanguage, setSelectedLanguage] = useState();
	const [day, setDay] = useState([
		'Monday',
		'Tuesday',
		'Wedneday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	]);
	const [duration, setDuration] = useState([
		'5 min',
		'15 min',
		'30 min',
		'45 min',
		'1 h',
		'2 h',
		'3 h',
		'4 h',
		'5 h',
		'6 h',
		'7 h',
		'8 h',
	]);
	const [repetition, setRepetition] = useState([
		'Never',
		'Every day',
		'Every week',
	]);
	const [category, setCategory] = useState([
		'Routines',
		'Study',
		'Family',
		'Leisure',
		'Readings',
		'Cook',
		'Sports',
	]);
	const [color, setColor] = useState([
		'Black',
		'White',
		'Blue',
		'Brown',
		'Grey',
		'Green',
		'Orange',
		'Rose',
		'Purple',
		'Red',
		'Yellow',
	]);
	const [pomodoro, setPomodoro] = useState(['Yes', 'No']);
	const [option, setOption] = useState(pomodoro);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Text style={styles.header} h4>
				New Task
			</Text>

			<ScrollView
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<Spacer>
					<Input
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Title"
						// value={state.email}
					/>
					<Input
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Description"
						// value={state.email}
					/>

					<Divider />
					<Spacer>
						<View style={styles.container2}>
							<Button
								type="clear"
								buttonStyle={styles.optionsRow1}
								icon={
									<MaterialIcons
										name="date-range"
										style={styles.inputIcons}
									/>
								}
								title="Day"
								onPress={() => setOption(day)}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsRow1}
								icon={
									<MaterialCommunityIcons
										name="av-timer"
										style={styles.inputIcons}
									/>
								}
								title="Duration"
								onPress={() => setOption(duration)}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsRow1}
								icon={
									<Feather
										name="repeat"
										style={styles.inputIcons}
									/>
								}
								title="Repeat"
								onPress={() => setOption(repetition)}
							/>
						</View>
						<View style={styles.container2}>
							<Button
								type="clear"
								buttonStyle={styles.optionsRow2}
								icon={
									<Feather
										name="tag"
										style={styles.inputIcons}
									/>
								}
								title="Category"
								onPress={() => setOption(category)}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsRow2}
								icon={
									<MaterialCommunityIcons
										name="palette-outline"
										style={styles.inputIcons}
									/>
								}
								title="Color"
								onPress={() => setOption(color)}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsRow2}
								icon={
									<MaterialCommunityIcons
										name="timer-sand"
										style={styles.inputIcons}
									/>
								}
								title="Pomodoro"
								onPress={() => setOption(pomodoro)}
							/>
						</View>
					</Spacer>

					<Divider />

					<Spacer>
						<HorizontalList
							data={option}
							// changeCategory={setOption}
							style={styles.horizontalList}
						/>
					</Spacer>

					<Divider />
				</Spacer>
				<Spacer>
					<Button
						buttonStyle={styles.solidButton}
						title="Add"
						// onPress={() => navigation.navigate('EditAccount')}
					/>
					<Button
						buttonStyle={styles.outlineButton}
						titleStyle={styles.titleColorOutlineButton}
						type="outline"
						title="Start"
						// onPress={signout}
					/>
				</Spacer>
			</ScrollView>
		</SafeAreaView>
	);
};

TaskCreateScreen.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<FontAwesome5 name="plus" size={20} style={{ color: tintColor }} />
	),
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignContent: 'space-around',
	},
	container2: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	header: {
		marginTop: 10,
		alignSelf: 'center',
	},
	inputIcons: {
		marginRight: 10,
		color: '#C830CC',
		fontSize: 24,
	},
	solidButton: {
		backgroundColor: '#C830CC',
		marginBottom: 10,
	},
	optionsRow1: {
		flex: 1,
		padding: 10,
	},
	optionsRow2: {
		flex: 1,
		padding: 10,
	},
	outlineButton: {
		borderColor: '#C830CC',
		borderWidth: 1,
	},
	titleColorOutlineButton: {
		color: '#C830CC',
	},
	horizontalList: {
		alignSelf: 'center',
	},
});

export default TaskCreateScreen;
