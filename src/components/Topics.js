import React from "react";
import db from "../pages/db";
import { List, Icon } from "semantic-ui-react";
function Topics() {
  const [topics, setTopics] = React.useState([]);
  React.useEffect(() => {
    db.collection("topics")
      .get()
      .then((querySnapshot) => {
        // 取得所有文件的資料
        const topicsData = querySnapshot.docs.map((doc) => doc.data());
        console.log(topicsData);
        setTopics(topicsData);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, []); // 將空數組作為第二個參數以避免重渲染

  return (
    <List divided animated selection size="big" >
      {topics.map((topic) => {
        return (
          <List.Item key={topic.name}>
            <Icon name={topic.icon} />
            <List.Content>
              <List.Header as="a"> {topic.name}</List.Header>

              <List.Description>{topic.description}</List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
}
export default Topics;
