import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const noteAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
});
const initialState = noteAdapter.getInitialState();

export const noteApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => "/notes",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id;
                    return note;
                });
                return noteAdapter.setAll(initialState, loadedNotes);
            },
            // eslint-disable-next-line no-unused-vars
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Note", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Note", id }))
                    ]
                } else return [{ type: "Note", id: "LIST" }]
            }
        }),
        addNewNote: builder.mutation({
            query: initialNoteData => ({
                url: "/notes",
                method: "POST",
                body: { ...initialNoteData }
            }),
            invalidatesTags: [{ type: "Note", id: "LIST" }]
        }),
        updateNote: builder.mutation({
            query: initialNoteData => ({
                url: "/notes",
                method: "PATCH",
                body: { ...initialNoteData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }]
        }),
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: "/notes",
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }]
        })
    })
})

export const { 
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = noteApiSlice;

//* Returns the query result object
export const selectNotesResult = noteApiSlice.endpoints.getNotes.select();

//* Creates memoized selector
const selectNotesData = createSelector(selectNotesResult, noteResult => noteResult.data);
//* normalized state object with ids and entities


//* getSelector creates these selectors and we rename them with aliases during destructuring
export const { 
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds,
} = noteAdapter.getSelectors(state => selectNotesData(state) ?? initialState)
//* pass in a selector that return the notes slice of state

