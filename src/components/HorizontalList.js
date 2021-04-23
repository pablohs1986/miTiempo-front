import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Button } from 'react-native-elements';

// FIXME: flatListRef no se reconoce en versión web. Investigar o aplicar código específico para web.
const HorizontalList = ({ data, onSubmit }) => {
	return (
		<>
			<FlatList
				ref={(ref) => {
					this.flatListRef = ref;
				}}
				horizontal
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={data}
				keyExtractor={(element) => element._id}
				renderItem={({ item }) => {
					// Scroll up on every render if data is not categories (checks the first value)
					{
						console.log(data[0]);
						console.log(data.length);
						data[0] === 'All' && data.length === 10
							? null
							: this.flatListRef.scrollToOffset({
									animated: true,
									offset: 0,
							  });
					}

					return (
						<ListItem containerStyle={styles.container}>
							<ListItem.Content>
								<ListItem.Title
									titleStyle={styles.itemContainer}
								>
									<Button
										buttonStyle={handleButtonStyles(item)}
										titleStyle={handleButtonTitlesStyles(
											item
										)}
										type="outline"
										title={item}
										onPress={() => {
											onSubmit(item);
										}}
									/>
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					);
				}}
			/>
		</>
	);
};

/** TODO: doc */
function handleButtonStyles(item) {
	switch (item) {
		case 'Black':
			return {
				backgroundColor: '#000000',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		case 'White':
			return {
				backgroundColor: '#f8f8f2',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		case 'Blue':
			return {
				backgroundColor: '#7329D9',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		case 'Brown':
			return {
				backgroundColor: '#CC9245',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		case 'Grey':
			return {
				backgroundColor: '#6e7185',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		case 'Green':
			return {
				backgroundColor: '#6ECC31',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		case 'Orange':
			return {
				backgroundColor: '#ffb86c',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		case 'Pink':
			return {
				backgroundColor: '#ff79c6',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		case 'Purple':
			return {
				backgroundColor: '#7C1280',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		case 'Red':
			return {
				backgroundColor: '#FF2431',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		case 'Yellow':
			return {
				backgroundColor: '#FFF924',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
		default:
			return {
				backgroundColor: '#C830CC',
				padding: 6,
				margin: 6,
				borderWidth: 0,
			};
	}
}

/** TODO: doc */
function handleButtonTitlesStyles(item) {
	switch (item) {
		case 'White':
			return {
				color: 'black',
				fontSize: 13,
				fontWeight: '500',
			};
		case 'Yellow':
			return {
				color: 'black',
				fontSize: 13,
				fontWeight: '500',
			};
		default:
			return {
				color: 'white',
				fontSize: 13,
				fontWeight: '500',
			};
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		padding: 0,
	},
	itemContainer: {
		borderColor: 'transparent',
	},
	// item: {
	// 	backgroundColor: '#C830CC',
	// 	padding: 6,
	// 	margin: 6,
	// 	borderWidth: 0,
	// },
	itemTitle: {
		color: 'white',
		fontSize: 13,
		fontWeight: '500',
	},
});

export default HorizontalList;
