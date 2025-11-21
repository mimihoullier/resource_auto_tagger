日本語で簡潔かつ丁寧に回答してください

# Repository Guidelines

## Project Structure & Modules
- **Infrastructure**: `lib/resource-auto-tag-cdk-stack.js` defines the CDK stack, buckets, custom resources, scheduler, and IAM policies.
- **App entrypoint**: `bin/resource-auto-tag-cdk.js` configures the CDK app and stack.
- **Lambda handlers**: `handlers/lambda-s3-loader/index.js` seeds the mapping file; `handlers/resource-auto-tag/index.mjs` applies tags using Resource Explorer, CloudTrail, SSM, and Tagging APIs.
- **Tests**: `test/` contains Jest specs (currently placeholders); add new specs here.
- **Config**: `cdk.json` holds CDK context; `package.json`/`package-lock.json` control dependencies; handler-specific `package.json` lives under `handlers/resource-auto-tag/`.

## Build, Test, and Development Commands
```bash
npm install               # Install root dependencies
npm test                  # Run Jest unit tests
npm run build             # No-op placeholder (CDK JS app)
npx cdk synth             # Synthesize the CloudFormation template
npx cdk deploy            # Deploy stack to the configured AWS account/region
```
Use `AWS_PROFILE`/`AWS_REGION` or `CDK_DEFAULT_ACCOUNT`/`CDK_DEFAULT_REGION` to target environments.

## Coding Style & Naming
- JavaScript/TypeScript style with 2-space indentation; prefer `const`/`let`, arrow functions, and semicolons.
- Keep CDK constructs PascalCase (e.g., `ResourceAutoTagCdkStack`), lambda file names kebab-case, and environment variable keys SCREAMING_SNAKE_CASE.
- Handlers: `index.mjs` uses ES modules; keep imports explicit and avoid mixing `require` in the same file.
- Match existing logging (limited, concise `console.log`/`console.error`) and keep AWS SDK v3 clients singleton-per-file.

## Testing Guidelines
- Framework: Jest (`jest.config.js` sets `testEnvironment: 'node'`).
- Place unit tests in `test/` with `*.test.js` naming; prefer fast, offline tests that mock AWS SDK clients.
- Add coverage for new CDK constructs (assert synthesized template) and handler logic (mock Resource Explorer, CloudTrail, S3, Tagging API responses).
- Run `npm test` before any PR; include expected results in the PR description.

## Commit & Pull Request Guidelines
- Commits: use short, imperative subjects (e.g., `Add tagging coverage for EC2`); group related changes; avoid bundling unrelated refactors.
- PRs: include purpose, architecture impact (CDK resources/IAM changes), test results, and links to issues. Add screenshots/log snippets if behavior changes affect tagging outputs or deployment.

## Security & Configuration
- Do not commit AWS credentials or mapping files with sensitive data. Rely on environment variables and AWS-backed credentials (`aws sso login`/`aws configure sso`).
- S3 bucket names and stack IDs must remain unique per account/region; clean up test deployments to avoid residual resources.
- Validate IAM policy changes with least-privilege in mind; keep `cdk-nag` considerations in mind for future rule additions.
