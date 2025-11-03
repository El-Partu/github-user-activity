#!/usr/bin/env node
console.log(process.argv);
let data = [];

async function fetchGithubUserActivity(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events`);
    if(!response.ok){
        console.log(`Invalid user name provided. User ${response.statusText.toLowerCase()}`)
    }

    data = await response.json()
    console.log(data)
  } catch (err) {
     console.log("Error: ", err);
  }
}

if (process.argv.length > 2) {
  if (process.argv.length === 3) {
    (async function () {
      await fetchGithubUserActivity(process.argv[2]);
    })();
  } else {
    console.log("Too many argument provided>");
  }
} else {
  console.log(" ================ COMMAND ACCEPTED ================");
  console.log("github-activity <username>");
}
