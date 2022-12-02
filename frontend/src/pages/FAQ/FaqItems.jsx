import Style from "./faq.module.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaqIcon } from "../../assets/svgs";

export const FaqItems = ({ faq, onToggle, active }) => {
  const { title, body } = faq;
  // AiOutlinePlus;

  return (
    <>
      <div className={Style.faqWrapper}>
        <div className={Style.faqQuestions} onClick={onToggle}>
          <div className={Style.question}>
            {/* <RiQuestionnaireLine className={Style.icon} /> */}

            {/* <FaqIcon className={Style.faqIcon} /> */}

            <h3>{title}</h3>
          </div>

          {active ? (
            <AiOutlineMinus className={Style.icon} />
          ) : (
            <AiOutlinePlus className={Style.icon} />
          )}
        </div>
        {active ? (
          <ul className={Style.faqAnswers}>
            {body.map(item => {
              return <li>{item}</li>;
            })}
          </ul>
        ) : null}
      </div>
    </>
  );
};
