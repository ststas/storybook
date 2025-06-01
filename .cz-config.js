module.exports = {
  types: [
    { value: "feat", name: "feat:     A new feature" },
    { value: "fix", name: "fix:      A bug fix" },
    { value: "docs", name: "docs:     Documentation changes" },
    {
      value: "style",
      name: "style:    Code style changes (formatting, missing semi colons, etc)",
    },
    {
      value: "refactor",
      name: "refactor: Code refactoring (no functional changes)",
    },
    { value: "perf", name: "perf:     Performance improvements" },
    { value: "test", name: "test:     Adding or updating tests" },
    { value: "chore", name: "chore:    Maintenance or tooling changes" },
  ],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
};
