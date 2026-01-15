import { Link } from "react-router-dom"

const Change = ({ text, linkText, link }) => {
    return (
        <div className="flex items-center justify-center gap-2 mt-6 text-sm">
            <p className="text-slate-600">{text}</p>
            <Link
                className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-all"
                to={link}>{linkText}</Link>
        </div>
    )
}

export default Change