import "./landingPage.css";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="landingPage">
      <div className="hero">
        <div className="heroContent">
          <h1>Fresh <span className="specialcharacter">&</span> Folds</h1>
          <p>
            Leave the Laundry to Us—FreshNFolds, Your Clothes Deserve the Best.
          </p>
          <span className="line-Discount">Get your first Laundry at <Link to="/register"><button className="lineOffer"> 50% - OFF</button></Link></span>
        </div>
      </div>

      <section id="services" className="services">
  <h2>Our Services</h2>
  <div className="services">
    <div className="serviceCard">
      <h3>Order Scheduling & Management</h3>
      <p>
        Streamlined scheduling and management of laundry orders for a
        seamless experience. Efficiently manage orders with user-friendly
        interfaces and automated reminders.
      </p>
    </div>
    <div className="serviceCard">
      <h3>Real-Time Order Status Updates</h3>
      <p>
        Track your laundry order status in real-time with instant updates
        and notifications. Stay informed about every step of your order’s
        journey.
      </p>
    </div>
    <div className="serviceCard">
      <h3>Pickup & Delivery Services</h3>
      <p>
        Convenient pickup and delivery options to fit your busy schedule.
        Choose from flexible timings and enjoy hassle-free services.
      </p>
    </div>
    <div className="serviceCard">
      <h3>Customized Laundry Solutions</h3>
      <p>
        Tailor-made laundry services to meet your specific needs. From special
        treatments to eco-friendly options, we've got you covered.
      </p>
    </div>
    <div className="serviceCard">
      <h3>Expert Care for Delicate Fabrics</h3>
      <p>
        Professional care for your delicate and high-end fabrics. Our experts
        ensure your garments receive the best treatment for longevity and
        freshness.
      </p>
    </div>
  </div>
</section>
<section id="about" className="about">
  <h2>About Us</h2>
  <div className="about-content">
    <p>
      Welcome to Fresh and Folds, your trusted partner in modern laundry
      management. At Fresh and Folds, we combine convenience, technology,
      and expert care to bring you a seamless laundry experience. Whether
      you're a busy professional, a family juggling multiple tasks, or
      simply someone who values quality service, we are here to simplify
      your life.
    </p>
    <p>
      Our mission is to streamline laundry services by providing efficient,
      reliable, and user-friendly solutions. 
    </p>
    <p>
      At Fresh and Folds, we believe in sustainability and community. We
      use eco-friendly detergents and support local businesses, all while
      striving to reduce our carbon footprint. Our dedicated team works
      tirelessly to ensure that each garment is treated with the utmost care
      and respect.
    </p>
    <p>
      Join us in revolutionizing laundry management. Experience the perfect
      blend of technology and personal touch with Fresh and Folds.
    </p>
  </div>
</section>

     <Footer/>
    </main>
  );
};

export default LandingPage;
