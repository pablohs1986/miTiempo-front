import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Input, Text, Divider, Button, Header } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
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

const TaskCreateScreen = ({ navigation }) => {
	const {
		state,
		getDays,
		getDurations,
		getRepetitions,
		getCategories,
		getColors,
		getPomodoro,
		addTask,
	} = useContext(TaskContext);
	const [option, setOption] = useState(state.days);
	const [optionSetter, setOptionSetter] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [day, setDay] = useState('Day');
	const [duration, setDuration] = useState('Duration');
	const [repetition, setRepetition] = useState('Repeat');
	const [category, setCategory] = useState('Category');
	const [color, setColor] = useState('Color');
	const [isPomodoro, setIsPomodoro] = useState('Pomodoro');

	/** Use of useEffect Hook to load preset options. */
	useEffect(() => {
		getDays();
		getDurations();
		getRepetitions();
		getCategories();
		getColors();
		getPomodoro();
	}, []);

	/** Method that reloads option panel presets. */
	function refreshPresets() {
		setTitle('');
		setDescription('');
		setDay('Day');
		setDuration('Duration');
		setRepetition('Repeat');
		setCategory('Category');
		setColor('Color');
		setIsPomodoro('Pomodoro');
	}

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<NavigationEvents onWillFocus={refreshPresets} />

			<Header
				leftComponent={
					<Button
						buttonStyle={styles.headerButtonLeft}
						titleStyle={styles.titleHeaderButtonLeft}
						type="clear"
						title="Cancel"
						onPress={() => navigation.navigate('homeFlow')}
					/>
				}
				centerComponent={
					<Text style={styles.headerTitle} h4>
						New Task
					</Text>
				}
				rightComponent={
					<Button
						buttonStyle={styles.headerButtonRight}
						titleStyle={styles.titleHeaderButtonRight}
						type="clear"
						title="Add"
						onPress={() =>
							addTask({
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

			{/* <Text style={styles.header} h4>
				New Task
			</Text> */}

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
						title="Start"
						onPress={() =>
							addTask({
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
				</Spacer>
			</MoveToBottom>
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
		backgroundColor: '#F2F1F6',
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
		backgroundColor: '#C830CC',
	},
	headerButtonLeft: {
		justifyContent: 'flex-start',
		backgroundColor: 'transparent',
		width: 100,
	},
	titleHeaderButtonLeft: {
		color: '#C830CC',
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

export default TaskCreateScreen;
