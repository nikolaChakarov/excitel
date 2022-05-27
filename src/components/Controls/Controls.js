import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import useDebounce from "../../hooks/useDebounce";
import { GlobalContext } from "../../context/GobalState";

import { ExpandMore, Search } from "@mui/icons-material";

const Controls = () => {
	const { searchCountries, sortByQuery, dispatch } = useContext(GlobalContext);

	/* this can be made easier, since we have only one select, but if now we add another one, it's much more scalable. */
	const [selectClick, setSelectClick] = useState({});
	const [currentSelect, setCurrentSelect] = useState("sort...");

	const [countryName, setCountryName] = useState('');

	const onInputChangeHandler = (e) => {

		const inputValue = e.target.value;
		setCountryName(inputValue);

		// reset filtered array;
		if (inputValue.length === 0) {
			dispatch({
				type: 'CLEAR_SEARCH'
			});
		}

	};

	const onSelectClickHandler = (e) => {
		const selectName = e.currentTarget.dataset.name;

		setSelectClick((prev) => ({
			[selectName]: !prev[selectName],
		}));
	};

	const debouncedValue = useDebounce(countryName, 1000);

	useEffect(() => {
		if (debouncedValue) {
			searchCountries(debouncedValue);
		}

	}, [debouncedValue])

	return (
		<ControlsContainer>
			{/* filter */}
			<label htmlFor="countryName">
				<span>Filter By Country Name</span>
				<div className="input-wrapper">
					<input
						type="text"
						id="countryName"
						name="countryName"
						value={countryName}
						onChange={onInputChangeHandler}
					/>
					<Search className="icon" />
				</div>
			</label>

			{/* sort */}
			<div
				className="select-wrapper"
				data-name="countriesSelect"
				onClick={onSelectClickHandler}
			>
				<div className="arrow-wrapper">
					<span className="current-select">{currentSelect}</span>
					<ExpandMore
						style={{
							transform: selectClick.countriesSelect ? "rotate(180deg)" : "",
							transition: "all .5s ease-in-out",
						}}
					/>
				</div>

				{selectClick.countriesSelect && (
					<Select
						currentSelect={currentSelect}
						setCurrentSelect={setCurrentSelect}
						sortByQuery={sortByQuery}
					/>
				)}
			</div>
		</ControlsContainer>
	);
};

/*  custom select */
const Select = ({ currentSelect, setCurrentSelect, sortByQuery }) => {
	const filterElements = [
		"sort...",
		"capital name",
		"code",
		"country name",
		"population",
		"region",
		"subregion",
	].filter((el) => el !== currentSelect);

	const onCurrentSelectClickHandler = (e) => {
		const selectedSort = e.currentTarget.dataset.name;
		setCurrentSelect(selectedSort);

		if (selectedSort === 'sort...') {
			sortByQuery('country name');
			return;
		}

		sortByQuery(selectedSort)
	};

	return (
		<SelectContainer>
			<ul>
				{filterElements.map((el, i) => (
					<li key={i} data-name={el} onClick={onCurrentSelectClickHandler}>
						{el}
					</li>
				))}
			</ul>
		</SelectContainer>
	);
};

/* styles */
const ControlsContainer = styled.section`
	display: flex;
	padding: 2rem;
	background: var(--blue-green);
	color: #fff;

	label {
		display: flex;
		align-items: center;
		margin-right: 6rem;

		span {
			margin-right: 2rem;
		}

		.input-wrapper {
			background: #fff;
			display: flex;
			align-items: center;
			box-shadow: var(--innerShadow);

			.icon {
				color: var(--purple);
				margin: 0 0.5rem;
			}
		}
	}

	input {
		outline: none;
		padding: 0.3rem;
		border: none;
		min-height: 2.5rem;
		background: transparent;
	}

	.select-wrapper {
		background: #fff;
		min-width: 15rem;
		position: relative;
		padding: 0 1rem;
		cursor: pointer;
		color: var(--purple);
		box-shadow: var(--innerShadow);

		.arrow-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100%;
		}

		.current-select {
			font-weight: 600;
		}
	}
`;

const SelectContainer = styled.div`
	position: absolute;
	background: #fff;
	left: 0;
	right: 0;
	padding: 0.4rem 1rem 1rem;
	font-size: 1.4rem;
	cursor: pointer;
	box-shadow: var(--shadow);
	z-index: 100;
`;

export default Controls;
