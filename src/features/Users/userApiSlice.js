import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => "/users",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id;
                    return user;
                });
                return userAdapter.setAll(initialState, loadedUsers);
            },
            // eslint-disable-next-line no-unused-vars
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map(id => ({ type: "User", id }))
                    ]
                } else return [{ type: "User", id: "LIST" }]
            }
        })
    })
})

export const { useGetUsersQuery } = userApiSlice;

//* Returns the query result object
export const selectUsersResult = userApiSlice.endpoints.getUsers.select();

//* Creates memoized selector
const selectUsersData = createSelector(selectUsersResult, userResult => userResult.data);
//* normalized state object with ids and entities


//* getSelector creates these selectors and we rename them with aliases during destructuring
export const { 
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
} = userAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
//* pass in a selector that return the users slice of state

