import { Downloads } from "./FAQcomp/Downloads";
// import { FaqContainer } from "./FAQcomp/FaqContainer";
// import faqStyle from "./faq.module.scss";
import { FaqHeader } from "./FAQcomp/FaqHeader";
import { Featured } from "./FAQcomp/Featured";
import { GettingStarted } from "./FAQcomp/GettingStarted";
import { Uploads } from "./FAQcomp/Uploads";
import Style from "./faq.module.scss";
import Button from "../../component/Button";

const FAQ = () => {
  return (
    <>
      <section className={Style.faqWrap}></section>
      <FaqHeader />
      <GettingStarted header={"Getting Started"} />
      <Downloads header={"Downloads"} />
      <Uploads header={"Uploads"} />
      <Featured header={"Featured"} />
      <div className={Style.faqBtn}>
        <Button name={"Have more questions?"} />
      </div>
    </>
  );
};

export default FAQ;
