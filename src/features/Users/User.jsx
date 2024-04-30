import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./userApiSlice";



// eslint-disable-next-line react/prop-types
const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId));
    const navigate = useNavigate();
    const userRoleString = user ? user.roles.toString().replaceAll(",", ", ") : null

    const handleEdit = () => {
        if (user) {
            navigate(`/dash/users/${userId}`);
        } else return null
    }

  return (
    <tr>
        <td className="pl-2 h-[40px]">{user.username}</td>
        <td className="h-[40px]">{userRoleString}</td>
        <td className="flex justify-center items-center h-[40px]">
            <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </td>
    </tr>
  )
}

export default User

