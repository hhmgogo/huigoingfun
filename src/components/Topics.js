import React from "react";
import db from "../pages/FirebaseApi";
import { List, Icon, Menu } from "semantic-ui-react";
function Topics() {
  const [topics, setTopics] = React.useState([]);
  //當firebase超過配額時
  const localData = [
    {
      name: "美食",
    },
    {
      name: "電影",
    },
    {
      name: "聊天",
    },
  ];
  React.useEffect(() => {
    db.collection("topics")
      .get()
      .then((querySnapshot) => {
        // 取得所有文件的資料
        const topicsData = querySnapshot.docs.map((doc) => doc.data());
        setTopics(topicsData);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
        console.log("Firebase 配额超限，使用本地数据。", error);
        setTopics(localData); // 如果 Firebase 获取数据失败，使用本地数据
      });
  }, []); // 將空數組作為第二個參數以避免重渲染

  return (
    <List size="big" horizontal>
      {topics.map((topic) => {
        return (
          <List.Item key={topic.name} className="custom-item">
            <Icon name={topic.icon} color="grey" avatar />
            <List.Content>
              <List.Header as="a"> {topic.name}</List.Header>
              {/* <List.Description>{topic.description}</List.Description> */}
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
}
export default Topics;
