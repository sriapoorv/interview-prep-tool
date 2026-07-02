const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterViewReportController(req, res) {
    try {
        console.log(req.file);
        
        const parser = new pdfParse.PDFParse({ data: req.file.buffer });
        const resumeContent = await parser.getText();
        await parser.destroy();

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi,
        });

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to generate interview report",
        });
    }
}

module.exports = { generateInterViewReportController }