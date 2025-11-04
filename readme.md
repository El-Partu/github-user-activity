# GITHUB USER ACTIVITY
This is a simple commandLine application that displays the activity of a particular activity of any github user account.
project-Link: https://roadmap.sh/projects/github-user-activity

### STEPS TO GET APPLICATION WORKING
- Run `npm link ` to create a link in your node directory on your computer
- commands accepted
--  `github-activity <username>`
--  `github-activity <username> --filter=PushEvent`: this command is to help filter github events based on types and the accepted types are `["PushEvent", "IssuesEvent", "WatchEvent"]`
