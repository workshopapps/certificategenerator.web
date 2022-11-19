import Style from "../faq.module.scss";
import Question from "./Assets/Framequestion.png";
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";

export const FaqItems = ({ faq, onToggle, active }) => {
	const { title, body } = faq;

	return (
		<>
			<div className={Style.faqWrapper}>
				<div className={Style.faqQuestions}>
					<div className={Style.question}>
						<div className={Style.faqIcon}>
							{/* <RiQuestionnaireLine className={Style.icon} /> */}

							<img src={Question} alt='' />
						</div>

						<h3>{title}</h3>
					</div>
					<div className={Style.dropdowmIcon}>
						{active ? (
							<RiArrowDropRightLine className={Style.icon} onClick={onToggle} />
						) : (
							<RiArrowDropDownLine className={Style.icon} onClick={onToggle} />
						)}
					</div>
				</div>
				{active ? (
					<ul className={Style.faqAnswers}>
						{body.map((item) => {
							return <li>{item}</li>;
						})}
					</ul>
				) : null}
			</div>
		</>
	);
};
