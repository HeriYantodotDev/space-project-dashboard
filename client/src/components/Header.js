import { 
  Logo,
  Words,
  Header as ArwesHeader,
  Highlight,
  withStyles,
} from "arwes";
import { Link } from "react-router-dom";
import Clickable from "./Clickable";
import Centered from "./Centered";
import { useState } from "react";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    lineHeight: "80px",
  },
  logo: {
    display: "inherit",
    marginTop: "15px",
  },
  nav: {
    display: "inherit",
  },
  banner: {
    display: "inherit",
    fontWeight: "bold",
    marginLeft: "10px",
    marginRight: "15px",
    fontSize: 28,
  },
  clickable: {
    fontSize: 21,
    "& i": {
      marginRight: theme.padding / 2,
      fontSize: 24,
    },
  },
  link: {
    color: theme.color.content,
    textDecoration: "none",
  },
  button: {
    padding: [0, theme.padding / 2],
  },
  "@media (max-width: 800px)": {
    logo: {
      display: "none",
    },
    img: {
      display: "none",
    },
    banner: {
      display: "none",
    },
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
    }
  },
});

const LOG_OUT_URL = `v1/auth/logout`;

const URL_FETCH_USER_PROFILE = `v1/users/id`;


const Header = props => {
  const { classes, onNav, ...rest } = props;

  //without using useEffect
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [entries, setEntries] = useState('');

  async function getUserProfile() {
    const response = await fetch(URL_FETCH_USER_PROFILE);
    const data = await response.json();
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEntries(data.entries);
  }

  getUserProfile();

  return <ArwesHeader animate>
    <Centered >
      <div ><a href={LOG_OUT_URL} >Sign Out</a></div>
      <Words >Hi, {firstName} {lastName},  You have entried |{entries}| launches </Words>
  
    </Centered>
    
    <Centered className={classes.root} {...rest}>
      {/* <img src="/favicon.png" alt="" className={classes.img} style={{
        margin: "15px 10px 15px 0",
        height: "50px",
        width: "auto",
      }} /> */}
      <Logo animate size={50} className={classes.logo} layer="header" />
      <Words animate className={classes.banner}>
        Mission Dashboard
      </Words>
      <nav className={`${classes.nav}`}>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/launch">
              <i className="material-icons">check_circle_outline</i>Launch
            </Link>
          </Highlight>
        </Clickable>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/upcoming">
            <i className="material-icons">update</i>Upcoming</Link>
          </Highlight>
        </Clickable>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/history">
            <i className="material-icons">history</i>History</Link>
          </Highlight>
        </Clickable>
      </nav>
    </Centered>
  </ArwesHeader>
};

export default withStyles(styles)(Header);