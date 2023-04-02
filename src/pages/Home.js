import React from "react";
import { Container, Image } from "semantic-ui-react";
function Home() {
  return (
    <Container fluid>
      <Image
        src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500"
        centered
        rounded
        fluid
      />
    </Container>
  );
}
export default Home;
