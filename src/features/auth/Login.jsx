import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [errFormIndicate, setErrFormIndicate] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value 
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.password) {
      setErrFormIndicate(false);
      setErrMsg("Please fill all fields");
      setTimeout(() => {
        setErrMsg("");
      }, 7000);
    } else { 
      setErrFormIndicate(true);
      setErrMsg("Login successful!");
      setTimeout(() => {
        navigate("/dash");
      }, 2000);
    }
  }


  return (
    <>
      <div className="w-full">
        <div className="ml-[10px]">
          <h1 className="mb-[50px]">Login</h1>
          <div className="flex flex-col justify-around items-start h-[120px] mb-[40px]">
            <input 
              name="fullName"
              onChange={handleOnChange}
              value={formData.fullName} 
              placeholder="Full Name"
              className="rounded-[6px] placeholder:text-[12px] placeholder:text-white 
              pl-2 w-[15%] bg-slate-400"  />
            <input 
              name="password"
              onChange={handleOnChange}
              value={formData.password} 
              placeholder="Password"
              className="rounded-[6px] placeholder:text-[12px] placeholder:text-white 
              pl-2 w-[15%] bg-slate-400"  />
            <p className={`h-[20px] text-[13px] italic -mt-[20px]
              ${!errFormIndicate ? "text-red-500" : "text-green-400"}`}>
              {errMsg}
            </p>
          </div>
          <div className="flex flex-col justify-around items-start">
            <button 
              onClick={handleLogin}
              className="rounded-[6px] gradient-background w-[15%] h-[45px] text-[16px]">
              Login
            </button>
            <button 
              onClick={()=>navigate("/")}
              className="rounded-[6px] bg-red-300/35 w-[15%] h-[40px] text-[14px] mt-[20px]">
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

