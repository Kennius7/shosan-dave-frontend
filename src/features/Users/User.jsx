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
        <td>{user.username}</td>
        <td>{userRoleString}</td>
        <td>
            <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </td>
    </tr>
  )
}

export default User

