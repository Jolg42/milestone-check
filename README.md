# PR Milestone Check something

![Test Milestone Check](https://github.com/Jolg42/milestone-check/workflows/Test%20Milestone%20Check/badge.svg)

An action for checking if PR have a milestone.

# Usage

See [action.yml](action.yml)

```yaml
on:
  issues:
    types: [opened]
  pull_request:
    types: [opened]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: Jolg42/pr-milestone-check@v0.0.1
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
