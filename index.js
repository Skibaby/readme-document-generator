const fs = require("fs");
const inquirer = require("inquirer");

const questions = [
  { message: "What is the name of your project?", name: "projectName" },
  {
    message: "What is the description of your project?",
    name: "projectDescription",
  },
  {
    message:
      "What is the image for your usage example (hit enter if you do not have a url for the image)?",
    name: "projectUsageExampleImage",
  },
  {
    message: "What are the steps required to install your project?",
    name: "installSteps",
  },
  {
    message:
      "List your collaborators with links to their GitHub profiles, as well as any third-party assets.",
    name: "collaboratorsList",
  },
  {
    message: "How can people contribute to this project?",
    name: "contributions",
  },
  {
    message: "Please provide a license information about your project.",
    name: "license",
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}

function init() {
  const prompt = inquirer.createPromptModule();
  prompt(questions)
    .then((answers) => {
      const readmeFile = "output/README.md";
      let data = "# " + answers.projectName + "\n";
      data += "\n";
      data += "## Description \n";
      data += "\n";
      data += answers.projectDescription + "\n";

      data += "\n" + "## Table of Contents \n";

      data += "- [Installation](#installation)\n";
      if (answers.projectUsageExampleImage != "") {

        data += "- [Usage Example](#usage-example)\n";
      }
      data += "- [Credits](#credits)\n";
      data += "- [License](#license)\n";
      data += "- [How To Contribute](#howToContribute)\n";

      data += "\n";
      data += "## Installation \n";
      data += "\n" + answers.installSteps;
      data += "\n";
      if (answers.projectUsageExampleImage != "") {
        data += "## Usage Example \n";
        data += "\n";
        data += "![alt text](" + answers.projectUsageExampleImage + ")\n";
      }
      data += "## Credits \n";
      data += "\n" + answers.collaboratorsList;
      data += "\n";
      data += "## License \n";
      data += "\n" + answers.license;
      data += "\n";
      data += "## How To Contribute \n";
      data += "\n" + answers.contributions;
      data += "\n";

      writeToFile(readmeFile, data);
    })
    .catch((error) => {
      console.log(error);
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}
// Function call to initialize app
init();
