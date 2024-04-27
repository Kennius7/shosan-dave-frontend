import { Link, useLocation, useNavigate } from "react-router-dom";
import { footerData } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHouse } from "@fortawesome/free-solid-svg-icons";



const DashFooter = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const onGoHomeClicked = () => navigate("/dash");

    let goHomeButton = null;

    if (pathname !== "/dash") {
        goHomeButton = (
            <button 
                onClick={onGoHomeClicked} 
                title="Home"
                className="flex justify-center items-center w-[20px]">
                <FontAwesomeIcon icon={faHouse} />
            </button>
        );
    } else {
        goHomeButton = (
            <button 
                onClick={onGoHomeClicked} 
                title="Other"
                className="flex justify-center items-center w-[20px]">
                <FontAwesomeIcon icon={faCircleUser} />
            </button>
        )
    }


    return (
        <>
            <footer className="fixed bottom-0 w-full bg-slate-400/60">
                <hr className="bg-white w-full" />
                <div className="flex flex-row justify-center items-start ml-[10px]">
                    <div className="flex flex-col justify-center items-start w-full">
                        <div className="flex flex-row justify-start items-center">
                            <div className="mr-[5px]">{goHomeButton}</div>
                            <div className="mr-[10px]">
                                <span className="text-green-200">Current User:</span> Guest
                            </div>
                            <div className="">
                                <span className="text-green-200">Status:</span> Active
                            </div>
                        </div>
                        <div 
                            onClick={()=>navigate("/login")}
                            className="flex justify-start items-center w-[80px] h-[30px] 
                            rounded-[5px] bg-red-300/35 pl-2 cursor-pointer mt-[10px]">
                            Back
                        </div>
                    </div>
                    <nav className="flex flex-row justify-between items-center w-[40%]">
                        {footerData.map((item)=>(
                            <div 
                                key={item.id} 
                                className="flex flex-row justify-between items-center gradient-background 
                                rounded-[5px] text-[16px] h-[35px] pl-2 px-2 cursor-pointer">
                                <Link to={item.url}>{item.title}</Link>
                            </div>
                        ))}
                    </nav>
                </div>
            </footer>
        </>

    )
}

export default DashFooter