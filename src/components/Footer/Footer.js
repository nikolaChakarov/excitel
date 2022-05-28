import styled from "styled-components";

const Footer = () => {
	return (
		<FooterContainer className="footer-container">
			<span>Nikola Chakarov 2022</span>
			<a href={"https://www.excitel.com/"} target="_blank">
				Excitel
			</a>
		</FooterContainer>
	);
};

const FooterContainer = styled.footer`
	padding: 2rem;
	margin-top: auto;
	display: flex;
	justify-content: center;
	border-top: 1px groove #fff;

	span {
		margin-right: 2rem;
	}

	a {
		font-weight: 700;
		color: var(--purple);
	}
`;

export default Footer;
