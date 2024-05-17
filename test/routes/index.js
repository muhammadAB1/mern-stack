import express from 'express'
const router = express.Router();
import { db } from "../models/index.js"
import { Offer } from '../models/Offer.js';

router.get('/curriculum', async (req, res) => {
    const curriculum = await db.Curriculum.aggregate([
        { $lookup: { from: "courses", foreignField: "cid", localField: "cid", as: "course" } },
        { $unwind: "$course" }, { $project: { _id: 1, curid: 1, cid: 1, title: "$course.title", semno: 1 } }]).sort('semno')
    res.status(200).json(curriculum);
});

router.get('/faculties', async (req, res) => {
    const faculties = await db.Faculty.find()
    res.status(200).json(faculties);
});

router.get('/areas', async (req, res) => {
    const areas = await db.Area.find();
    res.status(200).json(areas)
})

router.put('/assign', async (req, res) => {
    console.log(req.body)
    const assign = await db.Offer.create({
        semno: req.body.semno,
        cid: req.body.cid,
        fid: req.body.fid,
        sec: req.body.sec,
        semester: req.body.semester
    })
    res.status(200).json(assign);
})

router.get('/offers', async (req, res) => {
    const offers = await db.Offer.find();
    res.status(200).json(offers)
})

router.get('/availableFaculty', async (req, res) => {
    const availableFaculty = await db.Faculty.aggregate([
        {
            $lookup: {
                from: "offers", foreignField: "fid", localField: "fid",
                pipeline: [{ $group: { _id: { fid: "$fid" }, count: { $count: {} } } },
                { $project: { _id: 0, fid: "$_id.fid", assign: "$count" } }], as: 'alot'
            }
        },
        { $unwind: { path: "$alot", preserveNullAndEmptyArrays: true } },
        { $project: { _id: 1, fid: 1, TeacherName: 1, fulltime: 1, alot: "$alot.assign" } }
    ]).sort({ fid: 1 })
    res.status(200).json(availableFaculty)
})
// router.get('/update', async (req, res) => {
//     try {
//         const data = await (db.Offer.find());
//         if(data.semester == 'Fall'){
//             data.semester = 'Spring'
//         }
//         else
//         data.semester = 'Fall'
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// });

export default router;