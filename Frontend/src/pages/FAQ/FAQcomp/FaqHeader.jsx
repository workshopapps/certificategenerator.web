import React from "react";
import Style from "../faq.module.scss";

export const FaqHeader = () => {
	return (
		<div className={Style.header}>
			<h2>Frequently Asked Questions</h2>
			<p>
				Some questions you might have about Certawi Certificate Geneartor as a
				user. Feel free to contact us for further enquiries that are not
				provided here.
			</p>
		</div>
	);
};
