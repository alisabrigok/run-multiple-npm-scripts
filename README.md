# Run Multiple Different Npm Scripts _-Or Whatever You Want-_ At Once With A Single Command

tl;dr just include the command and the relative path the command to be executed at to package.json - then npm start and done.

## Motivation

We have several different front-end projects in my company. And each one of them has its own way to run the project.

Some of them can be run as simple as with an

`$ npm start`

While some others aren't that much straightforward and require some other commands to be run first.

So after some time, I realized that I was either just locking my laptop's screen without terminating any of my terminals just to not to redo all these commands or I was losing time to go through each one of them. Again. And again. Every. Single. Time.

~~No need to mention occasional memory-loses and reading the project's documentation to remember how to kickstart them.~~

Then I said;

> Hold on a second, these commands are already just kickstarter of some other commands to run some scripts. So why not write a command to run the commands which will run some other commands to run some scripts?

Makes sense right?

Appereantly it was.

It's no biggie really. There are already plenty of instructions for how to run multiple npm scripts on online.

i.e. [The video I mostly learned what I implemented in this repository](https://egghead.io/lessons/npm-open-multiple-terminal-tabs-on-npm-start-with-ttab-and-npm-run-all 'The video I mostly got what I implemented in this repository')

But usually these instructions are for running the scripts that are belong to the same package.json.

What about running scripts that are belong to multiple other package.json?

## Let's Begin

_Hold my tea._

### Installation

Clone or download this repository.
Decide which methods that are explained below you will use.
Go to the repository's directory and change the name of the package.json you want to use.
Finally install the dependencies:

`npm install`

## The Easy Way

The easy and straightforward way is just using the package.json to run whichever commands you want.

You will find

`package-only-npm-scripts.json`

file inside of the 'src' folder. We will use this package.json for this method. So just delete the other package-using-js-file.json and rename this one to package.json.

We use 2 packages to make this work.

-**npm-run-all** - to execute all the commands sequentially -**ttab** - to execute each command on its own bash on a new tab

So for this to work, we use only package.json and nothing else. And it goes like this:

```json
"scripts": {
    "start": "run-s tab:run-outside tab:run-inside",
    "run-outside": "node ../example-outside/outside",
    "run-inside": "npm start --prefix ./example-inside",
    "tab:run-outside": "ttab -t 'Outside Bash' npm run run-outside",
    "tab:run-inside": "ttab -t 'Inside Bash' npm run run-inside"
}
```

Let's break it down from bottom to top:

`"tab:run-inside": ttab -t 'Bash Name' commandToBeRun` -> Used for openning a new tab with the given bash name and then running the provided command. "tab:run-inside" is basically the name of this command.

`"run-inside": "npm start --prefix ./example-inside,` -> Used for executing another npm script using its relative path which might be belong to a compeletly different project. --prefix is used for that npm to run its own command on that relative path.

`"run-outside": "node ../example-outside/outside"` -> Same as above but this time we only run a JavaScript file directly. So our commands can take shape however we want.

`"start": "run-s tab:run-outside tab:run-inside"` -> Used for executing each of our commands which will execute the commands we eventually wanted to be executed. run-s means the commands will be executed sequentially.

As can be understood easily, with a simple

`npm start`

command, we can run multiple npm scripts, commands etc. whatever we want.

For my case in my company, I use this method to set some configuration variables and then initiate the projects. So we are not only restricted to running scripts. We can do whatever we want that we normally can do using the terminal.

## The Interesting Way

**Note: **Using this method, you don't actually see the outcomes of your runned script on the bash that opened on the new tab. It runs without any issue but you don't see any logs.

For this method, we use the package-using-js-file.json inside of the src folder. So rename it to package.json and delete the other one if you want.

Most of the commands that executed under scripts which I explained above are still valid. The only difference is, we pass a variable using the script which will be executed.

How?

When you run the command below

`node file-name.js`

you actually can reach what you've executed within that file-name.js under `process.argv`

This holds an array whose elements can be used by our favor. So basically it's

0th element -> node
1st element -> /Users/someLocation/file-name.js
2nd, 3rd, 4th etc. element -> the other arguments we use after node file-name.js

[More information about it](https://stackoverflow.com/a/22214067 'More information about it')

So if we had

`node file-name.js 'yo' 'wudup'`

the 2nd element would be 'yo' and 3rd would be 'wudup'.

This means we can use them to conditionally run whichever command we want. And this is exactly what we did in the index.js file.

- We reached to process.argv and took out only the arguments we passed from package.json file scripts.

- Then for each element of this array, we conditionally created our command.

`path.join(os.homedir(), 'Desktop/run-custom-npm-scripts/example-outside/outside')` -> gets the path of the file we want to execute, by starting from home directory of any operation system.

- Finally we used a child process to execute the command we just created.

And voila, again new tabs open for each command and they gets executed.

Same logic as the easy way applies here from the package.json.

We just passed the arguments like so:

`"run-outside": "node index OUTSIDE"`

## Verdict

Just go for the easy way if you just want to run your multiple projects without a hassle just like me.

If you want to go for some experemental stuff, check out the interesting way.

Thanks for bearing with me. I'm writing this at 11 pm and I haven't left the office yet. So i might have mixed some terminology, and made what is actually simple look harder.

Anyways, just look at the codes, you will understand a lot easier than the thousand words here.

See ya.
