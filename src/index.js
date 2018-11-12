// get required built-in packages

const path = require('path');
const os = require('os');
const exec = require('child_process').exec;

// get the arguments that are used with the executed command
const arguments = process.argv.slice(2);

let commandName = '';
let command = '';

arguments.forEach(argument => {
    switch(argument) {
        case 'OUTSIDE':
            commandName = argument;
            //os.homedir() gives the home directory regardless of your OS
            return command = 'node ' + path.join(os.homedir(), 'Desktop/run-custom-npm-scripts/example-outside/outside');
        case 'INSIDE':
            commandName = argument;
            return command = 'npm start --prefix ' + path.join(os.homedir(), 'Desktop/run-custom-npm-scripts/src/example-inside');
        default:
            return console.log('You either didn\'t pass any command or no matching command found.');     
    }
});

//execute the command
exec(command, (error, stdout, stderr) => {    
    if (stderr || error) {
        console.log('An Error Occured!');
    } else {
        console.log(commandName, 'Command Successful');
    }
});