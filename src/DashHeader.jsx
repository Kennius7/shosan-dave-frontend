import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <>
        <header>
            <div className="flex justify-between items-center px-1">
                <Link to="/dash">
                    <h1>Shosan Notes</h1>
                </Link>
                <nav>
                    Add nav buttons laters
                </nav>
            </div>
            <hr className="bg-white"/>
        </header>
    </>

  )
}

export default DashHeader