import { Fragment, useEffect, useState } from "react";
import AutoCompleteText from "./AutoCompleteText";
import { assignTeacher, getAreas, getCurriculum, getFaculties, getOffers, semesterSlice, switchSemester } from "../redux/semetser/semesterSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Faculty, Offer } from "./types";
import axios from "axios";

export const CourseOffer = function () {
	const { faculty, curriculum, semester, areas, offers } = useSelector((state: RootState) => state.semester);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getCurriculum());
		dispatch(getFaculties());
		dispatch(getAreas());
		dispatch(getOffers());

	}, []);


	const sems = [
		{ sno: 1, name: "1st" },
		{ sno: 2, name: "2nd" },
		{ sno: 3, name: "3rd" },
		{ sno: 4, name: "4th" },
		{ sno: 5, name: "5th" },
		{ sno: 6, name: "6th" },
		{ sno: 7, name: "7th" },
		{ sno: 8, name: "8th" },
	];
	const secs = [7, 7, 6, 6].map((s) => [...Array(s).keys()].map((i) => String.fromCharCode(i + 1 + 64)));

	return (
		<div>
			<table>
				<tbody>
					<tr>
						<th colSpan={9} style={{ fontWeight: "bold", fontSize: "16pt"}}>
							<a href="#" style={{ textDecoration: "none", color: "blue" }} onClick={() => {
								dispatch(switchSemester());
							}}>
							{ semester } Semester
							</a>
						</th>
					</tr>
					<tr>
						<th style={{ width: "50px" }}>SNo.</th>
						<th style={{ width: "450px" }}>Title</th>
						{/* {secs.map(sec => (
								<tr>
								<th>{sec}</th>
								</tr>
						))} */}
						<td colSpan={7} style={{ width: "25px", textAlign: "right" }}>
							<a href="#" style={{ textDecoration: "none", color: "blue" }}>
								Clear All
							</a>
						</td>
					</tr>
					
				{sems.filter((s, id) => semester === 'Fall' ? id%2 == 0 : id%2 == 1).map((s, scnt) => {
					return (<Fragment key={s.sno}>
						<tr style={{ fontWeight: "bold" }}>
							<th colSpan={2}>{s.name} Semester</th>
							{secs[scnt].map((sec, seci) => (
								<th key={seci} style={{ width: "200px" }}>
									{sec}
								</th>
							))}
						</tr>
						{curriculum.filter(c => c.semno === s.sno).map((c, i) => (
						<tr key={c.cid} style={{ height: "25px" }}>
							<td style={{ textAlign: "center" }}>{i + 1}</td>
							<td>{c.title}</td>
							{secs[scnt].map((sec, i) => {
								const filteredArea = areas.filter(a => a.cid === c.cid).map(a => a.fid)
								// const available = await dispatch()
								const filteredFaculty = faculty.filter(f => filteredArea.includes(f.fid))

								const assignedTeacher = faculty.find(f => f.fid === offers.find(o => o.cid === c.cid && o.sec === sec)?.fid)?.TeacherName
								console.log(c.title,' ', sec, offers.find(o => o.cid === c.cid && o.sec === sec))
								return <td key={i}>

									{assignedTeacher ? assignedTeacher: (
										<AutoCompleteText setFaculty={async (f: Faculty) => {
											await dispatch(assignTeacher({fid:f.fid, cid: c.cid, sec: sec, semester:semester, semno:c.semno }))
											await dispatch(getOffers())
											// axios.put('/assign', {...f, cid: c.cid, sec: sec, semester:semester, semno:c.semno } 
											// )
										}} items={filteredFaculty}/>
									) }
									</td>} )}
								
						</tr>
					))}
					</Fragment>
					);
				})}
				</tbody>
			</table>
		</div>
	);
};
