const fetch = require("node-fetch");
const debug = require("debug")("wait-for-gem-version:fetcher");

const waitForVersion = async (gem, expectedVersion, waitTime, maxWait) => {
  maxWait = maxWait || 60;
  const finalDate = Date.now() + (maxWait - 1) * 1000;

  do {
    const version = await fetchVersion(gem);

    debug(`Found: ${version}`);

    if (version == expectedVersion) {
      return true;
    }

    // Sleep so that we don't hit the API too often
    await new Promise((resolve) => {
      setTimeout(resolve, waitTime * 1000);
    });
  } while (Date.now() <= finalDate);

  return false;
};

const fetchVersion = async (gem) => {
  const res = await fetch(
    `https://rubygems.org/api/v1/versions/${gem}/latest.json`
  );
  const json = await res.json();

  return json.version;
};

module.exports = waitForVersion;
