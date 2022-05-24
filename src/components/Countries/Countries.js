import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GobalState";
import styled from "styled-components";

import Controls from "../Controls/Controls";

const Countries = () => {
	const { getAllCountries, countries } = useContext(GlobalContext);

	useEffect(() => {
		getAllCountries();
	}, []);

	return (
		<CountriesContainer>
			<Controls />
		</CountriesContainer>
	);
};

const CountriesContainer = styled.section``;

export default Countries;
