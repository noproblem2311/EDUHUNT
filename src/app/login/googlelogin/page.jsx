"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useAdmin from "../../../hooks/useAdmin"
import { Redirect } from 'react-router';
import { useRouter } from "next/navigation";
import { send } from "process";
import useAuth from "../../../hooks/useAuth";


export default function chooseRole() {
    const { data: session } = useSession();
    const [ role, setRole ] = useState(1);
    const [ list, setList ] = useState([]);
    const router = useRouter();
    const { getUserList } = useAdmin();
    const { registerUser } = useAuth();

    const username = session?.user?.name;
    const email = session?.user?.email;

    useEffect(() => {
        const fetchUserList = async () => {
          try {
            
            const userListData = await getUserList();
            setList(userListData)
          } catch (error) {
            console.error("Error fetching user list:", error);
          }
        };
    
        fetchUserList();
    }, []);

    if(session?.user?.email != undefined) {

        list.map((obj) => {
            if(obj.email == session?.user?.email) {
                localStorage.setItem("userEmail", session?.user?.email);
                localStorage.setItem("role", obj?.role[0]);
                localStorage.setItem("id", obj?.userid);
                router.replace("/");
            }
        })
    }

    const sendData = async (e) => {
        e.preventDefault();
        try {
          const response = await registerUser({
            name: username,
            email: email,
            password: "Abcde1.",
            confirmPassword: "Abcde1.",
            roleId: role,
          });

          response();
    
          if (response.flag) {
            list.map((obj) => {
                if(obj.email == session?.user?.email) {
                    localStorage.setItem("userEmail", session?.user?.email);
                    localStorage.setItem("role", obj?.role[0]);
                    localStorage.setItem("id", obj?.userid);
                    router.replace(`/`);
                }
            }) 
          }
        } catch (error) {
          console.error(error);
          
        }
      };

    return(
        <div className="w-[50%] m-auto">
            <span className="text-[#333] text-sm">Role</span>
            <select
                onChange={(e) => setRole(e.target.value)}
                className="border rounded-lg w-full px-3 py-2 mb-4"
            >
              <option value={1}>Student</option>
              <option value={2}>Scholarship Provider</option>
              <option value={3}>Mentor</option>
            </select>
            <button 
            onClick={sendData}
            className="w-32 h-10 rounded-xl" 
            style={{background: 'blue', color: 'white'}}
            >Register</button>
        </div>
    )
}