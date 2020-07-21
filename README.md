# wait-for-gem-version

A CLI tool that polls the Rubygems API until a specific version is available.

## Usage

To check every 20 seconds, with a maximum of 2 minutes

```
npx wait-for-gem-version GEM_NAME 1.2.3 --interval 20 --max-duration 120
```

If the version is successfully found, the CLI will output with an exit code of `0`. Otherwise, the exit code will be `1` to indicate an error

## Debugging

This CLI uses the `debug` module to enable debug messages:

```
DEBUG=wait-for-gem-version npx wait-for-gem-version GEM_NAME 1.2.3 --interval 20 --max-duration 120
```
