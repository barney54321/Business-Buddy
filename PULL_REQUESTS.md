# Pull Requests

(Based on the Node.js PR documentation)

There are two fundamental components of the Pull Request process: one concrete
and technical, and one more process oriented. The concrete and technical
component involves the specific details of setting up your local environment
so that you can make the actual changes. This is where we will start.

* [Setting up your local environment](#setting-up-your-local-environment)
  * [Step 1: Fork](#step-1-fork)
  * [Step 2: Branch](#step-2-branch)
* [The Process of Making Changes](#the-process-of-making-changes)
  * [Step 3: Code](#step-3-code)
  * [Step 4: Commit](#step-4-commit)
    * [Commit message guidelines](#commit-message-guidelines)
  * [Step 5: Rebase](#step-5-rebase)
  * [Step 6: Push](#step-6-push)
  * [Step 7: Opening the Pull Request](#step-7-opening-the-pull-request)
  * [Step 8: Discuss and Update](#step-8-discuss-and-update)
    * [Approval and Request Changes Workflow](#approval-and-request-changes-workflow)
* [Reviewing Pull Requests](#reviewing-pull-requests)
  * [Review a bit at a time](#review-a-bit-at-a-time)
  * [Be aware of the person behind the code](#be-aware-of-the-person-behind-the-code)
  * [Respect the minimum wait time for comments](#respect-the-minimum-wait-time-for-comments)
  * [Abandoned or Stalled Pull Requests](#abandoned-or-stalled-pull-requests)
  * [Approving a change](#approving-a-change)
  * [Accept that there are different opinions about what belongs in Business Buddy](#accept-that-there-are-different-opinions-about-what-belongs-in-business-buddy)
* [Notes](#notes)
  * [Getting Approvals for your Pull Request](#getting-approvals-for-your-pull-request)
  * [Waiting Until the Pull Request Gets Landed](#waiting-until-the-pull-request-gets-landed)

## Setting up your local environment

To get started, you will need to have `git` installed locally.

Depending on your environment you might want to grab IDE specific settings from
[IDE configs](https://github.com/nodejs/node-code-ide-configs).

Once you have `git` and are sure you have all of the necessary dependencies,
it's time to create a fork.

### Step 1: Fork

Fork the project [on GitHub](https://github.com/barney54321/Business-Buddy) and clone your fork
locally.

Configure `git` so that it knows who you are:

```text
$ git config user.name "J. Random User"
$ git config user.email "j.random.user@example.com"
```

You can use any name/email address you prefer here. We only use the
metadata generated by `git` using this configuration for properly attributing
your changes to you in the `AUTHORS` file and the changelog.

If you would like for the GitHub UI to link the commit to your account
and award you the `Contributor` label after the changes have been merged,
make sure this local email is also added to your
[GitHub email list](https://github.com/settings/emails).

### Step 2: Branch

As a best practice to keep your development environment as organized as
possible, create local branches to work within. These should also be created
directly off of the `master` branch.

```text
$ git checkout -b my-branch -t upstream/master
```

## The Process of Making Changes

### Step 3: Code

The vast majority of Pull Requests opened against the `Business Buddy`
repository includes changes to one or more of the following:

* the React.js code contained in the `frontend` directory
* the JavaScript code contained in the `backend` directory

Any documentation you write (including code comments and API documentation)
should follow the [Style Guide](https://google.github.io/styleguide/jsguide.html). 

### Step 4: Commit

It is a best practice to keep your changes as logically grouped
as possible within individual commits. There is no limit to the number of
commits any single Pull Request may have, and many contributors find it easier
to review changes that are split across multiple commits.

```text
$ git add my/changed/files
$ git commit
```

Multiple commits often get squashed when they are landed. See the
notes about [commit squashing](#commit-squashing).

#### Commit message guidelines

A good commit message should describe what changed and why.

1. The first line should:
   * contain a short description of the change (preferably 50 characters or
     less, and no more than 72 characters)
   * be entirely in lowercase with the exception of proper nouns, acronyms, and
   the words that refer to code, like function/variable names
   * be prefixed with the name of the changed subsystem and start with an
   imperative verb. Check the output of `git log --oneline files/you/changed` to
   find out what subsystems your changes touch.

   Examples:
   * `net: add localAddress and localPort to Socket`
   * `src: fix typos in async_wrap.h`

2. Keep the second line blank.
3. Wrap all other lines at 72 columns (except for long URLs).

4. If your patch fixes an open issue, you can add a reference to it at the end
   of the log. Use the `Fixes:` prefix and the full issue URL. For other
   references use `Refs:`.

   Examples:
   * `Fixes: https://github.com/nodejs/node/issues/1337`
   * `Refs: https://eslint.org/docs/rules/space-in-parens.html`
   * `Refs: https://github.com/nodejs/node/pull/3615`

5. If your commit introduces a breaking change (`semver-major`), it should
contain an explanation about the reason of the breaking change, which
situation would trigger the breaking change and what is the exact change.

Sample complete commit message:

```text
subsystem: explain the commit in one line

The body of the commit message should be one or more paragraphs, explaining
things in more detail. Please word-wrap to keep columns to 72 characters or
less.

Fixes: https://github.com/nodejs/node/issues/1337
Refs: https://eslint.org/docs/rules/space-in-parens.html
```

If you are new to contributing to Business Buddy, please try to do your best at
conforming to these guidelines, but do not worry if you get something wrong.
One of the existing contributors will help get things situated and the
contributor landing the Pull Request will ensure that everything follows
the project guidelines.

### Step 5: Rebase

As a best practice, once you have committed your changes, it is a good idea
to use `git rebase` (not `git merge`) to synchronize your work with the main
repository.

```text
$ git fetch upstream
$ git rebase upstream/master
```

This ensures that your working branch has the latest changes from `Business Buddy`
master.

### Step 6: Push

Once you are sure your commits are ready to go, with passing tests and linting,
begin the process of opening a Pull Request by pushing your working branch to
your fork on GitHub.

```text
$ git push origin my-branch
```

### Step 7: Opening the Pull Request

From within GitHub, opening a new Pull Request will present you with a text box
that needs to be filled out. In it, explain what the request changes, and what 
issue it is associated with.

### Step 8: Discuss and update

You will probably get feedback or requests for changes to your Pull Request.
This is a big part of the submission process so don't be discouraged! Some
contributors may sign off on the Pull Request right away, others may have
more detailed comments or feedback. This is a necessary part of the process
in order to evaluate whether the changes are correct and necessary.

To make changes to an existing Pull Request, make the changes to your local
branch, add a new commit with those changes, and push those to your fork.
GitHub will automatically update the Pull Request.

```text
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

It is also frequently necessary to synchronize your Pull Request with other
changes that have landed in `master` by using `git rebase`:

```text
$ git fetch --all
$ git rebase upstream/master
$ git push --force-with-lease origin my-branch
```

If you happen to make a mistake in any of your commits, do not worry. You can
amend the last commit (for example if you want to change the commit log).

```text
$ git add any/changed/files
$ git commit --amend
$ git push --force-with-lease origin my-branch
```

There are a number of more advanced mechanisms for managing commits using
`git rebase` that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the Pull Request to ping reviewers if you are
awaiting an answer on something. If you encounter words or acronyms that
seem unfamiliar, refer to this
[glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### Approval and Request Changes Workflow

All Pull Requests require "sign off" in order to land. Whenever a contributor
reviews a Pull Request they may find specific details that they would like to
see changed or fixed. These may be as simple as fixing a typo, or may involve
substantive changes to the code you have written. While such requests are
intended to be helpful, they may come across as abrupt or unhelpful, especially
requests to change things that do not include concrete suggestions on *how* to
change them.

Try not to be discouraged. If you feel that a particular review is unfair,
say so, or contact one of the other contributors in the project and seek their
input. Often such comments are the result of the reviewer having only taken a
short amount of time to review and are not ill-intended. Such issues can often
be resolved with a bit of patience. That said, reviewers should be expected to
be helpful in their feedback, and feedback that is simply vague, dismissive and
unhelpful is likely safe to ignore.

## Reviewing Pull Requests

All Business Buddy contributors who choose to review and provide feedback on Pull
Requests have a responsibility to both the project and the individual making the
contribution. Reviews and feedback must be helpful, insightful, and geared
towards improving the contribution as opposed to simply blocking it. If there
are reasons why you feel the PR should not land, explain what those are. Do not
expect to be able to block a Pull Request from advancing simply because you say
"No" without giving an explanation. Be open to having your mind changed. Be open
to working with the contributor to make the Pull Request better.

When reviewing a Pull Request, the primary goals are for the codebase to improve
and for the person submitting the request to succeed. Even if a Pull Request
does not land, the submitters should come away from the experience feeling like
their effort was not wasted or unappreciated. Every Pull Request from a new
contributor is an opportunity to grow the community.

### Review a bit at a time.

Do not overwhelm new contributors.

It is tempting to micro-optimize and make everything about relative performance,
perfect grammar, or exact style matches. Do not succumb to that temptation.

Focus first on the most significant aspects of the change:

1. Does this change make sense for Business Buddy?
2. Does this change make Business Buddy better, even if only incrementally?
3. Are there clear bugs or larger scale issues that need attending to?
4. Is the commit message readable and correct? If it contains a breaking change
   is it clear enough?

When changes are necessary, *request* them, do not *demand* them, and do not
assume that the submitter already knows how to add a test or run a benchmark.

Specific performance optimization techniques, coding styles and conventions
change over time. The first impression you give to a new contributor never does.

### Be aware of the person behind the code

Be aware that *how* you communicate requests and reviews in your feedback can
have a significant impact on the success of the Pull Request. Yes, we may land
a particular change that makes Business Buddy better, but the individual might just
not want to have anything to do with Business Buddy ever again. The goal is not just
having good code.

### Respect the minimum wait time for comments

There is a minimum waiting time which we try to respect for non-trivial
changes, so that people who may have important input in such a distributed
project are able to respond.

For non-trivial changes, Pull Requests must be left open for at least 48 hours.
In most cases, when the PR is relatively small and focused on a narrow set of
changes, that will provide more than enough time to adequately review. Sometimes
changes take far longer to review, or need more specialized review from subject
matter experts. When in doubt, do not rush.

Trivial changes, typically limited to small formatting changes or fixes to
documentation, may be landed within the minimum 48 hour window.

### Abandoned or Stalled Pull Requests

If a Pull Request appears to be abandoned or stalled, it is polite to first
check with the contributor to see if they intend to continue the work before
checking if they would mind if you took it over (especially if it just has
nits left). When doing so, it is courteous to give the original contributor
credit for the work they started (either by preserving their name and email
address in the commit log, or by using an `Author:` meta-data tag in the
commit.

### Approving a change

Any Business Buddy core Collaborator (any GitHub user with commit rights in the
`Business Buddy` repository) is authorized to approve any other contributor's
work. Collaborators are not permitted to approve their own Pull Requests.

Collaborators indicate that they have reviewed and approve of the changes in
a Pull Request either by using GitHub's Approval Workflow, which is preferred,
or by leaving an `LGTM` ("Looks Good To Me") comment.

When explicitly using the "Changes requested" component of the GitHub Approval
Workflow, show empathy. That is, do not be rude or abrupt with your feedback
and offer concrete suggestions for improvement, if possible. If you're not
sure *how* a particular change can be improved, say so.

Most importantly, after leaving such requests, it is courteous to make yourself
available later to check whether your comments have been addressed.

If you see that requested changes have been made, you can clear another
collaborator's `Changes requested` review.

Change requests that are vague, dismissive, or unconstructive may also be
dismissed if requests for greater clarification go unanswered within a
reasonable period of time.

If you do not believe that the Pull Request should land at all, use
`Changes requested` to indicate that you are considering some of your comments
to block the PR from landing. When doing so, explain *why* you believe the
Pull Request should not land along with an explanation of what may be an
acceptable alternative course, if any.

### Accept that there are different opinions about what belongs in Business Buddy

Opinions on this vary, even among the members of the founding team.

Also, functionality that either cannot be implemented outside of core in any
reasonable way, or only with significant pain.

It is not uncommon for contributors to suggest new features they feel would
make Business Buddy better. These may or may not make sense to add, but as with all
changes, be courteous in how you communicate your stance on these.

## Notes

### Getting Approvals for Your Pull Request

A Pull Request is approved either by saying LGTM, which stands for
"Looks Good To Me", or by using GitHub's Approve button.
GitHub's Pull Request review feature can be used during the process.
For more information, check out
[the video tutorial](https://www.youtube.com/watch?v=HW0RPaJqm4g)
or [the official documentation](https://help.github.com/articles/reviewing-changes-in-pull-requests/).

After you push new changes to your branch, you need to get
approval for these new changes again, even if GitHub shows "Approved"
because the reviewers have hit the buttons before.

### Waiting Until the Pull Request Gets Landed

A Pull Request needs to stay open for at least 48 hours from when it is
submitted, even after it gets approved. This is to make sure
that everyone has a chance to weigh in. If the changes are trivial,
collaborators may decide it doesn't need to wait. A Pull Request may well take
longer to be merged in.