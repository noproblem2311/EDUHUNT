"use client";
import React from "react";
import {
  SearchOutlined,
  TeamOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatars from "./Avatar";
import { useState, useEffect } from "react";

const NavBar = () => {
  const pathName = usePathname();
  const [role, setRole] = useState(null);

  let userRole = null;

  if (typeof window !== "undefined") {
    userRole = localStorage.getItem("role");
  }

  const items = [
    {
      label: (
        <Link
          href={"/"}
          className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
        >
          HOME
        </Link>
      ),
      labelhighlight: (
        <Link
          href={"/"}
          className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
        >
          HOME
        </Link>
      ),
      key: "0",
      icon: <SearchOutlined />,
    },
    {
      label: (
        <Link
          href={"/scholarship"}
          className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
        >
          SCHOLARSHIP
        </Link>
      ),
      labelhighlight: (
        <Link
          href={"/scholarship"}
          className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
        >
          SCHOLARSHIP
        </Link>
      ),
      key: "1",
      icon: <SearchOutlined />,
    },
    {
      label: (
        <Link
          href={"/message/0"}
          className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
        >
          CHAT
        </Link>
      ),
      labelhighlight: (
        <Link
          href={"/message/0"}
          className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
        >
          CHAT
        </Link>
      ),
      key: "2",
      icon: <MessageOutlined />,
    },
  ];

  if (role === "Mentor") {
    items.push(
      {
        label: (
          <Link
            href={"/mentor"}
            className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            MENTOR
          </Link>
        ),
        labelhighlight: (
          <Link
            href={"/mentor"}
            className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            MENTOR
          </Link>
        ),
        key: "4",
        icon: <TeamOutlined />,
      },
      {
        label: (
          <Link
            href="/roadmap"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            ROADMAP
          </Link>
        ),
        labelhighlight: (
          <Link
            href="/roadmap"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            ROADMAP
          </Link>
        ),
        key: "3",
        icon: <MessageOutlined />,
      }
    );
  } else if (role === "Scholarship Provider") {
    items.push(
      {
        label: (
          <Link
            href="/post"
            className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            POST
          </Link>
        ),
        labelhighlight: (
          <Link
            href="/post"
            className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            POST
          </Link>
        ),
        key: "3",
        icon: <MessageOutlined />,
      },
      {
        label: (
          <Link
            href="/application"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            APPLICATION
          </Link>
        ),
        labelhighlight: (
          <Link
            href="/application"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            APPLICATION
          </Link>
        ),
        key: "4",
        icon: <MessageOutlined />,
      }
    );
  } else if (role === "User") {
    items.push(
      {
        label: (
          <Link
            href={"/mentor"}
            className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            MENTOR
          </Link>
        ),
        labelhighlight: (
          <Link
            href={"/mentor"}
            className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            MENTOR
          </Link>
        ),
        key: "4",
        icon: <TeamOutlined />,
      },
      {
        label: (
          <Link
            href="/application"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            APPLICATION
          </Link>
        ),
        labelhighlight: (
          <Link
            href="/application"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            APPLICATION
          </Link>
        ),
        key: "3",
        icon: <MessageOutlined />,
      }
    );
  }

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);
  const HighlightKey = () => {
    if (pathName === "/") {
      return 0;
    } else if (pathName.includes("/scholarship")) {
      return 1;
    } else if (pathName?.includes("/mentor")) {
      return 4;
    } else if (
      pathName.includes("/roadmap") ||
      pathName.includes("/application") ||
      pathName.includes("/post")
    ) {
      return 3;
    } else if (pathName?.includes("message")) {
      return 2;
    } else return 0;
  };

  return (
    <nav className="max-h-28 flex items-center justify-between flex-wrap p-6 z-10">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-extrabold text-6xl tracking-tight text-brown">
          EDU HUNT
        </span>
      </div>
      <div className="flex-grow lg:flex w-[60%]">
        <div className="lg:flex-grow w-[100%]">
          <div className="flex items-center justify-center">
            {items.map((item, index) => {
              if (HighlightKey() == item.key) {
                return (
                  <React.Fragment key={index}>
                    {item.labelhighlight}
                  </React.Fragment>
                );
              }
              return <React.Fragment key={index}>{item.label}</React.Fragment>;
            })}
          </div>
        </div>
      </div>
      <div className="z-10" style={{}}>
        <Avatars></Avatars>
      </div>
    </nav>
  );
};

export default NavBar;
