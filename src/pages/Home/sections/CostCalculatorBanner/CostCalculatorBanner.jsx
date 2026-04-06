import bannerBg from '../../../../assets/images/hero-bg.webp'
import './CostCalculatorBanner.css'

const CostCalculatorBanner = () => (
  <section
    className="calc-banner"
    style={{ backgroundImage: `url(${bannerBg})` }}
  >
    <div className="calc-banner__overlay" />
    <div className="calc-banner__content">
      <h2 className="calc-banner__heading">
        Discover Your Business Setup Cost Instantly – Streamlined Solutions for Your Entrepreneurial Journey!
      </h2>
      <a href="/cost-calculator" className="calc-banner__btn">
        COST CALCULATOR
      </a>
    </div>
  </section>
)

export default CostCalculatorBanner
