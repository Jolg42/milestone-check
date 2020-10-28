import * as core from '@actions/core';
import * as github from '@actions/github';

import {WebhookPayload} from '@actions/github/lib/interfaces';

interface Payload extends WebhookPayload {
  // eslint-disable-next-line camelcase
  pull_request?: {
    [key: string]: any;
    number: number;
    html_url?: string;
    body?: string;
    milestone?: any;
  };
  issue?: {
    [key: string]: any;
    number: number;
    html_url?: string;
    body?: string;
    milestone?: any;
  };
}

async function run() {
  const {
    payload: {pull_request, issue}
  } = github.context;

  // Do nothing if its not a pr or issue
  const isIssue: boolean = Boolean(issue);
  const isPR: boolean = Boolean(pull_request);
  if (!isIssue && !isPR) {
    console.log(
      'The event that triggered this action was not a pull request, skipping.'
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
