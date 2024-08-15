import { PrettyChatWindow } from "react-chat-engine-pretty";
import { IoIosLogOut } from "react-icons/io";

const ChatsPage = (props) => {
  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "white" }}>
      <PrettyChatWindow
        projectId={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
        username={props.user.username}
        secret={props.user.secret}
        style={{ height: "100%", backgroundColor: "white" }}
      />
      <IoIosLogOut
        onClick={props.onLogout}
        style={{ position: "absolute", top: 10, right: 10 }}
        color="white"
        size={24}
      />
    </div>
  );
};

export default ChatsPage;
