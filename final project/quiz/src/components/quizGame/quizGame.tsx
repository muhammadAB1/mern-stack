import './quizGame.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch} from "../../redux/store";
import { useEffect, useState } from 'react';
import { getQuiz, addScore, switchMessage, switchUsing  } from '../../redux/quiz/userSlices';
import { RootState } from '../../redux/store';
import Check from '../check';
import WhoUser from '../askUser/whoUser';
// import LoginSystem from '../userLogin/loginSystem';




export default function QuizGame () {

    const { quiz, username, marks } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();

    const [id, setId] = useState(Number)
    const [qid, setQid] = useState(Number)
    const [message, setMessage] = useState('')
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState('')
    const [currentComponent, setCurrentComponent] = useState('');


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState('');

    const arr =[1]

useEffect(() => {
    dispatch(getQuiz(qid))

},[qid])


const currentQuestion = quiz[currentQuestionIndex]

const handleAnswerClick = (answer: string) => {
    setSelectedAnswers(answer)
    setAnswer(answer) 

  };

  const handleNextQuestion = () => {
    currentQuestion.right === answer ? setScore(score + 20) : ''
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setMessage('Quiz Completed')
    //   dispatch(addScore({username: username, qid: qid, score:marks}))
    }
  };


    const selectQuiz = async ()  => {
        setQid(id)
        const response  = await fetch(`http://localhost:5000/checkQuiz?username=${username}&qid=${id}`)
        response.status === 200 ? setMessage('quiz given') : (
            <>
            {quiz.length === 0 ? setMessage('quiz not found') : setMessage('')}
            </>
        )
    }

    const handleClick = () => {
        dispatch(addScore({username: username, qid:qid, score: score}))
        console.log(marks)
        // setCurrentComponent('homes')
        dispatch(switchMessage(''))
        dispatch(switchUsing(''))
    }
    return(
        <>{currentComponent !== 'home' ?  
        (
            <>
            {quiz.length === 0 ? (
                <>
                    <p>Please Enter Quiz ID</p>
                    <input type="number" onChange={(event) => setId(parseInt(event.target.value))}/>
                    <button onClick={selectQuiz}>submit</button>
                    {message ? <p>{message}</p> : ''}
                    
                </>
            ) :
            (
                <>
                {message === 'quiz given' ? (
                    <>
                        <p>Please Enter Quiz ID</p>
                        <input type="number" onChange={(event) => setId(parseInt(event.target.value))}/>
                        <button onClick={selectQuiz}>submit</button>
                        {message ? <p>{message}</p> : ''}
                    </>
                ):
                (
                    <>
                         {message !== 'Quiz Completed' ? (
                            <>
                                <div>
                                <h3>{currentQuestion.question}</h3>
                                {currentQuestion.answers.map((answer, answerIndex) => (
                                <>
                                    <ul key={answerIndex}>
                                        <li key={answerIndex}>
                                        <input
                                        type="radio"
                                        checked={selectedAnswers === answer}
                                        onChange={() => handleAnswerClick(answer)}
                                        />
                                        {answer}
                                        </li>
                                    </ul>
                                </> 
                                ))}
                                </div>
                                <button onClick={handleNextQuestion} >
                                {currentQuestionIndex < quiz.length - 1 ? 'Next' : 'finish' }
                                </button>
                                
                                
                            </>
                        ):
                        (
                            <>
                                <p>{message}</p><br />
                                <Check score={score}/><br />
                                {/* {arr.map(a => {
                                    return(
                                        console.log(score)
                                    )
                                })} */}
                                <a href="#"><button onClick={handleClick}>done</button></a>

                            </>
                        )}
                    </>
                )}
                </>
            )}
            </>
        ) :(<WhoUser/>)
        }
             
         </>
          
    )   
}