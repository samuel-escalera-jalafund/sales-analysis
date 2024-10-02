import NavBar from './components/NavBar';
import './globals.css'

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