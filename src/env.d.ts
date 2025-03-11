// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*?script&module'

declare module '@bytemd/vue-next'
declare module '@bytemd/plugin-gfm'
declare module '@bytemd/plugin-frontmatter'
declare module '@bytemd/plugin-math'

declare let Lute: any
