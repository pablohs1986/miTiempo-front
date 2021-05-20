import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { Input, Text, Divider, Button, Header } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	FontAwesome5,
	Feather,
	MaterialIcons,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import SectionContainer from '../components/SectionContainer';
import MoveToBottom from '../components/MoveToBottom';
import HorizontalList from '../components/HorizontalList';
import { Context as TaskContext } from '../context/TaskContext';
import moment from 'moment';

const TaskDetailScreen = ({ navigation }) => {
	const taskId = navigation.getParam('id');
	const {
		state,
		getDays,
		getDurations,
		getRepetitions,
		getCategories,
		getColors,
		getPomodoro,
		updateTask,
		deleteTask,
	} = useContext(TaskContext);
	const task = state.tasks.find((task) => task._id === taskId);
	const [option, setOption] = useState(state.days);
	const [optionSetter, setOptionSetter] = useState('');
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [day, setDay] = useState(handleDays(task.day));
	const [duration, setDuration] = useState(handleDurations(task.duration));
	const [repetition, setRepetition] = useState(task.repetition);
	const [category, setCategory] = useState(task.category);
	const [color, setColor] = useState(handleColors(task.color));
	const [isPomodoro, setIsPomodoro] = useState(
		handlePomodoro(task.isPomodoro)
	);

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
			<View style={styles.container2}>
				<Header
					leftComponent={
						<Button
							buttonStyle={styles.headerButtonLeft}
							titleStyle={styles.titleHeaderButtonLeft}
							type="clear"
							title="Delete"
							onPress={() => deleteTask({ taskId })}
						/>
					}
					centerComponent={
						<Text style={styles.headerTitle} h4>
							{title}
						</Text>
					}
					rightComponent={
						<Button
							buttonStyle={styles.headerButtonRight}
							titleStyle={styles.titleHeaderButtonRight}
							type="clear"
							title="Ok"
							onPress={() =>
								updateTask({
									taskId,
									title,
									description,
									day,
									duration,
									repetition,
									category,
									color,
									isPomodoro,
								})
							}
						/>
					}
					containerStyle={styles.header}
				/>

				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					<SectionContainer>
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
						</Spacer>
					</SectionContainer>
					<SectionContainer>
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
							</View>
							<View style={styles.optionsContainer}>
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
									title={isPomodoro}
									onPress={() => {
										setOption(state.pomodoro);
										setOptionSetter(() => setIsPomodoro);
									}}
								/>
							</View>

							<View style={styles.optionsContainer}>
								<Button
									type="clear"
									buttonStyle={styles.optionsButton}
									titleStyle={
										option.length ===
										filterCategories(state.categories)
											.length
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
							</View>
						</Spacer>

						<Divider />

						<Spacer>
							<View style={styles.optionsSelector}>
								<HorizontalList
									data={option}
									style={styles.horizontalList}
									onSubmit={optionSetter}
								/>
							</View>
						</Spacer>
					</SectionContainer>
				</ScrollView>

				<MoveToBottom>
					<Spacer>
						<Button
							buttonStyle={styles.solidButton}
							icon={
								<FontAwesome5
									name="play"
									size={20}
									color={'white'}
								/>
							}
							onPress={() =>
								navigation.navigate('TaskTimer', {
									id: task._id,
								})
							}
						/>
					</Spacer>
				</MoveToBottom>
			</View>
		</SafeAreaView>
	);
};

/** Method that filters the categories to show the necessary ones to the user. */
function filterCategories(categories) {
	return categories.filter(
		(category) => category !== 'All' && category !== 'Done'
	);
}

/** Function that handle the durations, transforming the data received from
 * the backend to be handled by the front. */
function handleDurations(data) {
	if (data === 5) {
		return '5 min';
	}
	if (data === 15) {
		return '15 min';
	}
	if (data === 30) {
		return '30 min';
	}
	if (data === 45) {
		return '45 min';
	}
	if (data === 60) {
		return '1 h';
	}
	if (data === 120) {
		return '2 h';
	}
	if (data === 180) {
		return '3 h';
	}
	if (data === 240) {
		return '4 h';
	}
	if (data === 300) {
		return '5 h';
	}
	if (data === 360) {
		return '6 h';
	}
	if (data === 420) {
		return '7 h';
	}
	if (data === 480) {
		return '8 h';
	} else {
		return data;
	}
}

/** Function that handle the colors, transforming the data received from
 * the backend to be handled by the front. */
function handleColors(data) {
	if (data === '#000000') {
		return 'Black';
	}
	if (data === '#f8f8f2') {
		return 'White';
	}
	if (data === '#7329D9') {
		return 'Blue';
	}
	if (data === '#CC9245') {
		return 'Brown';
	}
	if (data === '#6e7185') {
		return 'Grey';
	}
	if (data === '#6ECC31') {
		return 'Green';
	}
	if (data === '#ffb86c') {
		return 'Orange';
	}
	if (data === '#7C1280') {
		return 'Pink';
	}
	if (data === '#FF2431') {
		return 'Red';
	}
	if (data === '#FFF924') {
		return 'Yellow';
	} else {
		return data;
	}
}

/** Function that handle the isPomodoro values, transforming the data received from
 * the backend to be handled by the front. */
function handlePomodoro(data) {
	return data === true ? 'Yes' : 'No';
}

/** Function that handle the days, transforming the data received from
 * the backend to be handled by the front. */
function handleDays(data) {
	let today = moment().format('dddd');
	return data === today ? 'Today' : data;
}

TaskDetailScreen.navigationOptions = {
	headerShown: false,
	cardStyle: { backgroundColor: '#F2F1F6' },
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignContent: 'space-around',
		backgroundColor: '#F2F1F6',
	},
	container2: {
		...Platform.select({
			android: {
				marginLeft: 0,
				marginRight: 0,
			},
			ios: {
				marginLeft: 0,
				marginRight: 0,
			},
			default: {
				marginLeft: 300,
				marginRight: 300,
			},
		}),
	},
	optionsContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	optionsSelector: {
		flex: 1,
		height: 40,
	},
	header: {
		backgroundColor: 'transparent',
		marginRight: 15,
		marginLeft: 15,
		paddingBottom: 0,
		...Platform.select({
			android: {
				marginTop: 7,
				marginBottom: 5,
			},
			ios: {
				marginTop: 7,
				marginBottom: 5,
			},
			default: {
				marginTop: 5,
				marginBottom: 20,
			},
		}),
	},
	headerTitle: {
		marginTop: 5,
		fontSize: 24,
		color: 'black',
	},
	// headerButtoms: {
	// 	fontSize: 18,
	// 	color: '#C830CC',
	// },
	inputIcons: {
		marginRight: 10,
		color: '#C830CC',
		fontSize: 24,
	},
	optionsButton: {
		flex: 1,
		justifyContent: 'flex-start',
		padding: 10,
		width: 140,
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
		...Platform.select({
			android: {
				backgroundColor: '#C830CC',
				marginBottom: 10,
			},
			ios: {
				backgroundColor: '#C830CC',
				marginBottom: 10,
			},
			default: {
				alignSelf: 'center',
				backgroundColor: '#C830CC',
				marginBottom: 10,
				width: '25%',
				padding: 10,
			},
		}),
	},
	headerButtonLeft: {
		justifyContent: 'flex-start',
		backgroundColor: 'transparent',
		width: 100,
	},
	titleHeaderButtonLeft: {
		color: 'red',
	},
	headerButtonRight: {
		justifyContent: 'flex-end',
		backgroundColor: 'transparent',
		width: 100,
	},
	titleHeaderButtonRight: {
		color: '#C830CC',
	},
});

export default TaskDetailScreen;
