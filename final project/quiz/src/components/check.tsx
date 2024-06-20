import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { switchMarks } from "../redux/quiz/userSlices";
import { props } from "./types";

export default function Check({score} : props) {

    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (score) => {
        dispatch(switchMarks(score))
    }
    return(
        <>
        <p>your current score is {score}</p>
        {handleClick(score)}
        </>
    )
}