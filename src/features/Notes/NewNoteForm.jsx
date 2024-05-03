/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAddNewNoteMutation } from "./noteApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const NewNoteForm = ({ users }) => {
  const navigate = useNavigate();
  const [addNewNote, { isLoading, isSuccess, isError, error }] = useAddNewNoteMutation();
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [errCheck, setErrCheck] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setTextBody("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate])

  useEffect(() => {
    if (isError) {
      setErrCheck(true);
    } else setErrCheck(false)
  }, [isError])

  const onTitleChange = e => setTitle(e.target.value);
  const onTextBodyChange = e => setTextBody(e.target.value);

  const canSave = title === "" || textBody === "" && !isLoading ? false : true;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      console.log("Saving...")
      await addNewNote({ user: users[2].id, title, text: textBody });
      setTimeout(() => {
        setErrCheck(false);
      }, 8000);
    }
  }



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
          onSubmit={onSaveNoteClicked} 
          className="w-[40%]">

          <div className="flex flex-row justify-center items-center w-full mb-[40px]">
            <h2 className="mr-[20px] text-start w-[95%]">Create a new note, { users[2].username }</h2>
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
            <label htmlFor="title" className="mb-[4px]">
              Title:
            </label>
            <input 
              id="title" 
              name="title" 
              type="text" 
              value={title}
              onChange={onTitleChange}
              className="w-full h-[40px] rounded-[6px] mb-[30px] outline-none text-slate-900
              focus:bg-slate-100 bg-slate-300 pl-2" />
          </div>

          <div className="flex flex-col justify-center items-start">
            <label htmlFor="textBody" className="mb-[4px]">
              Text Body:
            </label>
            <textarea 
              id="textBody" 
              name="textBody" 
              type="text" 
              value={textBody}
              onChange={onTextBodyChange}
              className="w-full h-[160px] rounded-[6px] mb-[30px] outline-none text-slate-900
              focus:bg-slate-100 bg-slate-300 pl-2" />
          </div>

        </form>
      </div>
    </>
  )
  
  return content;
}

export default NewNoteForm