import React from "react";
import Lottie from "lottie-react";
import Animation from "./AnimationChat.json";

function ChatLoading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Lottie style={{width:"155px"}} animationData={Animation} loop={true} />
    </div>
  );
}

export default ChatLoading;
