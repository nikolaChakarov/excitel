import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";

import { GlobalContext } from "../../context/GobalState";
import {
    FirstPage,
    LastPage,
    ChevronLeftOutlined,
    ChevronRightOutlined,
} from "@mui/icons-material";

import Controls from "../Controls/Controls";
import Country from '../Country/Country';

const Countries = () => {
    const { getAllCountries, countries } = useContext(GlobalContext);

    /* pagination */
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 12;
    const pagesVisited = (activePage - 1) * itemsPerPage;
    const displayItems = countries.slice(pagesVisited, pagesVisited + itemsPerPage);

    const changePage = (num) => {
        setActivePage(num);
    };
    /* end pagination */

    useEffect(() => {
        getAllCountries();
    }, [countries]);


    return (
        <CountriesContainer>
            <Controls />

            <Ul>
                {displayItems.map((el, i) => (
                    <Country key={i} {...el} id={i} />
                ))}
            </Ul>

            <Pagination
                totalItemsCount={countries.length}
                onChange={changePage}
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                pageRangeDisplayed={5}
                firstPageText={<FirstPage />}
                prevPageText={<ChevronLeftOutlined />}
                lastPageText={<LastPage />}
                nextPageText={<ChevronRightOutlined />}
                innerClass={"pagination-container"}
                itemClass={"pagination-item"}
                linkClass={"pagination-link"}
                itemClassFirst={"pagination-btn-end"}
                itemClassLast={"pagination-btn-end"}
                itemClassNext={"pagination-btn"}
                itemClassPrev={"pagination-btn"}
                activeLinkClass={"pagination-active"}
            />
        </CountriesContainer>
    );
};

const CountriesContainer = styled.section`
        flex: 1;
        display: flex;
        flex-direction: column; 

    .pagination-container {
		* {
			padding: 0;
			margin: 0;
		}
		display: flex;
		justify-content: center;
		margin-top: auto;
		margin-bottom: 20px;
		.pagination-item {
			border: 1px groove #fff;
			width: 50px;
			height: 30px;
			display: flex;
			margin-right: 10px;
			&:last-of-type {
				margin-right: 0;
			}
		}
		.pagination-link {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			text-decoration: none;
			color: #333;
		}
		.pagination-active {
			background: #333;
			color: #fff;
			transition: all 0.2s ease-in-out;
			&:hover {
				box-shadow: inset 0px 0px 5px red;
			}
		} 
    }
`;

const Ul = styled.ul`
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: lightblue;
    height: 100%;
    gap: 1rem;
    
    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`

export default Countries;
