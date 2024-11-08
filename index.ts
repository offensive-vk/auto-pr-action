import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';

async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token', { required: true });
    const octokit = github.getOctokit(token);
    const context = github.context;

    // Input collection with defaults and debug options
    const title = core.getInput('title', { required: true });
    const bodyPath = core.getInput('body_path') || '';
    const labels = core.getInput('labels').split(',').map(label => label.trim()).filter(label => label);
    const reviewers = core.getInput('reviewers').split(',').map(reviewer => reviewer.trim()).filter(reviewer => reviewer);
    const assignees = core.getInput('assignees').split(',').map(assignee => assignee.trim()).filter(assignee => assignee);
    const milestone = core.getInput('milestone');
    const sourceBranch = core.getInput('source_branch');
    const destinationBranch = core.getInput('destination_branch', { required: true });
    const allowEmpty = core.getBooleanInput('allow-empty');
    const draft = core.getBooleanInput('draft');
    const debug = core.getBooleanInput('debug');
    const body = core.getInput('body') || '';
    if (debug) core.info(`Inputs: ${JSON.stringify({ title, labels, reviewers, assignees, milestone, sourceBranch, destinationBranch, allowEmpty, draft })}`);

    // Read PR body from file if provided
    let bodyContent = '';
    if (bodyPath) {
      try {
        bodyContent = fs.readFileSync(bodyPath, 'utf8');
      } catch (error: any) {
        core.warning(`Could not read file at ${bodyPath}: ${error.message}`);
      }
    }

    const owner = context.repo.owner;
    const repo = context.repo.repo;

    // Check for commits in the source branch
    const commits = await octokit.rest.repos.compareCommits({
      owner,
      repo,
      base: destinationBranch,
      head: sourceBranch
    });

    if (commits.data.commits.length === 0 && !allowEmpty) {
      core.setOutput('pr_created', 'false');
      core.info('No changes to create a PR.');
      return;
    }

    // Create the pull request
    const pr = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      head: sourceBranch,
      base: destinationBranch,
      body,
      draft
    });

    core.setOutput('pr_url', pr.data.html_url);
    core.setOutput('pr_number', pr.data.number.toString());
    core.setOutput('pr_created', 'true');

    // Apply labels, assignees, reviewers, and milestone if specified
    if (labels.length > 0) await octokit.rest.issues.addLabels({ owner, repo, issue_number: pr.data.number, labels });
    if (assignees.length > 0) await octokit.rest.issues.addAssignees({ owner, repo, issue_number: pr.data.number, assignees });
    if (reviewers.length > 0) await octokit.rest.pulls.requestReviewers({ owner, repo, pull_number: pr.data.number, reviewers });
    if (milestone) await octokit.rest.issues.update({ owner, repo, issue_number: pr.data.number, milestone: Number(milestone) });

    core.info(`Pull request created: ${pr.data.html_url}`);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
