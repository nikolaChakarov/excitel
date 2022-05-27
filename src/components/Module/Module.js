import React from 'react';
import styled from 'styled-components';

const Module = (props) => {

    const { handlerStartCounter, name, capitalName, code, flag, population, region, subregion } = props;

    const onModuleClick = (e) => {
        e.stopPropagation();

        handlerStartCounter();
    }

    return (
        <ModuleContainer onClick={onModuleClick}>
            <div className="bg">
                <p>Country: <span>{name}</span></p>
                <p>Capital name: <span>{capitalName}</span></p>
                <p>Code: <span>{code}</span></p>
            </div>
        </ModuleContainer>
    )
}


const ModuleContainer = styled.div`
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .bg {
            background: #fff;
            padding: 2rem;
            border-radius: 0.3rem;
            box-shadow: var(--shadow);
        }
`

export default Module