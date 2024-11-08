# Auto PR Action

`auto-pr-action` is a GitHub Agdg                 | No       | `""`    |
| `milestone`        | Milestone number to associate with the PR.                 | No       |         |
| `source_branch`    | Branch from which to create the pull request.              | Yes      |         |
| `destination_branch` | Branch into which to merge the pull request.             | Yes      |         |
| `repo-token`       | GitHub token for authentication.                           | Yes      |         |
| `pr-allow-empty`   | Allow pull requests with no commits. (`true` or `false`)   | No       | `false` |
| `pr-draft`         | Create the pull request as a draft. (`true` or `false`)    | No       | `false` |
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
name: Auto PR Workflow
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
        uses: offensive-vk/auto-pr-action@v5
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          title: "Automated Pull Request"
          source_branch: "feature-branch"
          destination_branch: "main"
          labels: "automation,enhancement"
          assignees: "vedansh"
          pr-allow-empty: "false"
          pr-draft: "false"
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
