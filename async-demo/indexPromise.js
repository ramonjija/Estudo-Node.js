
//Promise-based approach
// console.log('Before');
// getUser(1)
//   .then(user => getRepositories(user))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log('Commit', commits))
//   .catch(err => console.log('Error', err));
// console.log('After');


//Async and Await approach
async function DisplayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log('Commits:', commits);
  }
  catch(err) {
    console.log('Error:', err.message);
  }
}
DisplayCommits();

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'ramonjija' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API for Repos...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API for Commits...');
      resolve(['commit1', 'commit2', 'commit3']);
    }, 2000);
  });
}