'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const MentorLayout = ({children}) => {
    const pathname = usePathname();
    let role;
    if (typeof window !== "undefined") {
        role = localStorage.getItem("role");
    }

    return (
        <div>
            <div className="border-none shadow-xl rounded-md object-cover pb-8">
                <div className="h-[20vh] relative bg-[#000] text-[#fff] rounded-t-md" >
                    <div className="h-[100%] text-4xl font-bold flex justify-center items-center">
                        <p>MENTORS</p>
                    </div>
                    <div className="absolute bottom-2 text-center ml-10">
                        {
                            role == "Mentor" ? <div></div> :
                            <Link href="/mentor" className="pb-1.5 px-5 border-b" style={{ fontWeight: (pathname == "/mentor") ? "900" : "600", borderBottomColor: (pathname == "/mentor") ? "white" : "black", borderBottomWidth: "4px"}}>
                                MENTORS LIST
                            </Link>
                        }
                        <Link href="/mentor/connected" className="pb-1.5 px-5 border-b" style={{ fontWeight: (pathname == "/mentor/connected") ? "900" : "600", borderBottomColor: (pathname != "/mentor") ? "white" : "black", borderBottomWidth: "4px"}}>
                            Q & A
                        </Link>
                    </div>
                </div>
                
                {children}
            </div>
        </div>
    )
}

export default MentorLayout