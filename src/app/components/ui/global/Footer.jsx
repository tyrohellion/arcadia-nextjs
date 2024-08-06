import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="main-section">
          <div className="footer-section-headers">arcadia</div>
          <div className="footer-buttons">
            <a
              href="https://github.com/tyrohellion/demos-nextjs"
              className="footer-button"
            >
              <div className="footer-text">GitHub</div>
            </a>
            <a href="https://zsr.octane.gg" className="footer-button">
              <div className="footer-text">API</div>
            </a>
            <a
              href="https://liquipedia.net/rocketleague/Main_Page"
              className="footer-button"
            >
              <div className="footer-text">RL Liquipedia</div>
            </a>
          </div>
        </div>
        <div className="personal-section">
          <div className="footer-section-headers">My stuff</div>
          <div className="footer-buttons">
            <a href="https://x.com/tyrohellion" className="footer-button">
              <div className="footer-text">Twitter</div>
            </a>
            <a
              href="https://www.twitch.tv/tyrohellion"
              className="footer-button"
            >
              <div className="footer-text">Twitch</div>
            </a>
            <a
              href="https://liquipedia.net/rocketleague/Tyro_(American_Player)"
              className="footer-button"
            >
              <div className="footer-text">Liquipedia</div>
            </a>
          </div>
        </div>
        <div className="thanks-section">
          <div className="footer-section-headers">Acknowledgments</div>
          <div className="footer-buttons">
            <a href="https://www.shiftrle.gg" className="footer-button">
              <div className="footer-text">ShiftRLE</div>
            </a>
            <a href="https://octane.gg" className="footer-button">
              <div className="footer-text">Octane.gg</div>
            </a>
          </div>
        </div>
        <div className="copyright">
          <Image
            src="/static/images/logo.svg"
            alt="arcadia logo"
            className="arcadia-logo"
            width={30}
            height={30}
          />
          ARCADIA © 2024
        </div>
      </div>
    </>
  );
};

export default Footer;
