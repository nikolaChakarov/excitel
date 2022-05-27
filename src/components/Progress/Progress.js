import React, { useRef, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import styled from "styled-components";

function CircularProgressWithLabel(props) {
    return (
        <SpinnerAnimationContainer>
            <CircularProgress
                className="spinner-animation"
                variant="determinate"
                size={20}
                {...props}
            />
            {/* we need only 3 seconds that's why we devide by 33; according to the documents API, value should be 100 to have our animation as expected */}
            <p>{`${Math.round(props.value / 33)}`}</p>
        </SpinnerAnimationContainer>
    );
}

export default function CircularStatic() {
    const [count, setCount] = useState(3);
    let timer = useRef(null);

    const startCounter = () => {
        timer.current = setInterval(() => {
            setCount((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
    };

    useEffect(() => {
        startCounter();
        return () => clearInterval(timer.current);
    }, []);

    return (
        <SpinnerContainer>
            <CircularProgressWithLabel value={count * 33} />
        </SpinnerContainer>
    );
}

/* styles */

const SpinnerContainer = styled.section`
	display: flex;
	align-items: center;
`;

const SpinnerAnimationContainer = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 10px;
	.spinner-animation {
		position: relative;
	}
	p {
		position: absolute;
		font-size: 12px;
	}
`;