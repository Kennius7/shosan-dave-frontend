import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./noteApiSlice";
import { selectAllUsers } from "../Users/userApiSlice";
import EditNoteForm from "./EditNoteForm";




const EditNote = () => {
  const { id } = useParams();
  const note = useSelector(state => selectNoteById(state, id));
  const user = useSelector(selectAllUsers);
  const content = note && user 
    ? <EditNoteForm user={user} note={note} /> 
    : <>
        <p className="flex justify-center items-center w-full text-center text-[25px] italic h-[50vh]">
          Loading...
        </p>
      </>
  
  return content;
}

export default EditNote

