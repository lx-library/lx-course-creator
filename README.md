# Git Workflow Guide

## Introduction

This document provides a quick guide on using Git for version control, focusing on common commands used in daily development tasks. It covers pulling from the main branch, changing branches, adding files, committing changes, and pushing to a branch.

### Git Basics

Git is a distributed version control system that allows multiple developers to collaborate on a project. It tracks changes to the codebase and helps manage different versions of the project.

## Git Commands

### 1. Pulling from the Main Branch

Before starting new work, it's essential to have the latest changes from the main branch. To pull changes:

```bash
git pull origin main
```

### 2. Changing Branches

To switch to an existing branch:

```bash
git switch <branch_name>
```

If you forgot to switch branches before starting new work and want to create a new branch and switch to it simultaneously:

```bash
git switch -c <new_branch_name>
```

### 3. Adding Files

Add all modified and untracked files to the staging area:

```bash
git add .
```

### 4. Committing Changes

Commit the staged changes with a descriptive message:

```bash
git commit -m "Your descriptive commit message here"
```

### 5. Pushing to a Branch

Push the committed changes to the current branch:

```bash
git push origin <branch_name>
```


For more advanced Git features and detailed documentation, refer to the official [Git documentation](https://git-scm.com/doc).

