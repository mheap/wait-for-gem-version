#!/usr/bin/env node

const wait = require(".");
const debug = require("debug")("wait-for-gem-version:cli");

const argv = require("yargs").command(
  "$0 <gem> <expectedVersion>",
  "",
  (yargs) => {
    yargs.positional("gem", {
      describe: "Name of the gem to search for",
    });
    yargs.positional("expectedVersion", {
      describe: "Version to search for",
    });
    yargs.option("interval", {
      describe: "Search every <interval> seconds",
    });
    yargs.option("max-duration", {
      describe: "Wait for <max-duration> seconds maximum",
    });
  },
  async (argv) => {
    const { gem, expectedVersion, interval, maxDuration } = argv;
    debug(
      `Waiting for ${gem} version ${expectedVersion} [Interval: ${interval}, Max Duration: ${maxDuration}]`
    );
    const r = await wait(gem, expectedVersion, interval, maxDuration);

    if (!r) {
      debug(`Version ${expectedVersion} not found`);
      process.exit(1);
    }

    debug(`Version ${expectedVersion} found`);
  }
).argv;
