// Partners.js
import "./Newsboard.css";

// Import your local images (replace paths with yours later)
import binance from "../../Assets/Pictures/Binance Smart Chain Icon.svg";
import bitget from "../../Assets/Pictures/Bitget.png";
import bybit from "../../Assets/Pictures/Bybit.svg";
import coinbase from "../../Assets/Pictures/Coinbase New 2021.svg";
import crypto from "../../Assets/Pictures/crypto-com-coin-cro-logo.png";
import kraken from "../../Assets/Pictures/Kraken Icon.png";

import okx from "../../Assets/Pictures/OKX Blockdream Ventures.png";
import uniswap from "../../Assets/Pictures/uniswap-uni-logo.png";

const partners = [
  { name: "Uniswap", logo: uniswap },
  { name: "Crypto.com", logo: crypto },
  { name: "Bybit", logo: bybit },
  { name: "Coinbase", logo: coinbase },
  { name: "Bitget", logo: bitget },
  { name: "Kraken", logo: kraken },
  { name: "OKX", logo: okx },
  { name: "Binance", logo: binance },
];

export default function Newsboard() {
  return (
    <div className="partners-section">
      <h2 className="partners-title">Our Investment Partners</h2>
      <div className="partners-grid">
        {partners.map((partner, i) => (
          <div key={i} className="partner-box">
            <img src={partner.logo} alt={partner.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
