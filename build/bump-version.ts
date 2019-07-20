import { writeFileSync } from 'fs';
import { resolve } from 'path';

import manifestJson from '../manifest.json';
import packageJson from '../package.json';

const enum Bump {
  Major = 'major',
  Minor = 'minor',
  Patch = 'patch',
}

function argIsValid(bump: string): bump is Bump {
  return bump === Bump.Major || bump === Bump.Minor || bump === Bump.Patch;
}

function main(bump: string) {
  if (!argIsValid(bump)) {
    throw new Error(
      `The first argument to this script must be one of ${Bump.Major}, ${Bump.Minor} or ${Bump.Patch}. Got ${bump} instead.`,
    );
  }

  if (manifestJson.version !== packageJson.version) {
    throw new Error(
      `Version mismatch between package.json and manifest.json. Please correct this manually before continuing.
      
      package.json version: ${packageJson.version}
      manifest.json version: ${manifestJson.version}`,
    );
  }

  const { version } = manifestJson;

  // - is for 1.2.3-alpha or some such
  let [major, minor, patch] = version
    .split('-')[0]
    .split('.')
    .map(Number);

  switch (bump) {
    case Bump.Major:
      major++;
      minor = 0;
      patch = 0;
    case Bump.Minor:
      minor++;
      patch = 0;
    case Bump.Patch:
      patch++;
  }

  const newVersion = `${major}.${minor}.${patch}`;

  packageJson.version = newVersion;
  manifestJson.version = newVersion;

  writeFileSync(
    resolve(__dirname, '../package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf8',
  );
  writeFileSync(
    resolve(__dirname, '../manifest.json'),
    JSON.stringify(manifestJson, null, 2),
    'utf8',
  );

  console.log(`Bumped ${bump} version from ${version} to ${newVersion}`);
}

const [, , bump] = process.argv;

main(bump);
