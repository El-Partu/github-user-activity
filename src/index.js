#!/usr/bin/env node
console.log(process.argv);
let events = [];

async function fetchGithubUserActivity(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events`);
    if(!response.ok){
        console.log(`Invalid user name provided. User ${response.statusText.toLowerCase()}`)
        process.exit(1)
    }

    events = await response.json()
    
    const summary = events.map(event => {
        const repo = event.repo.name

        if(event.type === 'PushEvent'){
            const commits = event.payload.commits ? event.payload.commits.length : 0;

            return `Pushed ${commits} commit${commits > 1 ? 's' : ' ' } ${repo}`
        }else if(event.type === 'IssuesEvent' && event.payload.action === "opened"){
            return `Opened a new issue in ${repo}`
        }else if(event.type === 'WatchEvent'){
            return `Starred ${repo}`
        }
    })

    if(summary.length !==0){
        summary.forEach(el => {
            el !== undefined ? console.log(`- ${el}`) : " "
        });
        process.exit(1)
    }

    console.log("No event found on your github")
    process.exit
  } catch (err) {
     console.log("Error: ", err);
     process.exit(1)
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
