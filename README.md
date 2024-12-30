# Auto PR Action

`auto-pr-action` is a GitHub Action designed to simplify pull request creation across branches with customizable options. Ideal for automation workflows, this action allows you to create pull requests with dynamic properties like labels, reviewers, assignees, and more. Easily configure inputs and run the action within GitHub workflows, enhancing productivity in managing pull requests directly from your CI/CD pipeline.

## Features

- **Configurable PR Properties**: Define the PR title, body, labels, reviewers, assignees, and milestones.
- **Branch Control**: Specify the source and destination branches for the pull request.
- **Customizable PR Drafts**: Optionally create PRs as drafts.
- **Supports Empty PRs**: Control whether PRs with no commits between branches are allowed.
- **Debug Logging**: Enable verbose logging for easy debugging and monitoring.

## Inputs

| Input              | Description                                                | Required | Default |
|--------------------|------------------------------------------------------------|----------|---------|
| `labels`           | Comma-separated list of labels to apply to the PR.         | No       | `""`    |
| `title`            | Title of the pull request.                                 | Yes      |         |
| `reviewers`        | Comma-separated list of reviewers.                         | No       | `""`    |
| `assignees`        | Comma-separated list of assignees.                         | No       | `""`    |
| `milestone`        | Milestone number to associate with the PR.                 | No       |         |
| `source_branch`    | Branch from which to create the pull request.              | Yes      |         |
| `destination_branch` | Branch into which to merge the pull request.             | Yes      |         |
| `repo-token`       | GitHub token for authentication.                           | Yes      |         |
| `allow-empty`   | Allow pull requests with no commits. (`true` or `false`)   | No       | `false` |
| `draft`         | Create the pull request as a draft. (`true` or `false`)    | No       | `false` |
| `debug`            | Enable verbose debug logging (`true` or `false`)           | No       | `false` |

## Outputs

| Output       | Description                                     |
|--------------|-------------------------------------------------|
| `pr_url`     | URL of the created pull request.                |
| `pr_number`  | Number of the created pull request.             |
| `pr_created` | Whether the pull request was successfully created (`true` or `false`). |

## Usage

Add this action to your GitHub workflow:

```yaml
name: Auto PR CI
on:
  push:
    branches:
      - main

jobs:
  create-pull-request:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Create Pull Request
        uses: offensive-vk/auto-pr-action@v7
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          title: "Automated Pull Request - it works!"
          source_branch: "feature-branch"
          destination_branch: "main"
          labels: "automation,enhancement"
          assignees: "vedansh"
          allow-empty: "false"
          draft: "false"
          debug: "true"
```

## Example Scenarios

- **Automate Release PRs**: Automatically create PRs from development branches to the release branch after tests.
- **Dynamic PR Descriptions**: Generate a PR body based on a markdown file.
- **PRs with Custom Labels and Reviewers**: Label PRs for categorization and assign reviewers for streamlined code reviews.

## Debugging

Set `debug` to `true` for detailed logging output, which helps in identifying any issues or verifying the inputs and PR properties.

## License

This project is licensed under the MIT License.

***

<p align="center">
  <i>&copy; <a href="https://github.com/offensive-vk/">Vedansh </a> 2023 - Present</i><br>
  <i>Licensed under <a href="https://github.com/offensive-vk/auto-pr-action/tree/master/LICENSE">MIT</a></i><br>
  <a href="https://github.com/TheHamsterBot"><img src="https://i.ibb.co/4KtpYxb/octocat-clean-mini.png" /></a><br>
  <kbd>Thanks for visiting :)</kbd>
</p>