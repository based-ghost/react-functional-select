# react-functional-select

This lightweight package delivers ultimate performance for complex dropdown/select web component scenarios - it effortlessy handles searching, scrolling and keying even when working with data sets numbering in the tens of thousandes. It is powered by [react-window](https://github.com/bvaughn/react-window) (for data virtualization) and [styled-components](https://www.styled-components.com/) (for flexible, performant styling). In addition, it is built entirely using `React Hooks` and `FunctionComponents`.

While raw performance and minimal package size were the primary objectives, it is built with an advanced API that should cover the vast majority of use-cases. The API's functionality was largely inspired by [react-select](https://github.com/JedWatson/react-select), which is one of the best examples you will find of a flexible and complete API designed to handle a very specific, and usually painful, problem that web developers encounter. Essentially, my aim was to narrow the API's focus down to critical/common/performance pieces of functionality - using a functional approach that allowed for low-code, high-performance solutions to these use-cases.

## Live Examples (With Source Code)

- [Storybook demos](https://based-ghost.github.io/react-functional-select/index.html?path=/story/react-functional-select--basic)
- [Source code for stories](./src/__stories__)

## Installation (Including Peer Dependencies)

```bash
# npm
npm i react-window react-styled-components polished react-functional-select

# Yarn
yarn add react-window react-styled-components polished react-functional-select
```

## TODO: hook up test-runner and scripts; finish writing unit tests leveraging `@testing-library/react` framework

## TODO: complete documentation for props/api

## TODO: decide on a linting configuration - have not found a viable option when it comes to formatting FunctionComponents and hooks..