import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initState = {
	countries: [],
	filtered: [],
	getAllCountries: () => { },
	searchCountries: (query) => { },
	isLoading: true,
};

export const GlobalContext = createContext(initState);

export const GlobalProvider = ({ children }) => {
	const [appState, dispatch] = useReducer(AppReducer, initState);

	const getAllCountries = async () => {
		// no need to make another call to database, after we madet once and we have our data.
		if (appState.countries.length > 0) {
			return;
		}

		try {
			const dbResponse = await (await fetch("/countries")).json();

			dispatch({
				type: "GET_ALL_COUNTRIES",
				payload: dbResponse,
			});

		} catch (err) {
			console.log(err);
		}
	};

	const searchCountries = (query) => {
		dispatch({
			type: 'SEARCH',
			payload: query
		})
	}

	return (
		<GlobalContext.Provider
			value={{
				countries: appState.countries,
				filtered: appState.filtered,
				dispatch,
				getAllCountries,
				searchCountries
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
