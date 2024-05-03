import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";



const Welcome = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "long" }).format(date);


    return (
        <>
            <section className="w-full my-[70px] pl-4">
                <p>{today}</p>
                <h1 className="mb-[40px]">Welcome!</h1>
                <p className="mb-[20px]">
                    <FontAwesomeIcon icon={faArrowRightLong} />
                    <Link className="ml-[10px]" to="/dash/notes">View notes</Link>
                </p>
                <p className="mb-[20px]">
                    <FontAwesomeIcon icon={faArrowRightLong} />
                    <Link className="ml-[10px]" to="/dash/users">View User settings</Link>
                </p>
                <p className="mb-[20px]">
                    <FontAwesomeIcon icon={faArrowRightLong} />
                    <Link className="ml-[10px]" to="/dash/notes/new">Create new notes</Link>
                </p>
                <p>
                    <FontAwesomeIcon icon={faArrowRightLong} />
                    <Link className="ml-[10px]" to="/dash/users/new">Create new users</Link>
                </p>
            </section>
        </>
    )
}

export default Welcome