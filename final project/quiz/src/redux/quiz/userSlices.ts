import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Login, Quiz, Score } from '../../components/types';
import { api } from '../../api/api';

interface userState {
  user: string;
  score: Score[];
  login: Login[];
  quiz: Quiz[];
  loading: boolean;
  error: string;
  username: string;
  marks: number;
  message: string;
}

const initialState: userState = {
  user: '',
  score: [],
  login: [],
  quiz: [],
  loading: false,
  error: "",
  username: '',
  marks: 0,
  message: '',
}

export const getScore = createAsyncThunk("user/getScore", async () => {
	const response = await api.get(`/allScore`);
	return response.data as Score[];
});

export const getQuiz = createAsyncThunk("user/getQuiz", async (data: number) => {
	const response = await fetch(`http://localhost:5000/quiz?qid=${data}`)
  const quizData = await response.json();
  return quizData as Quiz[];
});

export const addScore = createAsyncThunk("user/addScore", async (data: Score) => {
	const response = await api.post(`/newScore`, data);
	return response.data as string;
});




export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    switchTeacher: (state) => {
      state.user = 'Teacher'
    },
    switchStudent: (state) => {
      state.user = 'Student'
    },
    switchUsing: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    switchUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    switchMarks: (state, action: PayloadAction<number>) => {
      state.marks = action.payload;
    },
    switchMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    }
  },
  extraReducers: (builder) => {
		builder
			.addCase(getScore.pending, (state) => {
				state.loading = true;
			})
			.addCase(getScore.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.score = payload;
			})
			.addCase(getScore.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
      .addCase(getQuiz.pending, (state) => {
				state.loading = true;
			})
			.addCase(getQuiz.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.quiz = payload;
			})
			.addCase(getQuiz.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
    }
})

export const { switchTeacher, switchStudent, switchUser, switchMarks, switchMessage, switchUsing } = userSlice.actions
export const selectCount = (state: RootState) => state.user
export const userReducer = userSlice.reducer
