import React from "react";

function Header() {

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div   class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="../">Home <span class="sr-only"></span></a>
      </li>

      <li class="nav-item active">
        <a class="nav-link" href="./login"> <span class="sr-only">login</span></a>
      </li>

      <li class="nav-item active">
      <a class="nav-link" href="/register"> <span class="sr-only">Register</span></a>
      
    </li>

  
    </ul>
    <div style={{margin:"0 auto",width:"80%",textAlign:"right"}} >welcome {localStorage.getItem("username")}</div>
  </div>
</nav>
  );
}
export default Header;