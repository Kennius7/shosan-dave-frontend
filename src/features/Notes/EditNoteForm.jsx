/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./noteApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";



const EditNoteForm = ({ user, note }) => {
    const [updateNote, { isLoading, isSuccess, isError, error }] = useUpdateNoteMutation();
    const [deleteNote, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteNoteMutation();
    const navigate = useNavigate();

    const [title, setTitle] = useState(note.title);
    const [textBody, setTextBody] = useState(note.text);
    const [errCheck, setErrCheck] = useState(false);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle("");
            setTextBody("");
            navigate("/dash/notes");
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChange = e => setTitle(e.target.value);
    const onTextBodyChange = e => setTextBody(e.target.value);

    const canSave = title === "" || textBody === "" && !isLoading ? false : true;

    const onUpdateNoteClicked = async () => {
        await updateNote({ title, text: textBody, id: note.id });
        setTimeout(() => {
            setErrCheck(false);
        }, 8000);
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id });
        setTimeout(() => {
            setErrCheck(false);
        }, 8000);
    }



    const content = (
        <>
            <div className="flex flex-col justify-center items-center w-full h-[65vh]">
                <div className="text-red-400 italic text-start text-[16px] w-[40%]">
                    {
                        isError || isDelError && errCheck 
                            ?   <p><span className="text-white">Error:</span> 
                                    {error?.data?.msg || delerror?.data?.msg}
                                </p> 
                            : null
                    }
                </div>
                <form 
                    onSubmit={e => e.preventDefault()} 
                    className="w-[40%]">

                    <div className="flex flex-row justify-center items-center w-full mb-[40px]">
                        <div className="font-semibold mr-[20px] text-start w-[80%] text-[22px]">
                            Update or delete this note, { user[2].username }
                        </div>
                        <div className="flex flex-row justify-around items-center w-[20%]">
                            <button 
                                title="Update Note" 
                                disabled={!canSave} 
                                onClick={onUpdateNoteClicked}
                                className="">
                                <FontAwesomeIcon icon={faSave} size="2x" color={canSave ? "aqua" : "pink"} />
                            </button>
                            <button 
                                title="Delete Note" 
                                onClick={onDeleteNoteClicked}
                                className="">
                                <FontAwesomeIcon icon={faTrashCan} size="2x" color="pink" />
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

export default EditNoteForm