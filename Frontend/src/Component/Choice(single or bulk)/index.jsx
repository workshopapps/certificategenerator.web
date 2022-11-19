import "./choice.style.scss";

import React from "react";
// img

import UploadIcon from "../../assets/img/upload.svg";
import Info from "../../assets/img/info.svg";
// componenet
import Upload from "./Upload";

const Choice = () => {
	return (
		<div className="choiceContainer">
			<div className="single">
				<h2>Single certificate</h2>
				<p>Generate a single certificate within a few clicks</p>
				<button type="button">Lets get started</button>
			</div>
			<div className="or">
				<div class="vl"></div>
				<span>or</span>
				<div class="vl"></div>
			</div>
			<div className="bulk">
				<h2>Bulk certificate</h2>
				<p>
					Generate multiple certificates from a single CSV file
					<i className="infoIcon">
						<img src={Info} alt="Info Icon" />
					</i>
				</p>
				<button type="button">
					<i>
						<img src={UploadIcon} alt="Upload Icon" />
					</i>
					<span>Upload</span>
				</button>
				<div>
					<a href="/">Download</a> sample CSV file
				</div>
				<Upload />
			</div>
		</div>
	);
};

export default Choice;
