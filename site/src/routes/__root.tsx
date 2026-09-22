import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'
import { SiteChrome } from '#/components/SiteChrome'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'noindex, nofollow' },
      { title: 'Golpo Greehoo Films — গল্প গৃহ' },
      {
        name: 'description',
        content:
          'A Dhaka film & TVC studio. Concept prototype by EXPERIUS — not an official Golpo Greehoo Films property.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Scripts />
      </body>
    </html>
  )
}
