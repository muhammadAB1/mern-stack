import { configureStore } from '@reduxjs/toolkit'
import { semesterReducer } from './semetser/semesterSlice'

export const store = configureStore({
    reducer: {
        semester: semesterReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;