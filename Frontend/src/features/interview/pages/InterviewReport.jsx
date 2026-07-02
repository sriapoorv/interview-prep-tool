import { Link, useLocation } from "react-router";
import "../style/interview.scss";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const pickSeverityClass = (severity) => {
  if (severity === "high") return "severity-high";
  if (severity === "medium") return "severity-medium";
  return "severity-low";
};

const severityOrder = { high: 0, medium: 1, low: 2 };

const InterviewReport = () => {
  const { state } = useLocation();
  const report = state?.report;
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  if (!report) {
    return (
      <main className="report-empty">
        <div className="report-empty-card">
          <p className="section-label">No report found</p>
          <h1>Nothing to show yet</h1>
          <p className="block-copy">
            Generate a new interview strategy from the home page to see your personalized report here.
          </p>
          <Link to="/" className="button primary-button">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const sortedSkillGaps = [...(report.skillGaps || [])].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  return (
    <main className="interview-report">
      <aside className="report-nav">
  <div className="nav-group">
    <span className="nav-title">Sections</span>
    <button
      type="button"
      className="nav-item"
      onClick={() => document.getElementById("technical-questions")?.scrollIntoView({ behavior: "smooth" })}
    >
      Technical questions
    </button>
    <button
      type="button"
      className="nav-item"
      onClick={() => document.getElementById("behavioural-questions")?.scrollIntoView({ behavior: "smooth" })}
    >
      Behavioural questions
    </button>
    <button
      type="button"
      className="nav-item"
      onClick={() => document.getElementById("skill-gaps")?.scrollIntoView({ behavior: "smooth" })}
    >
      Skill gaps
    </button>
    <button
      type="button"
      className="nav-item"
      onClick={() => document.getElementById("prep-plan")?.scrollIntoView({ behavior: "smooth" })}
    >
      Preparation plan
    </button>
  </div>
</aside>

      <section className="report-main">
        <div className="report-header">
          <div>
            <p className="section-label">Interview strategy</p>
            <h1>{report.title}</h1>
          </div>
          <div className="score-card">
            <span>Match Score</span>
            <strong>{report.matchScore}%</strong>
          </div>
          <button type="button" className="button logout-button" onClick={onLogout}>
      Logout
    </button>
        </div>

        {report.jobDescription && (
          <div className="report-block report-summary">
            <p className="block-title">Target job description</p>
            <p className="block-copy">{report.jobDescription}</p>
          </div>
        )}

        <div id="technical-questions" className="report-block report-content">
          <div className="content-card">
            <p className="card-title">Technical questions</p>
            {report.technicalQuestions?.map((item, index) => (
              <div key={index} className="question-item">
                <p className="question-text">{item.question}</p>
                <p className="question-intent">{item.intention}</p>
                <p className="question-answer">{item.answer}</p>
              </div>
            ))}
          </div>

          <div id="behavioural-questions" className="content-card">
            <p className="card-title">Behavioural questions</p>
            {report.behaviouralQuestions?.map((item, index) => (
              <div key={index} className="question-item">
                <p className="question-text">{item.question}</p>
                <p className="question-intent">{item.intention}</p>
                <p className="question-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="report-side">
        <div id="skill-gaps" className="side-card skill-gaps-card">
          <div className="side-card-header">
            <p className="side-title">Skill gaps</p>
          </div>
          <div className="tag-list">
            {sortedSkillGaps.map((gap, index) => (
              <span key={index} className={`tag ${pickSeverityClass(gap.severity)}`}>
                {gap.skill}
              </span>
            ))}
          </div>
        </div>

        <div id="prep-plan" className="side-card plan-card">
          <p className="side-title">Preparation plan</p>
          {report.preparationPlan?.map((plan, index) => (
            <div key={index} className="plan-item">
              <p className="plan-day">Day {plan.day}</p>
              <p className="plan-focus">{plan.focus}</p>
              <ul>
                {plan.tasks?.map((task, taskIndex) => (
                  <li key={taskIndex}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
};

export default InterviewReport;