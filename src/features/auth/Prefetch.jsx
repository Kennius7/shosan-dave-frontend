import { store } from "../../app/store";
import { noteApiSlice } from "../Notes/noteApiSlice";
import { userApiSlice } from "../Users/userApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";



const Prefetch = () => {
    useEffect(() => {
        console.log("Subscribing...");
        const notes = store.dispatch(noteApiSlice.endpoints.getNotes.initiate());
        const users = store.dispatch(userApiSlice.endpoints.getUsers.initiate());

        return () => {
            console.log("Unsubscribing...");
            notes.unsubscribe();
            users.unsubscribe();
        }
    }, [])

    return <Outlet />
}

export default Prefetch

