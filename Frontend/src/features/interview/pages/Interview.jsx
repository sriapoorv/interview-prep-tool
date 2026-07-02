import React from 'react'
import '../style/interview.scss'

const Interview = () => {
  const report = {
    jobDescription:
      'Senior Frontend Engineer for a fast-growing fintech startup with strong React, TypeScript, and cloud-native architecture experience required.',
    matchScore: 78,
    technicalQuestions: [
      {
        question: 'Explain the difference between controlled and uncontrolled components in React.',
        intention: 'Show that you can manage component state and form behavior clearly.',
      },
      {
        question: 'Describe how the event loop works in JavaScript.',
        intention: 'Demonstrate understanding of async execution and browser behavior.',
      },
    ],
    behaviouralQuestions: [
      {
        question: 'Tell me about a time you delivered under a tight deadline.',
        intention: 'Highlight planning, communication, and problem-solving skills.',
      },
      {
        question: 'How do you handle feedback from peers or managers?',
        intention: 'Show collaboration and growth mindset.',
      },
    ],
    skillGaps: [
      { skill: 'Redis', severity: 'high' },
      { skill: 'Message queue', severity: 'medium' },
      { skill: 'Event loop', severity: 'low' },
    ],
    preparationPlans: [
      {
        day: 'Day 1',
        focus: 'Review core React hooks and component architecture',
        tasks: ['Study useEffect patterns', 'Refactor a small component tree'],
      },
      {
        day: 'Day 2',
        focus: 'Practice system design and asynchronous JavaScript',
        tasks: ['Read event loop notes', 'Build a queue-based flow chart'],
      },
    ],
  }

  const pickSeverityClass = (severity) => {
    if (severity === 'high') return 'severity-high'
    if (severity === 'medium') return 'severity-medium'
    return 'severity-low'
  }

  return (
    <main className="interview-report">
      <aside className="report-nav">
        <div className="nav-group">
          <span className="nav-title">Sections</span>
          <button type="button" className="nav-item active">Technical questions</button>
          <button type="button" className="nav-item">Behavioural questions</button>
          <button type="button" className="nav-item">Road Map</button>
        </div>
      </aside>

      <section className="report-main">
        <div className="report-header">
          <div>
            <p className="section-label">Interview strategy</p>
            <h1>Personalized interview briefing</h1>
          </div>
          <div className="score-card">
            <span>Match Score</span>
            <strong>{report.matchScore}%</strong>
          </div>
        </div>

        <div className="report-block report-summary">
          <p className="block-title">Target job description</p>
          <p className="block-copy">{report.jobDescription}</p>
        </div>

        <div className="report-block report-content">
          <div className="content-card">
            <p className="card-title">Technical questions</p>
            {report.technicalQuestions.map((item, index) => (
              <div key={index} className="question-item">
                <p className="question-text">{item.question}</p>
                <p className="question-intent">{item.intention}</p>
              </div>
            ))}
          </div>

          <div className="content-card">
            <p className="card-title">Behavioural questions</p>
            {report.behaviouralQuestions.map((item, index) => (
              <div key={index} className="question-item">
                <p className="question-text">{item.question}</p>
                <p className="question-intent">{item.intention}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="report-side">
        <div className="side-card skill-gaps-card">
          <div className="side-card-header">
            <p className="side-title">Skill Gaps</p>
          </div>
          <div className="tag-list">
            {report.skillGaps.map((gap, index) => (
              <span key={index} className={`tag ${pickSeverityClass(gap.severity)}`}>
                {gap.skill}
              </span>
            ))}
          </div>
        </div>

        <div className="side-card plan-card">
          <p className="side-title">Preparation plan</p>
          {report.preparationPlans.map((plan, index) => (
            <div key={index} className="plan-item">
              <p className="plan-day">{plan.day}</p>
              <p className="plan-focus">{plan.focus}</p>
              <ul>
                {plan.tasks.map((task, taskIndex) => (
                  <li key={taskIndex}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </main>
  )
}

export default Interview