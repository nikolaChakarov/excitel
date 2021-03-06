import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Nav from "./components/Nav/Nav";
import Countries from "./components/Countries/Countries";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";

const App = () => {
	return (
		<Container>
			<Nav />

			<Routes>
				<Route path="/" element={<Countries />} />
				<Route path="/about" element={<About />} />
			</Routes>

			<Footer />
		</Container>
	);
};

const Container = styled.section`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

export default App;
