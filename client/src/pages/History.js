import { useMemo } from "react";
import { Appear, Table, Paragraph } from "arwes";

const History = props => {
  const tableBody = useMemo(() => {
    return props.launches?.filter((launch) => !launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td>
            <span style={
              {color: launch.success ? "greenyellow" : "red"}
            }>█</span>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.customers?.join(", ")}</td>
          <td>{launch.userID.firstName} {launch.userID.lastName}</td>
        </tr>;
      });
  }, [props.launches]);

  return <article id="history">
    <Appear animate show={props.entered}>
      <Paragraph>History of your mission launches including SpaceX launches starting from the year 2006.</Paragraph>
      <Table animate >
          <table style={{tableLayout: "fixed", width: "150%"}}>
            <thead>
              <tr>
                <th style={{ width: "5%"}} ></th>
                <th style={{ width: "8%"}} >No.</th>
                <th>Date</th>
                <th >Mission</th>
                <th >Rocket</th>
                <th >Customers</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
      </Table>
    </Appear>
  </article>;
}
  
export default History;