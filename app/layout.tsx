import PageLayout from "@components/modules/PageLayout";
import "./globals.scss";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <head>   
        <meta    
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body>   
        <PageLayout>
          {children}
        </PageLayout>
      </body>
    </html>
  )
}