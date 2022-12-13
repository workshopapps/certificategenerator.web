const templates = {
  1: `<html>
	<head>
		<style type='text/css'>
			body, html {
				margin: 0;
				padding: 0;
			}
			body {
				color: black;
				display: table;
				font-family: Georgia, serif;
				font-size: 24px;
				text-align: center;
				width: 1180px;
				height: 760px;
			}
			.container {
				border: 20px solid tan;
				width: 750px;
				height: 563px;
				display: table-cell;
				vertical-align: middle;
			}
			.logo {
				color: tan;
			}

			.marquee {
				color: tan;
				font-size: 48px;
				margin: 20px;
			}
			.assignment {
				margin: 20px;
			}
			.person {
				border-bottom: 2px solid black;
				font-size: 32px;
				font-style: italic;
				margin: 20px auto;
				width: 400px;
			}
			.reason {
				margin: 20px;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="logo">
				{{nameoforganization}}
			</div>

			<div class="marquee">
				Certificate of Completion
			</div>

			<div class="assignment">
				This certificate is presented to
			</div>

			<div class="person">
				{{name}}
			</div>

			<div class="reason">
				{{award}}
			</div>
		</div>
	</body>
	</html>`
};

function getTemplate(templateId = 1) {
  let id = templateId;

  // if templateId is invalid (less than or equal to zero or greater than the number of templates) set id to 1
  if (templateId <= 0 || templateId > Object.keys(templates).length) id = 1;

  return templates[id];
}

module.exports = {
  getTemplate
};
