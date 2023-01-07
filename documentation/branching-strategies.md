# Branching Strategies

A common flow for projects is to start out using a [Main Branch Workflow](#main-branch-workflow) and when needed (QA, Version freezes, etc) shift into a [Develop Branch Workflow](#develop-branch-workflow). Read their following respective sections to learn more about each flow and when and how to use them.

## Main Branch Workflow

In this branching strategy the main branch always contains production-ready code and all other branches will start from and merge back into the main branch. This is a strategy popularized by [github flow](https://githubflow.github.io/) that is well suited for small teams, CI/CD, & web projects. This workflow is especially well suited for the start of projects on small teams.

### Main Branch Workflow Diagram

![Github Flow Diagram](/documentation/assets/github-flow-diagram.svg)

### Limitations of the Main Branch Workflow

- Unable to support multiple versions of code in production at the same time.

- Lack of a dedicated development branch makes makes it more susceptible to bugs in production.

## Develop Branch Workflow

Another very popular branching strategy is commonly know as: [gitflow](https://nvie.com/posts/a-successful-git-branching-model/).

The key difference in this workflow is that all new work should be performed on a `develop` branch that is itself a branch off of the main branch. In this flow all new branches (features, bugs, etc) start from the develop branch and all PRs should be merged back into that same develop branch (an exception could be when a hotfix is needed on main).

### Develop Branch Workflow Diagram

![Git Flow Diagram](/documentation/assets/git-flow-diagram.svg)

Drawbacks to the Develop Branch Workflow:

- It can overcomplicate & slow the development process & release cycle (recommended reading [Note of reflection](https://nvie.com/posts/a-successful-git-branching-model/) by the creator of this workflow).
