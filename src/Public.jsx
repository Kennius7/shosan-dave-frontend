import { Link, useNavigate } from "react-router-dom";
import { footerData } from "./data";


const Public = () => {
    const navigate = useNavigate();

    return (
        <section className="text-white w-full h-dvh">
            <header>
                <h1>Welcome to <span className="nowrap">Shosan Notes</span></h1>
            </header>
            <main>
                <p>
                    Located in Lagos, Shosan Notes is the best app for your notes 
                    compilation, collation and processing!
                </p>
                <br/>
                <br/>
                <address>
                    Shosan Notes <br/>
                    No. 6 Admiralty road,<br/>
                    Lekki, Lagos. <br/> <br/>
                    <a href="tel:+2347033325279">+2347033325279</a>
                </address>
            </main>
            <br/>
            <br/>
            <div>
                <button 
                    onClick={()=>navigate("/login")}
                    className="gradient-background rounded-[8px] p-3">
                    Login
                </button>
            </div>
            <br/>
            <footer>
                <div className="flex flex-row justify-around items-center w-[40%]">
                    {footerData.map((item)=>(
                        <div 
                            key={item.id} 
                            className="gradient-background rounded-[10px] text-[22px] p-2">
                            <Link to={item.url}>{item.title}</Link>
                        </div>
                    ))}
                </div>
            </footer>
        </section>
    )
}

export default Public