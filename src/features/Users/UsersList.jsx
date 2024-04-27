import { useGetUsersQuery } from "./userApiSlice";
import User from "./User";



const UsersList = () => {
  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <p className="text-[20px] text-center">Loading...</p>
      </div>
    )
  }

  if (isError) {
    content = (
      <div className="flex justify-center items-center">
        <p className="text-[20px] text-center">Error loading data</p>
        <p className="text-[20px] text-center">{error?.data?.message}</p>
      </div>
    )
  }
  
  if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length 
      ? ids.map(userId => <User key={userId} userId={userId} />) 
      : null

    content = (
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Roles</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }


  return content;
}

export default UsersList