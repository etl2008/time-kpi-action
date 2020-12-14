const core = require('@actions/core');
const github = require('@actions/github');
var sys = require('sys')
var exec = require('child_process').exec;

try {
    // `who-to-greet` input defined in action metadata file
    const commandToRun = core.getInput('command');
    console.log(`Command: ${commandToRun}`);

    var startTime = process.hrtime();

    exec(`${commandToRun}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        //console.log(`stdout: ${stdout}`);
        //console.error(`stderr: ${stderr}`);
      });

      var elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
	console.log(`Command execution took: ${elapsedSeconds}`);
    core.setOutput("Command execution took - ", elapsedSeconds);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    //console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }

  function parseHrtimeToSeconds(hrtime) {
    var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
}