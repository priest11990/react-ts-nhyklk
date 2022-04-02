import React, { useEffect } from 'react'
import Select from "react-select";
import i18next from "i18next";
import { useCookies, Cookies } from 'react-cookie';


export default function LanguageChanger() {
  const [, setCookie, removeCookie] = useCookies(['cookie-name'])
  const cookies = new Cookies()

  const options = [
    { value: "pt", label: "Português" },
    { value: "en", label: "English" },
  ];

  var optionNumber = cookies.get("lang") || 0; 

  function changeLanguage(e: any) {
    i18next.changeLanguage(e.value)
    let nLang = e.value === 'pt' ? 0 : 1 
    removeCookie("lang")
    setCookie("lang", nLang)
  }

  function initiateLanguage() {
    let nLang = cookies.get("lang")
    console.log(nLang)
    if(nLang === undefined) {
      setCookie("lang", 0)
    } else {
      nLang = parseInt(nLang)
      let lang = nLang === 0 ? 'pt' : 'en'
      i18next.changeLanguage(lang)
    }
  }
  
  /* todo add function that checks which language on 
    component start up with cookie or local storage*/
  useEffect(() => {
    initiateLanguage()
  }, [])
  
  return (
    <Select
      defaultValue={options[optionNumber]}
      onChange={changeLanguage}
      className="ml-6 w-32 z-10"
      options={options}
    />
  );
}
