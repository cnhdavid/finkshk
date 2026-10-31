import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), "..");

const allowedLicenses = new Set([
  "0BSD",
  "Apache-2.0",
  "BlueOak-1.0.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "CC0-1.0",
  "ISC",
  "MIT",
  "OFL-1.1",
  "PostgreSQL",
  "Python-2.0",
  "Unlicense",
]);

const approvedExceptions = [
  { pattern: /^@img\/sharp-/, license: "LGPL-3.0-or-later" },
  { pattern: /^axe-core$/, license: "MPL-2.0" },
  { pattern: /^caniuse-lite$/, license: "CC-BY-4.0" },
];

const isPermitted = (packageName, expression) => {
  const licenses = expression.replace(/[()]/g, "");
  return licenses
    .split(/\s+OR\s+/i)
    .some((alternative) =>
      alternative
        .split(/\s+AND\s+/i)
        .every(
          (license) =>
            allowedLicenses.has(license) ||
            approvedExceptions.some(
              (exception) =>
                exception.license === license &&
                exception.pattern.test(packageName),
            ),
        ),
    );
};

const readNpmPackages = () => {
  const output = execSync(
    "npx --yes license-checker@25.0.1 --json --excludePrivatePackages",
    {
      cwd: join(rootDirectory, "web"),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 64 * 1024 * 1024,
    },
  );
  return Object.entries(JSON.parse(output)).map(([id, details]) => ({
    source: "npm",
    name: id.slice(0, id.lastIndexOf("@")),
    version: id.slice(id.lastIndexOf("@") + 1),
    license: [details.licenses].flat().join(" OR "),
  }));
};

const readNuspecLicense = (name, version) => {
  const packagesDirectory =
    process.env.NUGET_PACKAGES ?? join(homedir(), ".nuget", "packages");
  const lowerName = name.toLowerCase();
  const nuspecPath = join(
    packagesDirectory,
    lowerName,
    version.toLowerCase(),
    `${lowerName}.nuspec`,
  );
  if (!existsSync(nuspecPath)) {
    return "NOT-RESTORED";
  }
  const match = readFileSync(nuspecPath, "utf8").match(
    /<license type="expression">([^<]+)<\/license>/,
  );
  return match?.[1] ?? "UNKNOWN";
};

const readNugetPackages = () => {
  const output = execSync(
    "dotnet list Fink.slnx package --include-transitive --format json",
    {
      cwd: join(rootDirectory, "api"),
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    },
  );
  const packages = new Map();
  for (const project of JSON.parse(output).projects) {
    for (const framework of project.frameworks ?? []) {
      const references = [
        ...(framework.topLevelPackages ?? []),
        ...(framework.transitivePackages ?? []),
      ];
      for (const { id, resolvedVersion } of references) {
        packages.set(`${id}@${resolvedVersion}`, {
          source: "nuget",
          name: id,
          version: resolvedVersion,
          license: readNuspecLicense(id, resolvedVersion),
        });
      }
    }
  }
  return [...packages.values()];
};

const allPackages = [...readNpmPackages(), ...readNugetPackages()];
const violations = allPackages.filter(
  ({ name, license }) => !isPermitted(name, license),
);

for (const { source, name, version, license } of violations) {
  console.error(`${source}: ${name}@${version} -> ${license}`);
}

console.log(
  `${allPackages.length} packages checked, ${violations.length} not permitted`,
);
process.exitCode = violations.length > 0 ? 1 : 0;
