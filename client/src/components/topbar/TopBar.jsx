import { useContext } from "react";
import "./topbar.css"
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function TopBar() {
  const {user , dispatch}=useContext(Context);//using contextApi we get in details of logged in user 
  const handleLogout=()=>{
    dispatch({type: "LOGOUT"});
  }
  return (
    <div className="top">
        <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem">
                <Link className="link" to="/">HOME</Link>
                </li>
                <li className="topListItem"><Link className="link" to="/">ABOUT</Link></li>
                <li className="topListItem"><Link className="link" to="/">CONTACT</Link></li>
                <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li>{/* let to="/x", now when we press the write on web page then url mai /x aur lag jayega and page corresponding to that will be opened*/}
                <li className="topListItem" onClick={handleLogout}>
                  {user && "LOGOUT"} {/*means if user loggedin then LOGOUT will be displayed */}
                </li>
            </ul>
        </div>
        <div className="topRight">
        {/* below code from 29 to 43 means that if user logged in then thing1 will be displayed otherwise thing2 will be displayed*/}
        {
          user?(
            <Link to="/settings"><img className="topImg" src="https://www.mensjournal.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_700/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.webp" alt="" /></Link>
          ):(
            <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">LOGIN</Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">REGISTER</Link>
            </li>
            </ul>
          )
        }
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}
