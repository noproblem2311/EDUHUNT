"use client";
import MainLayout from "../../components/core/layouts/MainLayout";
import MentorLayout from "../../components/core/layouts/MentorLayout";
import React, { useState, useEffect } from "react";
import useMentor from "../../hooks/useMentor";
import MentorModal from "../../components/Mentor/Modal";
import { useRouter } from "next/navigation";

const Mentor = () => {
  const { getMentorIDList, getUserList } = useMentor();
  const [mentorList, setMentorList] = useState([]);
  const [userList, setUserList] = useState();
  const [showFullText, setShowFullText] = useState([]);
  const router = useRouter();
  const toggleText = (i) => {
    setShowFullText([...showFullText, i]);
  };
  let id;
  if (typeof window !== "undefined") {
    id = localStorage.getItem("userId");
  }

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "Mentor") {
      router.push("/mentor/connected");
    }
    const fetchUserList = async () => {
      try {
        const userListData = await getMentorIDList();
        console.log(userListData);
        const listID = userListData.map((ele) => ele.id);
        setMentorList(listID);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userListData = await getUserList();
        console.log(userListData);
        setUserList(userListData);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  let mentorProfileList = userList?.map((element) => {
    if (mentorList?.includes(element.userId)) {
      return element;
    }
  });

  mentorProfileList = mentorProfileList?.filter(
    (element) => element !== undefined
  );
  console.log(mentorProfileList);
  const maxLength = 100;

  return (
    <MainLayout>
      <MentorLayout>
        <div className="my-10 flex flex-col">
          {mentorProfileList?.map((mentor, index) => {
            const text = mentor.description;
            return (
              <div
                className="mb-7 flex w-[100%] justify-center object-fit"
                key={index}
              >
                <div className="rounded border flex">
                  <div className="w-[10vw] m-5">
                    <img
                      src={mentor.urlAvatar}
                      alt=""
                      className="h-[10vw] w-[10vw] object-cover"
                    />
                  </div>
                  <div className="mt-5 mb-5 w-[50vw]">
                    <div className="flex relative">
                      <div className="text-4xl font-bold">{`${mentor.firstName} ${mentor.lastName}`}</div>
                      <div className="absolute right-0">
                        <MentorModal
                          askerID={id}
                          answerID={mentor.userId}
                        ></MentorModal>
                      </div>
                    </div>
                    <div
                      className="italic text-xl my-3"
                      style={{ color: "grey" }}
                    >
                      {mentor.address}
                    </div>
                    <div style={{ color: "#363636" }}>
                      {showFullText?.includes(index) ? (
                        <div>{text}</div>
                      ) : (
                        <div>
                          {text?.length > maxLength
                            ? `${text?.slice(0, maxLength)}...`
                            : text}
                          <span>
                            <button
                              onClick={() => {
                                toggleText(index);
                              }}
                              className="font-bold"
                            >
                              {text?.length > maxLength ? "See More" : null}
                            </button>
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        router.push(`/mentor/roadmap/${mentor.userId}`)
                      }
                      className="font-bold"
                    >
                      View Road Map
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MentorLayout>
    </MainLayout>
  );
};

export default Mentor;
