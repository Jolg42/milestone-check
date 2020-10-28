import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  const {
    payload: {pull_request, issue}
  } = github.context;

  console.log(github.context);

  // Do nothing if its not a pr or issue
  const isIssue: boolean = Boolean(issue);
  const isPR: boolean = Boolean(pull_request);
  if (!isIssue && !isPR) {
    console.log(
      'The event that triggered this action was not an issue or pull request, skipping.'
    );
    return;
  }

  console.log(pull_request);
  console.log(issue);

  const milestone = issue?.milestone ?? pull_request?.milestone;
  console.log(milestone);
  if (milestone) {
    console.log('Milestone set, perfect!');
    return;
  }

  const username = issue?.user?.login ?? pull_request?.user?.login;
  console.log(username);
  if (!username) {
    throw Error('Could not get username');
  }

  // Only ask to set the milestone if it's not renovate
  if (username !== 'renovate-bot') {
    core.setFailed('Please set the milestone!');
  }
}

run().catch(err => {
  core.setFailed(err.message);
});
