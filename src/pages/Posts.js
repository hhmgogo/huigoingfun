import { Container, Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Topics from "../components/Topics";
function Posts() {
  return (
    <Container fluid>
      <Grid verticalAlign="middle" stackable>
        <Grid.Row centered>
          <Grid.Column width={2} textAlign="right">
            <Topics />
          </Grid.Column>
          <Grid.Column width={2}>
            <Button
              basic
              color="violet"
              content="Violet"
              as={Link}
              to="/NewPost"
            >
              發表文章
            </Button>
          </Grid.Column>
          <Grid.Column width={5}>貼文列表</Grid.Column>
          <Grid.Column width={5}>資訊 </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
export default Posts;
