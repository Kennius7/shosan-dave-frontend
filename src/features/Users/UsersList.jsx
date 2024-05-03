import { useGetUsersQuery } from "./userApiSlice";
import User from "./User";



const UsersList = () => {
  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery(null, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <p className="text-[20px] text-center">Loading users...</p>
      </div>
    )
  }

  if (isError) {
    content = (
      <div className="flex justify-center items-center">
        <p className="text-[20px] text-center">Error loading users</p>
        <p className="text-[20px] text-center">{error?.data?.msg}</p>
      </div>
    )
  }
  
  if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length 
      ? ids.map(userId => <User key={userId} userId={userId} />) 
      : null

    content = (
      <>
        <div className="flex justify-center items-center h-[40vh] w-full">
          <table className="w-[50%] bg-slate-300/30">
            <thead className="w-full bg-blue-300/30 h-[40px]">
              <tr className="w-full">
                <th className="text-start w-[50%] pl-2 text-[18px]">User Name</th>
                <th className="text-start w-[40%] text-[18px]">Roles</th>
                <th className="w-[10%] text-[18px]">Edit</th>
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

export default UsersList