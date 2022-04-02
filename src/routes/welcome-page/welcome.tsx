import React from "react";
import "./welcome.css";

import Navbar from "../../components/Navbar/Navbar";
import Search from "../../assets/svgs/search.svg";
import { withTranslation } from "react-i18next";

class Welcome extends React.Component<{ t: any }> {
  search() {
    console.log("searching...")
  }

  render() {
    const { t } = this.props
    return (
      <div className="welcomePage h-screen bg-welcome">
        <Navbar />
        <div className="flex h-5/6">
          <div className="m-auto w-3/4">
            <div className="flex justify-center bg-white border border-black rounded-full px-4 py-2">
              <div className="flex-none pt-2 mr-4">
                <img className="w-8 h-8" src={Search} alt="Search icon"/>
              </div>
              <input id="searchBar" className="flex-1 border-none bg-white" placeholder={t('searchBar')} type="text"/>
              <button onClick={this.search} className="ml-4 bg-salmon rounded-full px-6 py-3 text-white font-bold focus:outline-none focus:ring-0" type="submit">{t('search')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withTranslation()(Welcome);