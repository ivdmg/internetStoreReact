import { Link } from "react-router-dom"
import './buttonBack.scss'

export const ButtonBack = () => {
    return (
        <Link to="/?_page=1" className="linkToMainPage">
            <h1>вернуться на главную</h1>
        </Link>
    )
}