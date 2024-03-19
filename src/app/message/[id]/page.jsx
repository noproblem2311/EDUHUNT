"use client";
import React, { useEffect, useState } from "react";
import useChat from "../../../hooks/useChat";
import { useParams } from "next/navigation";
import Sider from "../../../components/modules/messages/Sider";
import { Image as ImageAntd } from "antd";
import { VideoCameraFilled } from "@ant-design/icons";
import Link from "next/link";
import MainLayout from "../../../components/core/layouts/MainLayout";
import { useProfile } from "../../../hooks/useProfile";
import useAdmin from "../../../hooks/useAdmin";
import { useMessage } from "../../../hooks/useMessage"; // Import hook useMessage

const MessagePage = () => {
  const { messages, sendMessage, connection } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const { id } = useParams();
  const { getProfile , getallprofile} = useProfile();
  const { getUserList } = useAdmin();
  const [userList, setUserList] = useState([]);
  const [userListhasAvatar, setUserListhasAvatar] = useState([]);
  const { getHistoryMessages } = useMessage(); // Use the useMessage hook
  const [messageHistory, setMessageHistory] = useState([]); // State to store message history
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getallprofile();
        setProfiles(profileData);

      }
      catch (error) {
        
      }
    }
    fetchProfile();
  })
  useEffect(() => {
    const fetchMessageHistory = async () => {
      try {
        const listmess = await getHistoryMessages(
          localStorage.getItem("userId"),
          id
        );
        setMessageHistory(listmess);
        console.log("messageHistory:", listmess);
      } catch (error) {
        console.error("Error fetching message history:", error);
      }
    };

    fetchMessageHistory();
  }, [id]);
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userListData = await getUserList();
        setUserList(userListData);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      const currentUserID = localStorage.getItem("userId");
      try {
        const updatedUserList = await Promise.all(
          userList.map(async (user) => {
            console.log("userinlist", user);
            if ((user.id !== currentUserID) && (user.role[0] !== "Admin")) {
              try {

                const profile = profiles.find(
                  (profile) => profile.userId === user.id
                )
                console.log("profile", profile);
                return {
                  id: user.id,
                  name: user.name,
                  avatar: profile?.urlAvatar,
                  lastMessage: "  ",
                };
              } catch (error) {
                console.error("Error fetching profile:", error);
                // Handle error case, maybe set a default avatar or log the error
          
              }
            }
          })
        );
        console.log("updatedUserList", updatedUserList);
        setUserListhasAvatar(updatedUserList);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    if (userList.length > 0) {
      fetchProfiles();
    }
  }, [userList.length > 0]);

  const information = userListhasAvatar.find((user) => user?.id === id);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      sendMessage({
        sender: localStorage.getItem("userId"),
        content: newMessage,
        receiver: information.id,
      });
      setNewMessage("");
    }
  };

  if (!connection) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="bg-white flex-1 border-[1px]">
        <div className="flex flex-row justify-between border-b-[1px] h-[65px] items-center px-4">
          <div className="flex flex-row items-center">
            <ImageAntd
              src={information?.avatar}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            ></ImageAntd>
            <div className="flex flex-col text-lg font-medium ml-2">
              <p>{information?.name}</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Link href={`/message/${id}/meet`} passHref>
              <VideoCameraFilled />
            </Link>
          </div>
        </div>
        <div className="flex flex-1 h-[524px] overflow-auto">
          <Sider users={userListhasAvatar}></Sider>
          <div className="flex flex-col justify-end p-4">
            <div className="pb-4">
              {/* Render messageHistory from useMessage hook */}
              {messageHistory.map((message, index) => (
                <div
                  key={index}
                  className={` ${
                    message.sender === localStorage.getItem("userId")
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {`${
                    userList.find((user) => user.id === message.sender)?.name
                  }: ${message.content}`}
                </div>
              ))}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.sender === localStorage.getItem("userId")
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {`${
                    userList.find((user) => user.id === message.sender)?.name
                  }: ${message.content}`}
                </div>
              ))}
            </div>
            <div className="flex w-[74vw]">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow mr-3 p-2 rounded border shadow-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Prevent the default action to stop from newline being added when pressing Enter
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagePage;
