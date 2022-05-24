import React, { useState } from "react";
import styled from "styled-components";

import { ExpandMore, Search } from "@mui/icons-material";

const Controls = () => {
	const [selectClick, setSelectClick] = useState({});

	const onSelectClickHandler = (e) => {
		e.stopPropagation();
		const selectName = e.currentTarget.dataset.name;

		setSelectClick((prev) => ({
			[selectName]: !prev[selectName],
		}));
	};

	return (
		<ControlsContainer>
			<label htmlFor="countryName">
				<span>Filter By Country Name</span>
				<div className="input-wrapper">
					<input type="text" id="countryName" name="countryName" />
					<Search className="icon" />
				</div>
			</label>

			<div
				className="select-wrapper"
				data-name="countriesSelect"
				onClick={onSelectClickHandler}
			>
				<div className="arrow-wrapper">
					<span className="current-select">sort...</span>
					<ExpandMore />
				</div>

				{selectClick.countriesSelect && <Select />}
			</div>
		</ControlsContainer>
	);
};

/*  custom select */
const Select = ({ currentSelect }) => {
	const filterElements = [
		"capital name",
		"code",
		"country name",
		"population",
		"region",
		"subregion",
	];

	return (
		<SelectContainer>
			<ul>
				{filterElements.map((el, i) => (
					<li key={i}>{el}</li>
				))}
			</ul>
		</SelectContainer>
	);
};

/* styles */
const ControlsContainer = styled.section`
	display: flex;
	padding: 2rem;
	border-radius: 0.3rem;
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
		min-width: 14rem;
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
`;

export default Controls;
