import Navbar from '../components/Navbar'
import BestSelling from '../components/BestSelling'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="page-content">
        <BestSelling />
        <Categories />
      </div>
      <Footer />
    </div>
  )
}
