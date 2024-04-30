import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Public from './Public';
import Login from './features/auth/Login';
import DashLayout from './DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/Notes/NotesList';
import UsersList from './features/Users/UsersList';
import EditUser from "./features/Users/EditUser";
import NewUser from "./features/Users/NewUser";
import EditNote from "./features/Notes/EditNote";
import NewNote from "./features/Notes/NewNote";
import Prefetch from './features/auth/Prefetch';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>

          <Route index element={<Public/>} />
          <Route path="login" element={<Login/>} />
          
          <Route element={<Prefetch/>}>
            <Route path="dash" element={<DashLayout/>}>

              <Route index element={<Welcome/>} />

              <Route path="users">
                <Route index element={<UsersList/>} />
                <Route path=":id" element={<EditUser/>} />
                <Route path="new" element={<NewUser/>} />
              </Route>

              <Route path="notes">
                <Route index element={<NotesList/>} />
                <Route path=":id" element={<EditNote/>} />
                <Route path="new" element={<NewNote/>} />
              </Route>

            </Route>
          </Route>

        </Route>
      </Routes>
    </>
  )
}


export default App
