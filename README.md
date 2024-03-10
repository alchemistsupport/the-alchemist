# Alchemist Bar

### Built With
* [Next 13](https://nextjs.org/blog/next-13)
* [Typescript](https://www.typescriptlang.org/)
* [Tailwind](https://tailwindcss.com/)

### Inspired by
* [Feature Sliced Architecture](https://feature-sliced.design/en/)

### Commits format

Commitlint is used to check if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

In general the pattern mostly looks like this:

```sh
type(scope?): subject
```

Real world examples can look like this:

```
chore: run tests on travis ci
```

```
fix(stepper): update button actions
```

```
feat(passenger): add comment section
```

Common types according to [commitlint-config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- build
- ci
- chore
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test
