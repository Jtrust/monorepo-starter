import {defineConfig} from "dumi";

const fs = require('fs');
const path = require('path');

const generateAliases = () => {
  const packagesDir = path.resolve(__dirname, 'packages');
  const aliases:Record<string, string> = {};
  const packages = fs.readdirSync(packagesDir);

  packages.forEach((packageName: string) => {
    const packageJsonPath = path.join(packagesDir, packageName, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = require(packageJsonPath);
      const packageAlias = `${packageJson.name}`;
      aliases[packageAlias] = path.join(packagesDir, packageName, 'src');
    }
  });

  return aliases;
}

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'starter',
    footer: 'Powered by FE Team',
    rtl: true,
  },
  resolve: {
    atomDirs: [{ type: 'components', dir: 'packages' }],
  },
  monorepoRedirect: {
    srcDir: ['packages'],
  },
  alias: generateAliases(),
});

