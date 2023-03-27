import "./globals.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <head>
        <body>
          {children}
        </body>
      </head>
    </html>
  )
}