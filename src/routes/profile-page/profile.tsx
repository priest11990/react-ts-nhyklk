import React from "react";
import "./profile.css";

import Navbar from '../../components/Navbar/Navbar'


export default function Profile(){
  class Profile {
    id: number;
    name: string;
    pic: any;


    constructor(id: number, name: string, location: string, pic: string) {
      this.id = id;
      this.name = name;
      this.pic = pic;
    }
  }

  var pessoaExemplo = new Profile(39, "André Ventura", "Lisboa","https://bordalo.observador.pt/v2/q:85/c:4096:2300:nowe:0:200/rs:fill:980/f:webp/plain/https://s3.observador.pt/wp-content/uploads/2021/05/28001047/dventura-andre-ventura-4-scaled.jpg")

  return (
    
    <div>
      <Navbar />
      <div>
      <div className="flex flex-wrap overflow-hidden xl:-mx-2">

<div className="w-full overflow-hidden xl:my-2 xl:px-2 xl:w-1/4">
<h1>{pessoaExemplo.name}</h1>
</div>

<div className="w-full overflow-hidden xl:my-2 xl:px-2 xl:w-1/4">
<p>thing 2</p>
</div>
</div>
</div>
      </div>
  )
}