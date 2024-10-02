import NavBar from './components/layout/NavBar';
import './style/globals.css'

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body className="app-layout">
            <NavBar />
            <main className="content-container">
                {children}
            </main>
          </body>
      </html>
  );
}