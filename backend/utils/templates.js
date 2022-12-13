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
				width: 931px;
				height: 600px;
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
	</html>`,

  2: `<html>
	<head>
	  <style type="text/css">
		body,
		html {
		  margin: 0;
		  padding: 0;
		}
		body {
		  color: black;
		  display: table;
		  font-family: Georgia, serif;
		  font-size: 24px;
		  text-align: center;

		  width: 931px;
		  height: 600px;
		}

		.marquee {
		  color: #1c3b73;
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
		#container-wrapper {
		  padding: 10px;
		  border-top: 4px solid #1c3b73;
		  border-bottom: 4px solid #1c3b73;
		  border-left: 4px solid #1c3b73;
		  border-right: 4px solid #1c3b73;
		  height: calc(100% - 28px);
		}

		#container-design {
		  border: 2px solid #1c3b73;
		  height: 100%;
		}

		.line {
		  border-bottom: 1px solid #1c3b73;
		}

		p {
		  font-size: 12px;
		}

		h6 {
		  font-size: 12px;
		}

		.content {
		  height: 100%;
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		}

		.single-preview-issue {
		  text-transform: uppercase;
		  display: flex;
		  justify-content: space-around;
		  align-items: center;
		  font-weight: bolder;
		  margin: 20px 0px 15px 0px;
		  color: #1c3b73;
		  position: relative;
		  top: 40px;
		}

		.issue-by h6 {
			margin-bottom: 5px;
		}

		/* End Certificate markup and style */
	  </style>
	</head>
	<body>
	  <div id="container-wrapper">
		<div id="container-design">
		  <div class="content">
			<div class="marquee">Certificate of Completion</div>
			<div class="assignment">This certificate is presented to</div>
			<div class="person">{{name}}</div>
			<div class="reason">{{award}}</div>
			<div class="single-preview-issue">
			  <div class="issue-by">
				<h6>{{issuedBy}}</h6>
				<div class="line"></div>
				<p>ISSUED BY</p>
			  </div>

			  <div class="issue-by">
				<h6>{{issueDate}}</h6>
				<div class="line"></div>
				<p>ISSUE DATE</p>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</body>
  </html>
  `,
  3: `<html>
  <head>
    <style type="text/css">
      body,
      html {
        margin: 0;
        padding: 0;
      }
      body {
        color: black;
        display: table;
        font-family: Georgia, serif;
        font-size: 24px;
        text-align: center;

        width: 931px;
        height: 600px;
      }

      .marquee {
        color: #264534;
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

      .line {
        border-bottom: 1px solid #264534;
      }

      p {
        font-size: 12px;
      }
      h6 {
        font-size: 12px;
      }
      .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .single-preview-issue {
        text-transform: uppercase;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-weight: bolder;
        margin: 20px 0px 15px 0px;
        color: #264534;
        position: relative;
        top: 40px;
      }

	  #template3-wrapper {
        height: calc(100% - 36px);
        padding: 10px;
        border-radius: 5px;
        border: 8px solid #264534 !important;
        background: #fff;
      }

      #certificateWrapper3 {
        border: 8px dotted #264534;
        margin: 1px;
        height: calc(100% - 18px);
      }

      #template3-container {
        padding: 1px;
        margin: 5px;
        background: #fff;
      }

      #template3-design {
        background: white;
        margin: 1px;
      }

      h2,
      h6,
      p,
      .issue-by {
        color: #264534 !important;
      }

      #preview-text h2 {
        border-bottom: 2px solid #264534 !important;
      }

      .issue-by h6 {
        margin-bottom: 5px;
      }

      /* End Certificate markup and style */
    </style>
  </head>
  <body>
    <div id="template3-wrapper">
      <div id="certificateWrapper3">
        <div id="template3-design">
          <div class="content">
            <div class="marquee">Certificate of Completion</div>
            <div class="assignment">This certificate is presented to</div>
            <div class="person">{{name}}</div>
            <div class="reason">{{award}}</div>

            <div class="single-preview-issue">
              <div class="issue-by">
                <h6>{{issuedBy}}</h6>
                <div class="line"></div>
                <p>ISSUED BY</p>
              </div>

              <div class="issue-by">
                <h6>{{issueDate}}</h6>
                <div class="line"></div>
                <p>ISSUE DATE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`,
  4: `<html>
<head>
  <style type="text/css">
	body,
	html {
	  margin: 0;
	  padding: 0;
	}
	body {
	  color: black;
	  display: table;
	  font-family: Georgia, serif;
	  font-size: 24px;
	  text-align: center;

	  width: 931px;
	  height: 600px;
	}

	.marquee {
	  color: #19acbe;
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

	.line {
	  border-bottom: 1px solid #19acbe;
	}

	p {
	  font-size: 12px;
	}
	h6 {
	  font-size: 12px;
	}
	.content {
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	}

	.single-preview-issue {
	  text-transform: uppercase;
	  display: flex;
	  justify-content: space-evenly;
	  align-items: center;
	  font-weight: bolder;
	   color: #19acbe;
	  position: relative;
	  top: 30px;
	}

.issue-by h6{
margin-bottom: 5px;
}

#template2-wrapper {
position: relative;
margin: auto;
border: 3px solid #19acbe;
padding: 2px;
background: #eee;
height: calc(100% - 10px);
}
#certificateWrapper2 {
  background: #19acbe;
  border: 2px solid #19acbe;
  padding: 7px;
  margin: 1px;
  height: calc(100% - 20px);
}

#template2-container {
  padding: 1px;
  margin: 5px;
  background: #eee;
  border: 2px solid #19acbe;
  height: calc(100% - 16px);
}

#template2-design {
  border: 3px solid #19acbe;
  background: white;
  margin: 1px;
  height: calc(100% - 8px);
}

h2,
h6,
p,
.issue-by {
  color: #19acbe !important;
}
	/* End Certificate markup and style */
  </style>
</head>
<body>
  <div id="template2-wrapper">
	<div id="certificateWrapper2">
	<div id="template2-container">
	  <div id="template2-design">
		<div class="content">
		  <div class="marquee">Certificate of Completion</div>
		  <div class="assignment">This certificate is presented to</div>
		  <div class="person">{{name}}</div>
		  <div class="reason">{{award}}</div>

		  <div class="single-preview-issue">
			<div class="issue-by">
			  <h6>{{issuedBy}}</h6>
			  <div class="line"></div>
			  <p>ISSUED BY</p>
			</div>
			<div class="issue-by">
			  <h6>{{issueDate}}</h6>
			  <div class="line"></div>
			  <p>ISSUE DATE</p>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</body>
</html>
`
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
