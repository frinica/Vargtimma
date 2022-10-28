import express from "express";
import { ObjectId } from "mongodb";
import { ReportedUserDB } from "../database/ReportedUserDB";
import { authUser } from "../middlewares";
import IReportedUser from "../models/ReportModel";
const router = express.Router();

// Insert a new report
router.post("/insert", authUser, async (req, res) => {
  const { userID, reporterID, reason } = req.body;
  try {
    const report: IReportedUser = {
      userID,
      reporterID,
      reason,
    };
    const reportID = await ReportedUserDB.insertReportedUser(report);

    res.status(200).send({ reportID });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Fetch reports
router.get("/fetch", authUser, async (req, res) => {
  try {
    const reports = await ReportedUserDB.getReports();
    res.status(200).send(reports);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a report
router.delete("/:id", authUser, async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    await ReportedUserDB.deleteReport(id);

    res.status(200).send("Report deleted");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
