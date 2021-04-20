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
		listTasks,
		listTodayTasks,
		getDays,
		getDurations,
		getRepetitions,
		getCategories,
		getColors,
		getPomodoro,
	} = useContext(TaskContext);
	const [option, setOption] = useState(state.pomodoro);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [day, setDay] = useState('');
	const [duration, setDuration] = useState('');
	const [repetition, setRepetition] = useState('');
	const [category, setCategory] = useState('');
	const [color, setColor] = useState('');
	const [pomodoro, setPomodoro] = useState('');

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
					/>
					<Input
						autoCapitalize="none"
						autoCorrect={false}
						placeholder="Description"
						value={description}
					/>

					<Divider />
					<Spacer>
						<View style={styles.container2}>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={styles.titleOptionsButton}
								icon={
									<MaterialIcons
										name="date-range"
										style={styles.inputIcons}
									/>
								}
								title="Day" // TODO: aplicar {day} para que cambie dinámicamente al seleccionar
								onPress={() => setOption(state.days)}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={styles.titleOptionsButton}
								icon={
									<MaterialCommunityIcons
										name="av-timer"
										style={styles.inputIcons}
									/>
								}
								title="Duration"
								onPress={() => setOption(state.durations)}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={styles.titleOptionsButton}
								icon={
									<Feather
										name="repeat"
										style={styles.inputIcons}
									/>
								}
								title="Repeat"
								onPress={() => setOption(state.repetitions)}
							/>
						</View>
						<View style={styles.container2}>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={styles.titleOptionsButton}
								icon={
									<Feather
										name="tag"
										style={styles.inputIcons}
									/>
								}
								title="Category"
								onPress={() => setOption(state.categories)}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={styles.titleOptionsButton}
								icon={
									<MaterialCommunityIcons
										name="palette-outline"
										style={styles.inputIcons}
									/>
								}
								title="Color"
								onPress={() => setOption(state.colors)}
							/>
							<Button
								type="clear"
								buttonStyle={styles.optionsButton}
								titleStyle={styles.titleOptionsButton}
								icon={
									<MaterialCommunityIcons
										name="timer-sand"
										style={styles.inputIcons}
									/>
								}
								title="Pomodoro"
								onPress={() => setOption(state.pomodoro)}
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
	optionsButton: {
		flex: 1,
		padding: 10,
	},
	outlineButton: {
		borderColor: '#C830CC',
		borderWidth: 1,
	},
	titleOutlineButton: {
		color: '#C830CC',
	},
	titleOptionsButton: {
		color: '#86939E',
	},
	horizontalList: {
		alignSelf: 'center',
	},
});

export default TaskCreateScreen;
