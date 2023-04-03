import PageLayout from "@components/modules/PageLayout";
import "../styles/globals.scss";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <head>
        <body>
          <PageLayout>
            {children}
          </PageLayout>
        </body>
      </head>
    </html>
  )
}