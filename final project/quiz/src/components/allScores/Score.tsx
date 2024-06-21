import './Score.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch} from "../../redux/store";
import { useEffect, useState } from 'react';
import { getScore } from '../../redux/quiz/userSlices';
import { RootState } from '../../redux/store';


export default function AllScore() {
    const { score } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();
    

    useEffect(() => {
		dispatch(getScore());
	}, []);
    return (
        <>
        <table>
            <tbody>
        <tr>
            <th colSpan={9}>Marks</th>
        </tr>
        <th></th>
        {score.filter((scor, index, self) => index === self.findIndex(s => s.qid === scor.qid)).map(sc => {
            return(
                <>
                <th>Quiz {sc.qid}</th>
                </>
            )
        })}
        {score.filter((sco, index, self) => index === self.findIndex(s => s.username === sco.username)).map(scor => {
            return(
                <>
                <tr>
                    <th>{scor.username}</th>
                    {score.filter((sc, index, self) => index === self.findIndex(s => s.qid === sc.qid)).map(da => {
                        return(
                            <>
                            <th>
                                {score.filter(dat => da.qid === dat.qid && dat.username === scor.username).map(ss => {
                                    return(
                                        <>
                                        {ss.score}
                                        </>
                                    )
                                })}
                            </th>
                            </>
                        )
                    })}
                </tr>
                </>
            )
        })}
            </tbody>
        </table>
    </>
    );
}

// data.filter((score, index, self) => index === self.findIndex(s => s.username === score.username)).map((score, index
