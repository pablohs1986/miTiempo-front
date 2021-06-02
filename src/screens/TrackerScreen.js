import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, View, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import SectionContainer from '../components/SectionContainer';
import HorizontalList from '../components/HorizontalList';
import MoveToBottom from '../components/MoveToBottom';
import { Context as UserContext } from '../context/UserContext';

const TrackerScreen = () => {
	const { state, getUserInfo } = useContext(UserContext);

	const userIdFilter = `filter={"userId":%20{'$oid':%20'${state._id}'}}`;

	const CHART_OPTIONS = {
		TASKS_BY_CATEGORY: `https://charts.mongodb.com/charts-mitiempo-trqxx/embed/charts?id=93ce989d-3c06-4c03-ab13-f043470138f5&${userIdFilter}&theme=light`,
		TASKS_BY_CREATION_DATE: `https://charts.mongodb.com/charts-mitiempo-trqxx/embed/charts?id=f8bb6578-7add-431d-975c-2dcfb668ea95&${userIdFilter}&theme=light`,
		TASKS_DONE: `https://charts.mongodb.com/charts-mitiempo-trqxx/embed/charts?id=ca1cf875-a36f-4e78-8355-71ca516d7c6d&${userIdFilter}&theme=light`,
		CONCENTRATED_MINUTES: `https://charts.mongodb.com/charts-mitiempo-trqxx/embed/charts?id=88615f15-7209-4048-a1f0-e8944d467c26&${userIdFilter}&theme=light`,
		POMODORO_VS_NOTPOMODORO: `https://charts.mongodb.com/charts-mitiempo-trqxx/embed/charts?id=621b0122-e7b2-445c-af4d-99ae61be51ed&${userIdFilter}&theme=light`,
		POMODORO_TASKS: `https://charts.mongodb.com/charts-mitiempo-trqxx/embed/charts?id=c51e6898-7d28-449c-bb6b-1f189fcfdbcf&${userIdFilter}&theme=light`,
	};

	const CHARTS = [
		'Tasks done',
		'Tasks by category',
		'Tasks by creation date',
		'Minutes being focused',
		'Pomodoro vs not pomodoro',
		'Pomodoro tasks',
	];

	const [selectedChart, setSelectedChart] = useState('');

	/** useEffect Hook for  */
	useEffect(() => {
		setSelectedChart(CHART_OPTIONS.TASKS_DONE);
	}, [state._id]);

	/** Method that handle the selection of an option.
	 * It takes de string from the param and asign a chart option to the state.
	 */
	const selectChartOption = (option) => {
		switch (option) {
			case 'Tasks by category':
				setSelectedChart(CHART_OPTIONS.TASKS_BY_CATEGORY);
				break;
			case 'Tasks by creation date':
				setSelectedChart(CHART_OPTIONS.TASKS_BY_CREATION_DATE);
				break;
			case 'Tasks done':
				setSelectedChart(CHART_OPTIONS.TASKS_DONE);
				break;
			case 'Minutes being focused':
				setSelectedChart(CHART_OPTIONS.CONCENTRATED_MINUTES);
				break;
			case 'Pomodoro vs not pomodoro':
				setSelectedChart(CHART_OPTIONS.POMODORO_VS_NOTPOMODORO);
				break;
			case 'Pomodoro tasks':
				setSelectedChart(CHART_OPTIONS.POMODORO_TASKS);
				break;
		}
	};

	if (Platform.OS === 'web') {
		return (
			<SafeAreaView
				style={styles.container}
				forceInset={{ top: 'always' }}
			>
				<NavigationEvents onWillFocus={getUserInfo} />

				<View
					style={
						Dimensions.get('window').width < 1200
							? styles.containerWeb1200
							: styles.container2
					}
				>
					<Text style={styles.header} h4>
						My Time
					</Text>
					<SectionContainer>
						<View style={styles.webChart}>
							<iframe
								src={selectedChart}
								height={400}
								width={'100%'}
								height={500}
								frameBorder="0"
							/>
						</View>
					</SectionContainer>
					<MoveToBottom>
						<View style={styles.horizontalList}>
							<HorizontalList
								data={CHARTS}
								onSubmit={selectChartOption}
								style={styles.horizontalList}
							/>
						</View>
					</MoveToBottom>
				</View>
			</SafeAreaView>
		);
	} else if (Platform.OS === 'android' || Platform.OS === 'ios') {
		return (
			<SafeAreaView
				style={styles.container}
				forceInset={{ top: 'always' }}
			>
				<NavigationEvents onWillFocus={getUserId} />

				<View style={styles.container2}>
					<Text style={styles.header} h4>
						My Time
					</Text>
				</View>
				<WebView
					source={{
						html: `<iframe width="100%" height="100%" src=${selectedChart} frameborder="0" ></iframe>`,
					}}
					style={styles.mobileChart}
				/>

				<View style={styles.horizontalList}>
					<HorizontalList
						data={CHARTS}
						onSubmit={selectChartOption}
						style={styles.horizontalList}
					/>
				</View>
			</SafeAreaView>
		);
	}
};

TrackerScreen.navigationOptions = {
	tabBarIcon: ({ tintColor }) => (
		<FontAwesome5 name="clock" size={20} style={{ color: tintColor }} />
	),
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
	containerWeb1200: {
		flex: 1,
		justifyContent: 'flex-start',
		alignContent: 'space-around',
		marginLeft: 0,
		marginRight: 0,
	},
	header: {
		...Platform.select({
			android: {
				marginTop: 0,
				marginBottom: 5,
			},
			ios: {
				marginTop: 0,
				marginBottom: 5,
			},
			default: {
				marginTop: 20,
				marginBottom: 20,
			},
		}),
		alignSelf: 'center',
		fontSize: 24,
	},
	webChart: {},
	mobileChart: {
		flex: 0,
		height: 485,
		margin: 10,
		borderRadius: 4,
	},
	horizontalList: {
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15,
		marginTop: 5,
	},
});

export default TrackerScreen;
