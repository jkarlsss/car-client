import { Link } from "react-router";
import { assets } from "../constants/assets";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0, 
        opacity: 1,
        transition: {duration: 0.8, delay: 0.3}
      })
    } else {
      controls.start({
        y: 50,
        opacity: 0
      })
    }
  }, [inView, controls])

  return (
    <motion.footer animate={controls} ref={ref} className="px-6 md:px-16 lg:px-24 xl:px-32 w-full mt-20">
      <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-300/30">
        <div className="max-w-96">
          <img src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm text-gray-300 text-justify">
            Welcome to your ultimate destination for premium car rental
            services, seamless booking experiences, and luxury vehicle hires —
            whether you're traveling for business, leisure, or a special event,
            we provide top-quality cars and a hassle-free rental process
            tailored to meet your needs.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <a href="#">
              <img
                src={assets.facebook_logo}
                className="w-7 h-7"
                alt="facebook logo"
              />
            </a>
            <a href="#">
              <img
                src={assets.twitter_logo}
                className="w-7 h-7"
                alt="tweeter logo"
              />
            </a>
            <a href="#">
              <img
                src={assets.instagram_logo}
                className="w-7 h-7"
                alt="instagram logo"
              />
            </a>
          </div>
        </div>

        <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
          <div>
            <h2 className="font-semibold text-gray-200 mb-5">RESOURCES</h2>
            <ul className="text-sm text-gray-400 space-y-2 list-none">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#featured">Featured</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-gray-200 mb-5 uppercase">Quick Links</h2>
            <div className="text-sm text-gray-400 space-y-2 list-none">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <Link to="/cars">Browse Cars</Link>
              </li>
              <li>
                <a href="#">List Your Car</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-200 mb-5 uppercase">Contact</h2>
            <div className="text-sm text-gray-400 space-y-2 list-none">
              <li>1234 Luxury Drive</li>
              <li>San Francisco, CA 12345</li>
              <li>+63 123 456 789</li>
              <li>info@example.com</li>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-gray-400">
        Copyright 2024 © <a href="https://myportfolio.com">Kals</a>. All
        Right Reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
