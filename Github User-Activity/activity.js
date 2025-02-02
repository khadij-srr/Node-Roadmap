const https = require('https');

// fetching GitHub activity
function fetch(username, callback) {
    
    const url = `https://api.github.com/users/${username}/events`;
    const opt = { headers: {'User-Agent': 'MyGitHubCLI', } };
    
    https.get(url, opt, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk;});
        res.on('end', () => {
            if (res.statusCode === 200) {
                try {
                    const events = JSON.parse(data);
                    callback(null, events);
                } catch (err) {
                    callback(`Could not parse response: ${err.message}`, null);
                }
            } else {
                callback(`Error: could not fetch data for user "${username}". Status Code: ${res.statusCode}`, null);
            }
        });
    }).on('error', (err) => { callback(`Error fetching data: ${err.message}`, null);});
}

// displaying GitHub activity
function display(events, username) {
    
    if (!events || events.length === 0) {
        console.log(`No recent activity for ${username}.`);
        return;
    }
    console.log(`Activity for ${username}:`);
    for (let i = 0; i < Math.min(events.length, 5); i++) {
        const event = events[i];
        let action = '';

        if (event.type === 'PushEvent') {
            action = `Pushed ${event.payload.commits.length} commits to ${event.repo.name}`;
        } else if (event.type === 'IssuesEvent') {
            action = `Opened an issue in ${event.repo.name}`;
        } else if (event.type === 'WatchEvent') {
            action = `Starred ${event.repo.name}`;
        } else if (event.type === 'ForkEvent') {
            action = `Forked ${event.repo.name}`;
        } else if (event.type === 'PullRequestEvent') {
            action = `Opened a PR in ${event.repo.name}`;
        } else {
            action = `Did ${event.type} in ${event.repo.name}`;
        }

        console.log(`- ${action}`);
    }
}

// handling command-line arguments
function main() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log('Usage: node activity.js <GitHubUsername>');
        process.exit(1);
    }

    const username = args[0];

    fetch(username, (err, events) => {
        if (err) {
            console.error(err);
            return;
        }
        display(events, username);
    });
}

main();