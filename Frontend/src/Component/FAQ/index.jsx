import { Downloads } from "./FAQcomp/Downloads";
// import { FaqContainer } from "./FAQcomp/FaqContainer";
// import faqStyle from "./faq.module.scss";
import { FaqHeader } from "./FAQcomp/FaqHeader";
import { Featured } from "./FAQcomp/Featured";
import { GettingStarted } from "./FAQcomp/GettingStarted";
import { Uploads } from "./FAQcomp/Uploads";

export const FAQ = () => {
	return (
		<>
			<FaqHeader />
			<GettingStarted header={"Getting Started"} />
			<Downloads header={"Downloads"} />
			<Uploads header={"Uploads"} />
			<Featured header={"Featured"} />
		</>
	);
};
