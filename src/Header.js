import { Menu, Dropdown, Icon, Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Firebase from "./pages/Firebase";

function Header() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    Firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  });
  // const userEmail = Firebase.auth().currentUser.email
  //   ? Firebase.auth().currentUser.email
  //   : "";
  return (
    <Menu inverted pointing color="black">
      <Menu.Item name="Home" as={Link} to="/">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item name="Posts" as={Link} to="/Posts">
        <Icon name="blogger" />
        Posts
      </Menu.Item>
      <Menu.Item name="Game1A2B" as={Link} to="/Game1A2B">
        <Icon name="game" />
        Game
      </Menu.Item>
      <Menu.Item name="About" as={Link} to="/About">
        <Icon name="meh" />
        About me
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <i aria-hidden="true" className="child   icon"></i>
          {/* {userEmail ? <p>Welcome, {userEmail}!</p> : <p> </p>} */}
        </Menu.Item>
        {user ? (
          <>
            <Menu.Item onClick={() => Firebase.auth().signOut()}>
              登出
            </Menu.Item>
          </>
        ) : (
          <Menu.Item as={Link} to="/Login">
            註冊/登入
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>

    // <Menu attached="top" secondary>
    //   <Dropdown item icon="th" simple>
    //     <Dropdown.Menu>
    //       <Dropdown.Item as={Link} to="/">
    //         Blog House
    //       </Dropdown.Item>
    //       <Dropdown.Item as={Link} to="/Posts">
    //         Posts
    //       </Dropdown.Item>
    //       <Dropdown.Item>
    //         <Icon name="gamepad" />
    //         <span className="text">Game</span>
    //         <Dropdown.Menu>
    //           <Dropdown.Item as={Link} to="/Game1A2B">
    //             1A2B
    //           </Dropdown.Item>
    //         </Dropdown.Menu>
    //       </Dropdown.Item>

    //       <Dropdown.Item> </Dropdown.Item>
    //       <Dropdown.Divider />
    //       <Dropdown.Item as={Link} to="/About">
    //         <i aria-hidden="true" className="meh   icon"></i>
    //         About Katy
    //       </Dropdown.Item>
    //     </Dropdown.Menu>
    //   </Dropdown>

    //   <Menu.Menu position="right">
    //     <Menu.Item>
    //       <i aria-hidden="true" className="child   icon"></i>
    //       {/* {userEmail ? <p>Welcome, {userEmail}!</p> : <p> </p>} */}
    //     </Menu.Item>
    //     {user ? (
    //       <>
    //         <Menu.Item onClick={() => Firebase.auth().signOut()}>
    //           登出
    //         </Menu.Item>
    //       </>
    //     ) : (
    //       <Menu.Item as={Link} to="/Login">
    //         註冊/登入
    //       </Menu.Item>
    //     )}
    //   </Menu.Menu>
    // </Menu>
  );
}
export default Header;
