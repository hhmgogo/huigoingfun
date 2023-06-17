import React from "react";
import { Container } from "semantic-ui-react";

import ModalImage from "react-modal-image";
function Home() {
  return (
    <Container fluid>
      <ModalImage
        small={
          "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500"
        }
        large={
          "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500"
        }
        medium={
          "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500"
        }
        //"path/to/large/image"
        alt={"Home phto"}
        hideDownload={true}
        hideZoom={false}
        showRotate={true}
      />
    </Container>
  );
}
export default Home;
