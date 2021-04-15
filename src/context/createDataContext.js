import React, { useReducer } from 'react';

/** Function that generates a context and its provider from a reducer, an object 
 * with the actions and an object with the initial state that it receives 
 * as parameters. */
export default (reducer, actions, defaultValue) => {
	const Context = React.createContext();

	const Provider = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, defaultValue);

		const boundActions = {};
		for (let key in actions) {
			boundActions[key] = actions[key](dispatch);
		}

		return (
			<Context.Provider value={{ state, ...boundActions }}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
};
