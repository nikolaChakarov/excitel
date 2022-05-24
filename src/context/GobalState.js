import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initState = {
	countries: [],
	filterd: [],
	getAllCountries: () => {},
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

			console.log(dbResponse);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<GlobalContext.Provider
			value={{
				countries: appState.countries,
				getAllCountries,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
