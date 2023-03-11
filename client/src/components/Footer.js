import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
  return <ArwesFooter animate>
    <Centered>
      <Paragraph style={{ fontSize: 14, margin: "10px 0" }}>
      Crafted with coffee and code by @HeriYantodotDev, with some tips and tricks from the Zero To Mastery Academy!
      </Paragraph>
    </Centered>
  </ArwesFooter>
};

export default Footer;
