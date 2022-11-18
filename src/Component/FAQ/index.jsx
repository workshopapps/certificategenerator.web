import React from "react";
import { FaqContainer } from "./FAQcomp/FaqContainer";
// import faqStyle from "./faq.module.scss";
import { FaqHeader } from "./FAQcomp/FaqHeader";
export const FAQ = () => {
	return (
		<>
			<FaqHeader />
			<FaqContainer />
		</>
	);
};
