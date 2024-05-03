/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ROLES from "../../config/roles";


const EditUserForm = ({ user }) => {
  const userRegex = /^[A-z]{3,20}$/;
  const passWordRegex = /^[A-z0-9!@#$%]{4,12}$/;
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);
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
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onUsernameChange = e => setUsername(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);
  const onRolesChange = e => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(value);
  }

  const options = Object.values(ROLES).map(role => {
    return (
      <option key={role} value={role} className="flex items-center h-[40px] pl-2">
        {role}
      </option>
    )
  })

  const onActiveChange = () => setActive(prev => !prev);

  const onUpdateUserClicked = async () => {
    if (password) {
      await updateUser({ id: user.id, username, password, active, roles });
      setTimeout(() => {
        setErrCheck(false);
      }, 8000);
    } else { 
      await updateUser({ id: user.id, username, active, roles });
      setTimeout(() => {
        setErrCheck(false);
      }, 8000);
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
    setTimeout(() => {
      setErrCheck(false);
    }, 8000);
  }

  const canSave = password 
    ? [roles.length, validUsername, validPassword].every(Boolean) && !isLoading 
    : [roles.length, validUsername].every(Boolean) && !isLoading



  const content = (
    <>
      <div className="flex flex-col justify-center items-center w-full h-[65vh]">
        <div className="text-red-400 italic text-start text-[16px] w-[40%]">
          {
            isError || isDelError && errCheck 
              ? <p><span className="text-white">Error:</span> {error?.data?.msg || delerror?.data?.msg}</p> 
              : null
          }
        </div>
        <form 
          onSubmit={e => e.preventDefault()} 
          className="w-[40%]">

          <div className="flex flex-row justify-center items-center w-full mb-[30px]">
            <h2 className="mr-[20px] text-start w-[80%]">Edit User</h2>
            <div className="flex flex-row justify-around items-center w-[20%]">
              <button 
                title="Update" 
                disabled={!canSave} 
                onClick={onUpdateUserClicked}
                className="">
                <FontAwesomeIcon icon={faSave} size="2x" color={canSave ? "aqua" : "pink"} />
              </button>
              <button 
                title="Delete"
                onClick={onDeleteUserClicked}
                className="">
                <FontAwesomeIcon icon={faTrashCan} size="2x" color={"red"} />
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
              Password (4 - 12 characters. No change if empty)
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
            <label htmlFor="active" className="mb-[4px]">
              ACTIVE:
            </label>
            <input 
              id="active" 
              name="active" 
              type="checkbox"
              checked={active}
              onChange={onActiveChange}
              className="w-[25px] h-[25px]" />
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

export default EditUserForm
