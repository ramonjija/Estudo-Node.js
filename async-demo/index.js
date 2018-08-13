console.log('Before');
getUser(1, getRepo);
console.log('After');


function getRepo(user) {
    console.log('Got the username', user);
    getRepositories(user.gitHubUsername, getCmts);
}

function getCmts(repos) {
    console.log('Got the repositories', repos);
    getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
    console.log('Got the commits', commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading data from database...');
        callback({ id: id, gitHubUsername: 'ramonjija'});
    }, 2000);
}

function getRepositories(userName, callback) {
    setTimeout(() => {
        console.log('Getting GitHub Repos from user', userName);
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repositorie, callback) {
    setTimeout(() => {
        console.log('Getting commits from repo', repositorie);
        callback(['commit1','commit2','commit3']);
    }, 2000)
}