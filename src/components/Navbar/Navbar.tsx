import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import LanguageChanger from '../Language-Changer/Language-Changer'


export default function Navbar() {

  const { t } = useTranslation();
  
  return (
    <div>
      <body className="antialiased bg-gray-200">
        <header className="lg:px-16 px-6 bg-salmon flex flex-wrap items-center lg:py-0 py-2">
          <div className="flex-1 flex justify-between items-center">
            <Link to="/">COLOCAR LOGO</Link>
          </div>

          <label
            htmlFor="menu-toggle"
            className="cursor-pointer lg:hidden block"
          >
            colocar SVG
          </label>
          <input type="checkbox" className="hidden" id="menu-toggle" />

          <div
            className="hidden lg:flex lg:items-center lg:w-auto w-full"
            id="menu"
          >
            <nav>
              <ul className="lg:flex items-center justify-between text-base text-white pt-4 lg:pt-0">
                <li>
                  <Link
                    to="/"
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-purple-900 hover:border-8 hover:text-purple-900"
                  >
                    Other
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-purple-900 hover:border-8 hover:text-purple-900"
                  >
                    {t('sign-up')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-green-900 hover:border-8 hover:text-green-900"
                  >
                    {t('login')}
                  </Link>
                </li>
              </ul>
            </nav>
            <Link
              to="/"
              className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 cursor-pointer"
            >
              <img
                src="https://transplant.org.au/wp-content/uploads/2018/06/James-avatar-for-website.png"
                className="rounded-full w-10 h-10 border-2 border-transparent hover:border-red-700"
                alt="mudar para algo dinamico com a foto que as pessoas poem no seu perfil"
              ></img>
            </Link>           
            <LanguageChanger/>
          </div>
        </header>
      </body>
    </div>
  );
}
