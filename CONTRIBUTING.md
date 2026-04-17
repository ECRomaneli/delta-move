# Contributing to DeltaMove

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 12.0.0
- npm (included with Node.js)

### Setup

```sh
git clone https://github.com/ECRomaneli/delta-move.git
cd delta-move
npm install
```

### Project Structure

```
src/
  main.ts          # Library source code
tests/
  main.test.ts     # Jest test suite
dist/              # Build output (gitignored)
  main.js          # CommonJS module (npm)
  main.d.ts        # TypeScript declarations (npm)
  delta-move.min.js    # Minified UMD bundle (web/CDN)
  delta-move.min.js.map
```

## Development

### Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run tests with Jest |
| `npm run build` | Production build (lib + minified web) |
| `npm run build:dev` | Development build (lib + unminified web with source maps) |
| `npm run build:lib` | Build only the npm library (`tsc`) |
| `npm run build:web` | Build only the UMD web bundle (webpack) |
| `npm run clean` | Remove the `dist/` directory |

### Running Tests

```sh
npm test
```

All tests must pass before submitting a pull request. The test suite mocks `requestAnimationFrame` and `performance.now` to run deterministically in Node.js.

### Building

```sh
# Full production build
npm run build

# Development build (with source maps, no minification on web bundle)
npm run build:dev
```

The build generates two outputs:

- **npm library** — `dist/main.js` + `dist/main.d.ts` (CommonJS with TypeScript declarations)
- **Web bundle** — `dist/delta-move.min.js` (UMD, exposes the global `DeltaMove`)

## Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b my-feature`
3. Make your changes
4. Ensure all tests pass: `npm test`
5. Ensure the build succeeds: `npm run build`
6. Commit your changes with a clear message
7. Push to your fork and open a Pull Request

### Commit Messages

Use clear, descriptive commit messages. Examples:

- `Add ease-in-sine easing function`
- `Fix cancellation race condition on rapid ID reuse`
- `Update README with CDN usage example`

## Reporting Issues

- Use [GitHub Issues](https://github.com/ECRomaneli/delta-move/issues) to report bugs or suggest features
- Include a minimal reproduction case when reporting bugs
- Specify your Node.js version and environment (browser/Node.js)

## Code Style

- TypeScript strict mode is enabled
- No external runtime dependencies — keep the library zero-dependency
- Keep the bundle size minimal

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
