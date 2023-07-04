import { type ConfigEnv } from 'vite'
import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'
import manifestJson from './manifest.json'

const { version } = packageJson

const icons = {
  16: 'icons/icon16.png',
  32: 'icons/icon32.png',
  48: 'icons/icon48.png',
  128: 'icons/icon128.png',
}

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

const name = packageJson.name
  .split('-')
  .map(str => str.charAt(0).toUpperCase() + str.slice(1))
  .join(' ')

export default defineManifest(async (env: ConfigEnv) => {
  const isDev = env.mode !== 'production'
  return {
    ...manifestJson,
    name: isDev ? `![DEV] ${name}` : name,
    // up to four numbers separated by dots
    version: `${major}.${minor}.${patch}.${label}`,
    // semver is OK in "version_name"
    version_name: version,
    icons,
    action: {
      ...manifestJson.action,
      default_icon: icons,
    },
    optional_host_permissions: ['<all_urls>'],
    content_scripts: [
      {
        js: ['src/contents'],
        matches: ['http://www.baidu.com/'],
        run_at: 'document_start',
      },
    ],
  }
})
