import { useState } from "react";
import { Content, Container } from "../../../shared/styles";
import CreateNote from "./CreateNote";


const Dashboard = () => {
  const [display, setDisplay] = useState(false)

  return (
    <Container>
      <Content>
        {display
          ? <CreateNote setDisplay={setDisplay} />
          : <span onClick={() => setDisplay(!display)}>Create</span>}
      </Content>
    </Container>
  )
}

export default Dashboard;
