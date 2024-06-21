import { useState } from 'react';
import { api } from '../../api/api';
import './loginSystem.css'
import { useDispatch, useSelector } from "react-redux";
import Score from '../allScores/Score';
import QuizGame from '../quizGame/quizGame';
import { AppDispatch } from '../../redux/store';
import { switchUser, switchMessage } from '../../redux/quiz/userSlices';

export default function LoginSystem() {

    const { user, username, message} = useSelector((state) => state.user);
    const dispatch = useDispatch<AppDispatch>();

 
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    // const [message, setMessage] = useState('')
    
    const handleLogin =  async () => {
        if (!userName && !password) {
            // setMessage('Please fill all the columns')
          }
        else{
            
            const response  = await fetch(`http://localhost:5000/login?username=${userName}&password=${password}&user=${user}`)
                    if (response.status != 200) {
                        dispatch(switchMessage('Please provide right credentials'));
                        setUserName('');
                        setPassword('');
                    } else {
                        dispatch(switchMessage('Successful login!'));
                        setUserName('');
                        setPassword('');
                        dispatch(switchUser(userName))
                        // setIsAuthenticated(true);
                    }
    }
}

    const handleSignup = async () => {
        if (!userName || !password) {
            dispatch(switchMessage('Please fill all the columns'));
          }
          else{
            try {
                const response  = await api.post('/add', {username: userName, password: password, user: user})
                if (response.data.username === userName) {
                    dispatch(switchMessage('user created'));
                    setUserName('');
                    setPassword('');
                }
            } catch (error) {
                dispatch(switchMessage('user already created'));
                setUserName('');
                setPassword('');
            }
                    
    }
    }
    
    return(
        <>
        {user === 'Teacher' ?  (message === 'Successful login!' ? <Score /> : (
          <>
          <form action="" className='loginForm' onSubmit={(e) => e.preventDefault()}>
            <p>{ user }</p>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <div style={{ display: 'flex', width: '170%'}}>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSignup}>Sign UP</button>
            </div>
        </form>
        {message ? <p>{message}</p> : ''}
          </>  
        )) : ( message === 'Successful login!' ? <QuizGame/> : ((
            <>
            <form action="" className='loginForm' onSubmit={(e) => e.preventDefault()}>
              <p>{ user }</p>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              <div style={{ display: 'flex', width: '170%'}}>
                  <button onClick={handleLogin}>Login</button>
                  <button onClick={handleSignup}>Sign UP</button>
              </div>
          </form>
          {message ? <p>{message}</p> : ''}
            </>  
          )))}
        </>
    );
}