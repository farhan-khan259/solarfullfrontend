import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./OurInfo.css";

export default function OurInfo() {
  return (
    <section className="ourinfo">
      <div className="ourinfo-container">
        <h1 className="ourinfo-title">
          <Link to="/setting">
            {" "}
            <span className="back-arrow">
              <FaArrowLeft />
            </span>
          </Link>
          Welcome to <span>SolarX!</span>
        </h1>

        <p className="ourinfo-text">
          At <strong>SolarX</strong>, we are revolutionizing the energy
          landscape in Pakistan by harnessing the power of the sun! ☀ Our
          platform is designed to connect investors with innovative solar energy
          projects, ensuring that everyone can benefit from sustainable energy
          solutions. 🌍💡
        </p>

        <p className="ourinfo-text">
          By investing in SolarX, you are not just putting your money into a
          project; you are becoming a part of a movement that aims to restore
          and enhance energy resources across the nation. 🇵🇰✨ We carefully
          select companies that are committed to developing cutting-edge solar
          technologies, allowing our users to earn profits while contributing to
          a greener future. 📈🌱
        </p>

        <p className="ourinfo-text">
          Our mission is to empower individuals and businesses alike, providing
          them with the opportunity to invest in renewable energy and enjoy
          attractive returns. 💰💚 With SolarX, you can be confident that your
          investment is making a positive impact, helping to reduce carbon
          footprints and promote sustainable practices in Pakistan. 🌿🌞
        </p>

        <div className="ourinfo-cta">
          <p>
            Join us on this exciting journey towards a brighter, cleaner, and
            more sustainable future! Together, we can illuminate lives and
            create a legacy of energy independence. 🌟🔋
          </p>
          {/* <button className="ourinfo-btn">Start Your Journey 🚀</button> */}
        </div>
      </div>
    </section>
  );
}
