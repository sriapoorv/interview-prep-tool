import React from 'react'
import '../style/home.scss'

const InterviewForm = ({
  jobDescription = '',
  selfDescription = '',
  resumeFileName = '',
  onJobDescriptionChange = () => {},
  onSelfDescriptionChange = () => {},
  onResumeSelect = () => {},
  onSubmit = () => {},
  maxDescriptionChars = 5000,
}) => {
  const descriptionLength = jobDescription.length

  return (
    <main className="home">
      <section className="interview-page">
        <div className="interview-panel target-job">
          <div className="panel-header">
            <div>
              <p className="panel-label">Target Job Description</p>
              <span className="panel-badge required">REQUIRED</span>
            </div>
          </div>

          <textarea
            id="jobDescription"
            name="jobDescription"
            className="panel-textarea"
            value={jobDescription}
            onChange={onJobDescriptionChange}
            placeholder="Paste the full job description here..."
            maxLength={maxDescriptionChars}
          />

          <div className="panel-footer">
            <p className="help-text">
              e.g. 'Senior Frontend Engineer at Google requires proficiency in React,
              TypeScript, and large-scale system design...'
            </p>
            <span className="char-count">{descriptionLength} / {maxDescriptionChars} chars</span>
          </div>
        </div>

        <div className="interview-panel candidate-profile">
          <div className="panel-header profile-header">
            <div>
              <p className="panel-label">Your Profile</p>
              <span className="panel-badge">Best results</span>
            </div>
          </div>

          <div className="upload-card">
            <div className="upload-card-title">Upload Resume</div>
            <div className="upload-card-subtitle">PDF only (Max 5MB)</div>
            <label htmlFor="resume" className="upload-dropzone">
              <span className="upload-icon">⤴</span>
              <span>{resumeFileName || 'Click to upload or drag & drop'}</span>
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={onResumeSelect}
            />
          </div>

          <div className="divider"><span>OR</span></div>

          <div className="input-group">
            <p className="input-label">Quick Self-Description</p>
            <textarea
              id="selfDescription"
              name="selfDescription"
              className="panel-textarea"
              value={selfDescription}
              onChange={onSelfDescriptionChange}
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
            />
          </div>

          <div className="info-card">
          Resume upload is required to generate an interview strategy.
          </div>

          <button className="button primary-button" type="button" onClick={onSubmit}>
            Generate My Interview Strategy
          </button>
        </div>
      </section>
    </main>
  )
}

export default InterviewForm
