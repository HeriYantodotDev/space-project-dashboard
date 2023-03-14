import { useMemo } from "react";
import { Appear, Button, Loading, Paragraph } from "arwes";
import Clickable from "../components/Clickable";

const Launch = props => {
  const selectorBody = useMemo(() => {
    return props.planets?.map(planet => 
      <option value={planet.keplerName} key={planet.keplerName}>{planet.keplerName}</option>
    );
  }, [props.planets]);

  const today = new Date().toISOString().split("T")[0];

  return <Appear id="launch" animate show={props.entered}>
    <Paragraph >Let's blast off on an interstellar adventure! Time to schedule a mission launch and head towards one of the Kepler Exoplanets, who's with me?</Paragraph>
    <Paragraph>Attention space enthusiasts! Our earliest scheduled missions will only target confirmed planets that meet the following out-of-this-world criteria:</Paragraph>
    <ul >
      <li>Planetary radius &lt; 1.6 times Earth's radius</li>
      <li>Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11 times Earth's value</li>
    </ul>

    <form onSubmit={props.submitLaunch} style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 20px"}}>
      <label htmlFor="launch-day">Launch Date</label>
      <input type="date" id="launch-day" name="launch-day" min={today} max="2040-12-31" defaultValue={today} />
      <label htmlFor="mission-name">Mission Name</label>
      <input type="text" id="mission-name" name="mission-name" placeholder="Your Mission Name"/>
      <label htmlFor="rocket-name">Rocket Type</label>
      <input type="text" id="rocket-name" name="rocket-name" placeholder="Your Rocket Name" />
      <label htmlFor="planets-selector">Destination Exoplanet</label>
      <select id="planets-selector" name="planets-selector" defaultValue="">
      <option value="" disabled selected style={{color: 'gray', fontStyle: 'italic', backgroundColor: 'yellow'}}>Select a planet</option>
        {selectorBody}
      </select>
      <Clickable>
        <Button animate 
          show={props.entered} 
          type="submit" 
          layer="success" 
          disabled={props.isPendingLaunch}>
        Launch ✔
        </Button>
      </Clickable>
      {props.isPendingLaunch &&
        <Loading animate small />
      }
    </form>
  </Appear>
};

export default Launch;