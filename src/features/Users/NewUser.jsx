import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import ROLES from "../../config/roles";


const NewUser = () => {
  const userRegex = /^[A-z]{3,20}$/;
  const passWordRegex = /^[A-z0-9!@#$%]{4,12}$/;
  const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);
  const [errCheck, setErrCheck] = useState(false);

  useEffect(() => {
    setValidUsername(userRegex.test(username));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  useEffect(() => {
    setValidPassword(passWordRegex.test(password));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password])
  
  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate])

  useEffect(() => {
    if (isError) {
      setErrCheck(true);
    } else setErrCheck(false)
  }, [isError])
  

  const onUsernameChange = e => setUsername(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);
  const onRolesChange = e => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(value);
  }

  const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    console.log(`UserName: ${username}, Password: ${password}, Assigned Roles: ${roles}`)
    if (canSave) {
      console.log("Saving...")
      await addNewUser({ username, password, roles });
      setTimeout(() => {
        setErrCheck(false);
      }, 8000);
    }
  }

  const options = Object.values(ROLES).map(role => {
    return (
      <option key={role} value={role} className="flex items-center h-[40px] pl-2">
        {role}
      </option>
    )
  })

  const content = (
    <>
      <div className="flex flex-col justify-center items-center w-full h-[65vh]">
        <div className="text-red-400 italic text-start text-[16px] w-[40%]">
          {
            isError && errCheck 
              ? <p><span className="text-white">Error:</span> {error?.data?.msg}</p> 
              : null
          }
        </div>
        <form 
          onSubmit={onSaveUserClicked} 
          className="w-[40%]">

          <div className="flex flex-row justify-center items-center w-full mb-[40px]">
            <h2 className="mr-[20px] text-start w-[95%]">New User</h2>
            <div className="">
              <button 
                title="Save" 
                disabled={!canSave} 
                className="">
                <FontAwesomeIcon icon={faSave} size="3x" color={canSave ? "aqua" : "pink"} />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start">
            <label htmlFor="username" className="mb-[4px]">
              User Name (3 - 20 characters)
            </label>
            <input 
              id="username" 
              name="username" 
              type="text" 
              value={username}
              onChange={onUsernameChange}
              className="w-full h-[40px] rounded-[6px] mb-[30px] outline-none text-slate-900
              focus:bg-slate-100 bg-slate-300 pl-2" />
          </div>

          <div className="flex flex-col justify-center items-start">
            <label htmlFor="password" className="mb-[4px]">
              Password (4 - 12 characters)
            </label>
            <input 
              id="password" 
              name="password" 
              type="text" 
              value={password}
              onChange={onPasswordChange}
              className="w-full h-[40px] rounded-[6px] mb-[30px] outline-none text-slate-900
              focus:bg-slate-100 bg-slate-300 pl-2" />
          </div>

          <div className="flex flex-col justify-center items-start">
            <label htmlFor="roles" className="mb-[4px]">
              Assigned Roles
            </label>
            <select 
              id="roles" 
              name="roles" 
              type="text" 
              size={3}
              multiple={true}
              value={roles}
              onChange={onRolesChange}
              className="w-full h-[120px] rounded-[6px] outline-none text-slate-900
              focus:bg-slate-100 bg-slate-300 text-[20px]">
                {options}
              </select>
          </div>

        </form>
      </div>
    </>
  )


  return content;
}

export default NewUser
