/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPinterest,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white w-full">
      <div className="footer_Main">
        <div className="footer_Sub_Main">
          <Link href="/" className="footer_Logo">
            <img
              src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_200,q_80/v1707607127/uploads/c003d69e/profiles/1/logos/ELLASTEINLOGO_1707607127.png"
              className="h-8"
              alt="Ellastein Logo"
            />
          </Link>
          <div>
            <h5 className="text-gray-500 mb-3 mt-3">KEEP IN TOUCH</h5>
            <div className="footer_Icon">
              <FaInstagramSquare />
              <FaPinterest />
              <FaFacebookSquare />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
