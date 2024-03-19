"use client";
import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined, MessageOutlined } from "@ant-design/icons";
import MainLayout from "../../../components/core/layouts/MainLayout";
import MentorLayout from "../../../components/core/layouts/MentorLayout";
import useMentor from "../../../hooks/useMentor";
import Modal from "../../../components/Mentor/Modal";

const Mentor = () => {
  const [qa, setQa] = useState();
  const [mentor, setMentor] = useState();
  const { getQAList, getProfiles } = useMentor();

  let role;
  role = localStorage.getItem("role");

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userListData = await getProfiles();
        setMentor(userListData);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  let mentorName = mentor?.map((mentor) => {
    let fName = mentor.firstName;
    let sName = mentor.lastName;
    let id = mentor.id;
    let userID = mentor.userId;
    if (fName != null && sName != null && fName != "" && sName != "") {
      return {
        fName,
        sName,
        id,
        userID,
      };
    }
  });

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userListData = await getQAList();
        setQa(userListData);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  mentorName = mentorName?.filter((mentor) => mentor != undefined);
  console.log(mentorName);

  console.log(qa);
  const mentorNames = qa?.map((mentor) => {
    const name = mentorName?.filter(
      (mentorNamed) => mentorNamed?.userID == mentor.answerId
    );
    let named = name[0];
    return named.fName + " " + named.sName;
  });
  console.log(mentorNames);

  const userNames = qa?.map((mentor) => {
    const name = mentorName?.filter(
      (mentorNamed) => mentorNamed?.userID == mentor.askerId
    );
    let named = name[0];
    return named?.fName + " " + named?.sName;
  });
  console.log(userNames);

  return (
    <MainLayout>
      <MentorLayout>
        {qa?.map((item, key) => {
          const date = item.createdAt;
          let isAnswered = "Answering";
          let answer = false;
          if (item.answer != "") {
            isAnswered = "Answered";
            answer = true;
          }
          return (
            <div className="grid place-items-center" key={key}>
              <div className="my-5 flex border rounded-lg">
                <div className="font-bold pr-3 pl-3 border-r">{key + 1}</div>
                <div className="">
                  <div className="flex h-[6vh]">
                    <div className="w-[8vw] border-b border-r font-bold flex items-center justify-center">
                      <Tooltip
                        title={
                          item.askerFile ? (
                            <a
                              href={item.askerFile}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Asker File
                            </a>
                          ) : (
                            "No file attached"
                          )
                        }
                      >
                        <QuestionCircleOutlined /> Question
                      </Tooltip>
                    </div>
                    <div className="pr-3 pl-5 w-[30vw] border-b flex items-center">
                      {item.question}
                    </div>
                  </div>
                  <div className="flex h-[6vh]">
                    <div className="w-[8vw] border-r text-center font-bold flex items-center justify-center">
                      <Tooltip
                        title={
                          item.answerFile ? (
                            <a
                              href={item.answerFile}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Answer File
                            </a>
                          ) : (
                            "No file attached"
                          )
                        }
                      >
                        <MessageOutlined /> Answer
                      </Tooltip>
                    </div>
                    <div className="pr-3 pl-5 w-[30vw] flex items-center">
                      {item.answer == "" && role == "Mentor" ? (
                        <Modal
                          theID={item.id}
                          askerID={item.askerId}
                          answerID={item.answerId}
                          question={item.question}
                          askerFile={item.askerFile}
                        ></Modal>
                      ) : (
                        item.answer
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center w-[13vw] border-l">
                  <div>
                    <span className="font-bold">Date: </span>{" "}
                    {date.slice(0, date.indexOf("T"))}
                  </div>
                  <div>
                    <span className="font-bold">Status: </span>
                    <span
                      className="font-bold"
                      style={{ color: answer ? "#ADFF2F" : "red" }}
                    >
                      {isAnswered}
                    </span>
                  </div>
                  {role == "Mentor" ? (
                    <div>
                      <span className="font-bold">From: </span>
                      <span>{userNames[key]}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold">To: </span>
                      <span>{mentorNames[key]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </MentorLayout>
    </MainLayout>
  );
};

export default Mentor;
