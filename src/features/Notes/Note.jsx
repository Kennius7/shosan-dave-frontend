import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./noteApiSlice";



// eslint-disable-next-line react/prop-types
const Note = ({ notesId }) => {
    const note = useSelector(state => selectNoteById(state, notesId));
    const navigate = useNavigate();
    const created = new Date(note.createdAt).toLocaleString("en-US", { day: "numeric", month: "long" });
    const updated = new Date(note.updatedAt).toLocaleString("en-US", { day: "numeric", month: "long" });

    const handleEdit = () => {
        if (note) {
            navigate(`/dash/notes/${notesId}`);
        } else return null
    }

  return (
    <tr>
        <td className="pl-2 h-[40px]">
          {
            note.completed 
              ? <span>Completed</span> 
              : <span>Open</span>
          }
        </td>
        <td className="pl-2 h-[40px]">{created}</td>
        <td className="pl-2 h-[40px]">{updated}</td>
        <td className="h-[40px]">{note.title}</td>
        <td className="pl-2 h-[40px]">{note.text.trim()}</td>
        <td className="pl-2 h-[40px]">{note.username}</td>
        <td className="flex justify-center items-center h-[40px]">
            <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </td>
    </tr>
  )
}


export default Note