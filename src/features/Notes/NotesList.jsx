import { useGetNotesQuery } from "./noteApiSlice";
import Note from "./Note";


const NotesList = () => {
  const { data: notes, isLoading, isSuccess, isError, error } = useGetNotesQuery(null, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <p className="text-[20px] text-center">Loading notes...</p>
      </div>
    )
  }

  if (isError) {
    content = (
      <div className="flex justify-center items-center">
        <p className="text-[20px] text-center">Error loading notes</p>
        <p className="text-[20px] text-center">{error?.data?.msg}</p>
      </div>
    )
  }

  if (isSuccess) {
    const { ids } = notes;
    const tableContent = ids?.length 
      ? ids.map(notesId => <Note key={notesId} notesId={notesId} />) 
      : null

    content = (
      <>
        <div className="flex justify-center items-center h-[40vh] w-full">
          <table className="w-[70%] bg-slate-300/30">
            <thead className="w-full bg-blue-300/30 h-[40px]">
              <tr className="w-full">
                <th className="text-start w-[10%] pl-2 text-[18px]">Status</th>
                <th className="text-start w-[10%] pl-2 text-[18px]">Created</th>
                <th className="text-start w-[10%] pl-2 text-[18px]">Updated</th>
                <th className="text-start w-[20%] text-[18px]">Title</th>
                <th className="text-start w-[35%] text-[18px]">Text</th>
                <th className="text-start w-[10%] text-[18px]">Owner</th>
                <th className="w-[5%] text-[18px]">Edit</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {tableContent}
            </tbody>
          </table>
        </div>
      </>
    )
  }

  return content;
}

export default NotesList