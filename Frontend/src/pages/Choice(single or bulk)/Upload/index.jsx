import "./upload.style.scss";
// import ProgressBar from "react-bootstrap/ProgressBar";

const Upload = ({ completed = 60 }) => {
	const progessBarInnerStyle = { width: `${completed}%` };
	return (
		<div className="uploadContainer">
			<div className="progessBar">
				<div style={progessBarInnerStyle}></div>
			</div>
			<div className="percentage">
				{completed === 100 ? "upload" : <span>{completed}%</span>}{" "}
				complete
			</div>
			{completed === 100 ? (
				<button type="button" className="ok">
					Ok
				</button>
			) : (
				<button type="button" className="cancel">
					Cancel
				</button>
			)}
		</div>
	);
};

export default Upload;
