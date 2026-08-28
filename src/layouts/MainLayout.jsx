import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 animate-fade-in">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
