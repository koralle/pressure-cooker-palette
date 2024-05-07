import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { ReactNode } from 'react'
import '~/globals.css'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: Readonly<LayoutProps>) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const App = () => {
  return <Outlet />
}

export default App
