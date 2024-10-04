import NavBar from './components/layout/NavBar';
import './style/globals.css'
import TotalSalesScreen from "@/app/components/charts/total-sales-chart/TotalSalesScreen";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body className="app-layout">
              <div className="layout-container">
                  <NavBar/>
                  <main className="content-container">
                      <TotalSalesScreen/>
                  </main>
              </div>
          </body>
      </html>
  );
}