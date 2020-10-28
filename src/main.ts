import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  const {
    payload: {pull_request}
  } = github.context;

  // Do nothing if its not a pr
  const isPR: boolean = Boolean(pull_request);
  if (!isPR) {
    console.log(
      'The event that triggered this action was not a pull request, skipping.'
    );
    return;
  }

  console.log(pull_request);

  if (pull_request?.milestone) {
    console.log('Milestone set, perfect!');
    return;
  }

  if (!pull_request || !pull_request.user) {
    console.log(
      'could not get PR object or PR object did not have user object'
    );
    return undefined;
  }

  if (pull_request.user !== 'Renovate') {
    core.setFailed('Please set the milestone!');
  }
}

run().catch(err => {
  core.setFailed(err.message);
});
