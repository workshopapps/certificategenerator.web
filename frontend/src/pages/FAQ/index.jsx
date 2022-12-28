import { useNavigate } from "react-router-dom";
import { FaqSection } from "./FaqSection";
import {
  GettingStartedItems,
  FeaturedItems,
  UploadsItems,
  DownlaodsItems
} from "./FaqModule";

import Style from "./faq.module.scss";
import Button from "../../Component/button";
import { Suspense } from "react";

const FAQ = () => {
  const navigate = useNavigate();
  return (
    <>
      <Suspense>
        <section className={Style.faqWrapper}></section>
        <div className={Style.header}>
          <h2>Frequently Asked Questions</h2>
        </div>
        <FaqSection
          header={"Getting Started"}
          questions={GettingStartedItems}
        />
        <FaqSection header={"Downloads"} questions={DownlaodsItems} />
        <FaqSection header={"Uploads"} questions={UploadsItems} />
        <FaqSection header={"Featured"} questions={FeaturedItems} />
        <div className={Style.faqFooter}>
          <p>
            Do you have more questions on Certgo Certificate Generator? Feel
            free to contact us for further enquiries that are not provided here.
          </p>
        </div>

        <div className={Style.faqBtn}>
          <Button
            name={"Contact Us?"}
            onClick={() => navigate("/contact-us")}
          />
        </div>
      </Suspense>
    </>
  );
};

export default FAQ;
