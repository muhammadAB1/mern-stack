import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
//import { api } from "../../api/api";
import axios from "axios";
import { Areas, Curriculum, Faculty, Offer  } from "../../components/types";

interface SemesterState {
	
	loading: boolean;
	semester: "Fall" | "Spring";
	error: string;
	curriculum: Curriculum[];
	faculty: Faculty[];
	areas: Areas[];
	offers: Offer[];

}

const initialState: SemesterState = {
	loading: false,
	semester: "Fall",
	curriculum: [],
	faculty: [],
	areas: [],
	offers: [],
	error: "",
};

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCurriculum = createAsyncThunk("semester/getCurriculum", async () => {
	//await timeout(5000);
	const response = await axios.get(`/api/curriculum`);
	return response.data as Curriculum[];
});

export const getFaculties = createAsyncThunk("semester/getFaculty", async () => {
	//await timeout(5000);
	const response = await axios.get(`/api/faculties`);
	return response.data as Faculty[];
});

export const getAreas = createAsyncThunk("semester/getAreas", async () => {
	//await timeout(5000);
	const response = await axios.get(`/api/areas`);
	return response.data as Areas[];
});

export const assignTeacher = createAsyncThunk("semester/assign", async (data: Offer) => {
	//await timeout(5000);
	const response = await axios.put(`/api/assign`, data);
	return response.data as string;
});

export const getOffers = createAsyncThunk("semester/getOffers", async () => {
	//await timeout(5000);
	const response = await axios.get(`/api/offers`);
	return response.data as Offer[];
});

export const availableFaculty = createAsyncThunk("semester/availableFaculty", async () => {
	//await timeout(5000);
	const response = await axios.get(`/api/availableFaculty`);
	return response.data
});





export const semesterSlice = createSlice({
	name: "semester",
	initialState,
	reducers: {
		switchSemester: (state) => {
			state.semester = state.semester === 'Fall' ? 'Spring' : 'Fall'
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCurriculum.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCurriculum.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.curriculum = payload;
			})
			.addCase(getCurriculum.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			.addCase(getFaculties.pending, (state) => {
				state.loading = true;
			})
			.addCase(getFaculties.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.faculty = payload;
			})
			.addCase(getFaculties.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			.addCase(getAreas.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAreas.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.areas = payload;
			})
			.addCase(getAreas.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			.addCase(getOffers.pending, (state) => {
				state.loading = true;
			})
			.addCase(getOffers.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.offers = payload;
			})
			.addCase(getOffers.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
	},
});

export const { switchSemester } = semesterSlice.actions;
export const semesterReducer = semesterSlice.reducer;
export const selectCount = (state: RootState) => state.semester;