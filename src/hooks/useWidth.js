import { useState, useEffect } from 'react';

const useWidth = () => {

    const [width, setWidth] = useState(window.innerWidth);

    const setWidthHandler = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {

        window.addEventListener('resize', setWidthHandler);

        return () => window.removeEventListener('resize', setWidthHandler);

    }, [width]);

    return width;
};

export default useWidth;