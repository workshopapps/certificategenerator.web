import Style from "./faq.module.scss";
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";
import { FaqIcon } from "../../assets/svgs";

export const FaqItems = ({ faq, onToggle, active }) => {
  const { title, body } = faq;

  return (
    <>
      <div className={Style.faqWrapper}>
        <div className={Style.faqQuestions} onClick={onToggle}>
          <div className={Style.question}>
            {/* <RiQuestionnaireLine className={Style.icon} /> */}

            <FaqIcon className={Style.faqIcon} />

            <h3>{title}</h3>
          </div>

          {active ? (
            <RiArrowDropRightLine className={Style.icon} />
          ) : (
            <RiArrowDropDownLine className={Style.icon} />
          )}
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
