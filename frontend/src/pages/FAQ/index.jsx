import {useNavigate} from "react-router-dom"
import { FaqSection } from "./FaqSection";
import {
  GettingStartedItems,
  FeaturedItems,
  UploadsItems,
  DownlaodsItems,
} from "./FaqModule";

import Style from "./faq.module.scss";
import Button from "../../Component/button";

const FAQ = () => {
  const navigate = useNavigate()
  return (
    <>
      <section className={Style.faqWrap}></section>
      <div className={Style.header}>
        <h2>Frequently Asked Questions</h2>
        <p>
          Some questions you might have about Certawi Certificate Geneartor as a
          user. Feel free to contact us for further enquiries that are not
          provided here.
        </p>
      </div>
      <FaqSection header={"Getting Started"} questions={GettingStartedItems} />
      <FaqSection header={"Downloads"} questions={DownlaodsItems} />
      <FaqSection header={"Uploads"} questions={UploadsItems} />
      <FaqSection header={"Featured"} questions={FeaturedItems} />

      <div className={Style.faqBtn}>
        <Button name={"Have more questions?"}onClick={() => navigate("/contact-us")} />
      </div>
    </>
  );
};

export default FAQ;
