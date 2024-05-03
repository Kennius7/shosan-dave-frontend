import { useSelector } from "react-redux";
import { selectAllUsers } from "../Users/userApiSlice";
import NewNoteForm from "./NewNoteForm";



const NewNote = () => {
  const users = useSelector(selectAllUsers);
  const content = users
    ? <NewNoteForm users={users} /> 
    : <>
        <p className="flex justify-center items-center w-full text-center text-[25px] italic h-[50vh]">
          Loading...
        </p>
      </>

  return content;
}

export default NewNote
