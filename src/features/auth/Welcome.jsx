import { Link } from "react-router-dom";



const Welcome = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "long" }).format(date);


    return (
        <>
            <section className="w-full my-[70px] pl-4">
                <p>{today}</p>
                <h1 className="mb-[40px]">Welcome!</h1>
                <p className="mb-[20px]">
                    <Link to="/dash/notes">View notes</Link>
                </p>
                <p>
                    <Link to="/dash/users">View User settings</Link>
                </p>
            </section>
        </>
    )
}

export default Welcome