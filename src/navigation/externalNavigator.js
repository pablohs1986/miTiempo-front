import { NavigationActions } from 'react-navigation';

let externalNavigator;

/** Method that gives access to the navigator object it receives. */
export const setNavigator = (appNavigator) => {
	externalNavigator = appNavigator;
};

/** Method that allows navigating to the route that it receives as a parameter.
 * It can also receive a params object.
 * Internally, it changes the state in the navigation and redirects
 * to the desired flow or screen.
 * Used when we do not have direct access to the app's navigator.
 * */
export const navigate = (routeName, params) => {
	externalNavigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	);
};
