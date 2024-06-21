import React, { useState } from 'react'
import { switchStudent, switchTeacher, switchUsing } from '../../redux/quiz/userSlices';
import LoginSystem from '../userLogin/loginSystem';
import './whoUser.css'

import { useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState} from "../../redux/store";

export const WhoUser = function() {
  const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    // const [users, setUsers] = useState('')

    const handleTeacher = () => {
        // setUsers('Teacher')
        dispatch(switchUsing('Teacher'))
    }
    const handleStudent = () => {
        // setUsers('Student')
        dispatch(switchUsing('Student'))
    }

  return (
  <>
  {user !== ''  ? <LoginSystem /> : (
    <>
      <button onClick={handleTeacher}>Teacher</button>
      <button onClick={handleStudent}>student</button>
    </>
  )}
  </>
  );
}
export default WhoUser
