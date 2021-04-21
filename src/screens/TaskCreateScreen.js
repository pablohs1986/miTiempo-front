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
import { Context as TaskContext } from '../context/TaskContext';

const TaskCreateScreen = () => {
	const {
		state,
		getDays,
		getDurations,
		getRepetitions,
		getCategories,
		getColors,
		getPomodoro,
	} = useContext(TaskContext);
	const [option, setOption] = useState(state.pomodoro);
	const [optionSetter, setOptionSetter] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [day, setDay] = useState('Day');
	const [duration, setDuration] = useState('Duration');
	const [repetition, setRepetition] = useState('Repeat');
	const [category, setCategory] = useState('Category');
	const [color, setColor] = useState('Color');
	const [pomodoro, setPomodoro] = useState('Pomodoro');

	/** Use of useEffect Hook to load preset options. */
	useEffect(() => {
		getDays();
		getDurations();
		getRepetitions();
		getCategories();
		getColors();
		getPomodoro();
	}, []);

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
						value={title}
						onChangeText={setTitle}
					/>
					<Input
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Description"
						value={description}
						onChangeText={setDescription}
					/>

					<Divider />
					<Spacer>
						<View style={styles.optionsContainer}>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								disabledStyle={styles.optionsButtonDisabled}
								titleStyle={
									option === state.days
										? styles.titleOptionsButtonEnabled
										: styles.titleOptionsButtonDisabled
								}
								icon={
									<MaterialIcons
										name="date-range"
										style={styles.inputIcons}
									/>
								}
								title={day}
								onPress={() => {
									setOption(state.days);
									setOptionSetter(() => setDay);
								}}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={
									option === state.durations
										? styles.titleOptionsButtonEnabled
										: styles.titleOptionsButtonDisabled
								}
								icon={
									<MaterialCommunityIcons
										name="av-timer"
										style={styles.inputIcons}
									/>
								}
								title={duration}
								onPress={() => {
									setOption(state.durations);
									setOptionSetter(() => setDuration);
								}}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={
									option === state.repetitions
										? styles.titleOptionsButtonEnabled
										: styles.titleOptionsButtonDisabled
								}
								icon={
									<Feather
										name="repeat"
										style={styles.inputIcons}
									/>
								}
								title={repetition}
								onPress={() => {
									setOption(state.repetitions);
									setOptionSetter(() => setRepetition);
								}}
							/>
						</View>
						<View style={styles.optionsContainer}>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={
									option.length ===
									filterCategories(state.categories).length
										? styles.titleOptionsButtonEnabled
										: styles.titleOptionsButtonDisabled
								}
								icon={
									<Feather
										name="tag"
										style={styles.inputIcons}
									/>
								}
								title={category}
								onPress={() => {
									setOption(
										filterCategories(state.categories)
									);
									setOptionSetter(() => setCategory);
								}}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={
									option === state.colors
										? styles.titleOptionsButtonEnabled
										: styles.titleOptionsButtonDisabled
								}
								icon={
									<MaterialCommunityIcons
										name="palette-outline"
										style={styles.inputIcons}
									/>
								}
								title={color}
								onPress={() => {
									setOption(state.colors);
									setOptionSetter(() => setColor);
								}}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={
									option === state.pomodoro
										? styles.titleOptionsButtonEnabled
										: styles.titleOptionsButtonDisabled
								}
								icon={
									<MaterialCommunityIcons
										name="timer-sand"
										style={styles.inputIcons}
									/>
								}
								title={pomodoro}
								onPress={() => {
									setOption(state.pomodoro);
									setOptionSetter(() => setPomodoro);
								}}
							/>
						</View>
					</Spacer>

					<Divider />

					<Spacer>
						<HorizontalList
							data={option}
							style={styles.horizontalList}
							onSubmit={optionSetter}
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
						titleStyle={styles.titleOutlineButton}
						type="outline"
						title="Start"
						// onPress={signout}
					/>
				</Spacer>
			</ScrollView>
		</SafeAreaView>
	);
};

/** Method that filters the categories to show the necessary ones to the user. */
function filterCategories(categories) {
	return categories.filter(
		(category) => category !== 'All' && category !== 'Done'
	);
}

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
	optionsContainer: {
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
	optionsButton: {
		flex: 1,
		padding: 10,
	},
	titleOptionsButtonDisabled: {
		color: '#86939E',
	},
	titleOptionsButtonEnabled: {
		color: 'black',
	},
	horizontalList: {
		alignSelf: 'center',
	},
	solidButton: {
		backgroundColor: '#C830CC',
		marginBottom: 10,
	},
	outlineButton: {
		borderColor: '#C830CC',
		borderWidth: 1,
	},
	titleOutlineButton: {
		color: '#C830CC',
	},
});

export default TaskCreateScreen;
