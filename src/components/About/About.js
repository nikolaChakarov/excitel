import React from 'react';
import styled from 'styled-components';

const About = () => {
    const features = ['react', 'react context api', 'react router dom', 'react hooks: useState, useEffect, useRef, useContext, useReducer', 'custom hooks for debounced search and resize', 'fetch api', 'promises', 'flexbox responsive layout', 'styled components', 'material ui']
    return (
        <AboutContainer className='about-container'>
            <p>Demo Project made by <span>Nikola Chakarov</span></p>
            <p>Assign by <span>EXCITEL</span></p>

            <p className='features'>used features:</p>

            <ul>
                {features.map((el, i) => (
                    <li key={i}>{el}</li>
                ))}
            </ul>
        </AboutContainer>
    )
};

const AboutContainer = styled.div`
    padding: 2rem;
    font-size: 1.4rem;
    line-height: 2.2rem;

    span {
        font-weight: bold;
    }

    .features {
        margin: 1.5rem 0 0.5rem;
        border-bottom: 1px groove #fff;
    }

    ul li {
        margin-bottom: 0.2rem;
    }
`

export default About;