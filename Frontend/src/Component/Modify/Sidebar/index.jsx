import "./sidebar.style.scss";
import Select from "../../Utils/Select";
import { useState } from "react";
import ColorPick from "../../Utils/ColorPick";
// component

const Sidebar = () => {
	const [state, setState] = useState({
		color: { primary: "#366168", secondary: "#8FDAC0", accent: "#F7C794" },
		nameOfIssuer: { value: "qwerty", fontSize: 22, fontFamily: "sans" },
		nameofRecipient: {
			value: "qwerty",
			fontSize: 22,
			fontFamily: "sans",
		},
		title: { value: "qwerty", fontSize: 22, fontFamily: "sans" },
		purpose: { value: "qwerty", fontSize: 22, fontFamily: "sans" },
		dateOfIssue: { value: "", fontSize: 22, fontFamily: "sans" },
		nameOfIssuer2: { value: "qwerty", fontSize: 22, fontFamily: "sans" },
	});

	const handleChange = (e) => {
		// console.log(e.target.parentElement.dataset.name);

		setState((prev) => {
			return {
				...prev,

				[e.target.parentElement.dataset.name]: {
					...prev[e.target.parentElement.dataset.name],
					// ...prev.nameOfIssuer,
					// ...e.target.parentElement.dataset.name,
					[e.target.name]: e.target.value,
				},
			};
		});

		//  this.setState({value: event.target.value});
	};

	console.log(state);

	const fontSize = [
		{ label: "1", value: 1 },
		{ label: "2", value: 2 },
		{ label: "3", value: 3 },
		{ label: "4", value: 4 },
		{ label: "5", value: 5 },
		{ label: "22", value: 22 },
	];
	const fontFamily = [
		{ label: "Work", value: "Work" },
		{ label: "Sans", value: "Sans" },
		{ label: "Serif", value: "Serif" },
	];
	const color = [
		{ primary: "#366168", secondary: "#8FDAC0", accent: "#F7C794" },
		{ primary: "#9CD8FA", secondary: "#CB8FDA", accent: "#F79A94" },
		{ primary: "#F5B3F6	", secondary: "#B177C5", accent: "#FBECDC" },
		{ primary: "#EAEAD0", secondary: "#ACA98A", accent: "#D57E55" },
		{ primary: "#F5B3F6", secondary: "#B177C5", accent: "#FBECDC" },
	];

	// handle drag events
	const handleDrag = function (e) {
		e.preventDefault();
		e.stopPropagation();
	};

	// triggers when file is dropped
	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		// setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			[...e.dataTransfer.items].forEach((item, i) => {
				// If dropped items aren't files, reject them
				if (item.kind === "file") {
					const file = item.getAsFile();
					console.log(`… file[${i}].name = ${file.name}`);
				}
			});
			// handleFiles(e.dataTransfer.files);
		}
	};

	// triggers when file is selected with click
	// const handleChange = function (e) {
	// 	e.preventDefault();
	// 	if (e.target.files && e.target.files[0]) {
	// 		// handleFiles(e.target.files);
	// 	}
	// };

	return (
		<div className="sidebar">
			<h1>Modify Certificate</h1>
			<h3>Color</h3>
			<h5>Schemes</h5>
			<div className="colorScheme">
				<div className="selection">
					{color.map((e) => (
						<ColorPick
							bigColor={e.primary}
							smallColorLeft={e.secondary}
							smallColorRight={e.accent}
							setState={setState}
						/>
					))}
				</div>
				<div className="primaryColor">
					<label>Primary Color:</label>
					<span
						className="colorCircle"
						style={{ backgroundColor: state.color.primary }}
					></span>
					<span className="colorHex">{state.color.primary}</span>
				</div>
				<div className="secondaryColor">
					<label>Secondary Color:</label>
					<span
						className="colorCircle"
						style={{ backgroundColor: state.color.secondary }}
					></span>
					<span className="colorHex">{state.color.secondary}</span>
				</div>
				<div className="accentColor">
					<label>Accent Color:</label>
					<span
						className="colorCircle"
						style={{ backgroundColor: state.color.accent }}
					></span>
					<span className="colorHex">{state.color.accent}</span>
				</div>
			</div>

			<form onDragEnter={handleDrag}>
				<ul>
					<h3>Text</h3>
					<li data-name="nameOfIssuer">
						<label htmlFor="issuer">Name of Issuer</label>
						<input
							type="text"
							id="issuer"
							name="value"
							className="long"
							value={state.nameOfIssuer.value}
							onChange={handleChange}
						/>
						<Select
							class="medium"
							list={fontFamily}
							name="fontFamily"
							id=""
							value={state.nameOfIssuer.fontFamily}
							onChange={handleChange}
						/>
						<Select
							value={state.nameOfIssuer.fontSize}
							class="short"
							list={fontSize}
							name="fontSize"
							id=""
							onChange={handleChange}
						/>
					</li>
					<li data-name="nameofRecipient">
						<label htmlFor="recipient">Name of Recipient</label>
						<input
							type="text"
							id="recipient"
							name="value"
							className="long"
							value={state.nameofRecipient.value}
							onChange={handleChange}
						/>
						<Select
							class="medium"
							list={fontFamily}
							name="fontFamily"
							id=""
							value={state.nameofRecipient.fontFamily}
							onChange={handleChange}
						/>

						<Select
							value={state.nameofRecipient.fontSize}
							class="short"
							list={fontSize}
							name="fontSize"
							id=""
							onChange={handleChange}
						/>
					</li>
					<li data-name="title">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							id="title"
							name="value"
							className="long"
							value={state.title.value}
							onChange={handleChange}
						/>
						<Select
							class="medium"
							list={fontFamily}
							name="fontFamily"
							id=""
							value={state.title.fontFamily}
							onChange={handleChange}
						/>

						<Select
							value={state.title.fontSize}
							class="short"
							list={fontSize}
							name="fontSize"
							id=""
							onChange={handleChange}
						/>
					</li>
					<li data-name="purpose">
						<label htmlFor="purpose">Purpose</label>
						<input
							type="text"
							id="purpose"
							name="value"
							className="long"
							value={state.purpose.value}
							onChange={handleChange}
						/>
						<Select
							class="medium"
							list={fontFamily}
							name="fontFamily"
							id=""
							value={state.purpose.fontFamily}
							onChange={handleChange}
						/>

						<Select
							value={state.purpose.fontSize}
							class="short"
							list={fontSize}
							name="fontSize"
							id=""
							onChange={handleChange}
						/>
					</li>
					<li data-name="dateOfIssue">
						<label htmlFor="dateOfIssue">Date of Issue</label>

						<input
							type="date"
							id="dateOfIssue"
							name="value"
							className="long"
							value={state.dateOfIssue.value}
							onChange={handleChange}
						/>
						<Select
							class="medium"
							list={fontFamily}
							name="fontFamily"
							id=""
							value={state.dateOfIssue.fontFamily}
							onChange={handleChange}
						/>

						<Select
							value={state.dateOfIssue.fontSize}
							class="short"
							list={fontSize}
							name="fontSize"
							id=""
							onChange={handleChange}
						/>
					</li>
					<li data-name="nameOfIssuer2">
						<label htmlFor="issuer2">Name of Issuer</label>
						<textarea
							type="text"
							id="issuer2"
							name="value"
							className="long"
							value={state.nameOfIssuer2.value}
							onChange={handleChange}
						></textarea>
						<Select
							class="medium"
							list={fontFamily}
							name="fontFamily"
							id=""
							value={state.nameOfIssuer2.fontFamily}
							onChange={handleChange}
						/>

						<Select
							value={state.nameOfIssuer2.fontSize}
							class="short"
							list={fontSize}
							name="fontSize"
							id=""
							onChange={handleChange}
						/>
					</li>
					<h3>Image</h3>
					<li>
						<div></div>
						<label htmlFor="issuer">Issuer's Logo</label>
						<div
							className="dragBox"
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						>
							<span>Drop file here to upload</span>
							<div className="or">
								<hr />
								<span>or</span>
								<hr />
							</div>
							<label htmlFor="issuerLogo" className="fileUpload">
								<input
									type="file"
									id="issuerLogo"
									name="issuerLogo"
									accept=".jpg"
								/>
								Browse files
							</label>
						</div>
					</li>
					<li>
						<div></div>
						<label htmlFor="issuer">Issuer's Signature</label>
						<div
							className="dragBox"
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						>
							<span>Drop file here to upload</span>
							<div className="or">
								<hr />
								<span>or</span>
								<hr />
							</div>
							<label
								htmlFor="issuerSignature"
								className="fileUpload"
							>
								<input
									type="file"
									id="issuerSignature"
									name="issuerSignature"
									accept=".jpg"
									className="box"
								/>
								Browse files
							</label>
						</div>
					</li>
					<li>
						<input
							value="Reset"
							type="reset"
							name="reset"
							className="long"
						/>
					</li>
					<li></li>
				</ul>
			</form>
		</div>
	);
};

export default Sidebar;
