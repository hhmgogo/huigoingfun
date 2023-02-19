import { Grid } from "semantic-ui-react";
import Topics from "../components/Topics";
function Posts() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Topics />
        </Grid.Column>
        <Grid.Column width={5}>貼文列表</Grid.Column>
        <Grid.Column width={4}>資訊 </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
export default Posts;
