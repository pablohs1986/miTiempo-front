import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Button } from 'react-native-elements';

const CategoryList = ({ data, changeCategory }) => {
	return (
		<>
			<FlatList
				horizontal
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={data}
				keyExtractor={(category) => category._id}
				renderItem={({ item }) => {
					return (
						<ListItem containerStyle={styles.container}>
							<ListItem.Content>
								<ListItem.Title
									titleStyle={styles.itemContainer}
								>
									<Button
										buttonStyle={styles.item}
										titleStyle={styles.itemTitle}
										type="outline"
										title={item}
										onPress={() => changeCategory(item)}
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

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		padding: 0,
	},
	itemContainer: {
		borderColor: 'transparent',
	},
	item: {
		backgroundColor: '#C830CC',
		padding: 6,
		margin: 6,
		borderWidth: 0,
	},
	itemTitle: {
		color: 'white',
		fontSize: 13,
		fontWeight: '500',
	},
});

export default CategoryList;
