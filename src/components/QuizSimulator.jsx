import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import questionsData from '../data/questions.json';
import { 
  CheckCircle2, XCircle, AlertTriangle, RotateCcw, 
  Flag, ChevronLeft, ChevronRight, Search, Play, Award, Zap 
} from 'lucide-react';

export default function QuizSimulator() {
  const [mode, setMode] = useState('menu'); // 'menu', 'exam', 'practice', 'search', 'results'
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { qIndex: 'A' }
  const [reviewedFlags, setReviewedFlags] = useState({}); // { qIndex: true }
  const [showAnswerInstantly, setShowAnswerInstantly] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 mins for 50 Qs
  const [timerActive, setTimerActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique topics
  const topics = ['ALL', ...Array.from(new Set(questionsData.map(q => q.topic || 'General')))];

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      finishQuiz();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startQuiz = (type, topic = 'ALL', count = 50) => {
    let pool = questionsData;
    if (topic !== 'ALL') {
      pool = questionsData.filter(q => q.topic === topic);
    }

    // Shuffle
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, pool.length));

    setQuizQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setReviewedFlags({});
    
    if (type === 'exam') {
      setMode('exam');
      setShowAnswerInstantly(false);
      setTimeLeft(60 * 60); // 60 mins
      setTimerActive(true);
    } else if (type === 'sprint') {
      setMode('exam');
      setShowAnswerInstantly(false);
      setTimeLeft(12 * 60); // 12 mins
      setTimerActive(true);
    } else if (type === 'practice') {
      setMode('practice');
      setShowAnswerInstantly(true);
      setTimerActive(false);
    }
  };

  const handleSelectOption = (optKey) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optKey
    }));
  };

  const toggleReviewFlag = () => {
    setReviewedFlags(prev => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  const finishQuiz = () => {
    setTimerActive(false);
    setMode('results');

    // Calculate score
    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        correct++;
      }
    });
    const percentage = Math.round((correct / quizQuestions.length) * 100);

    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if unavailable
      }
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // ---------------- Render Sub-views ----------------

  // 1. MENU VIEW
  if (mode === 'menu') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="brutal-card" style={{ background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span className="brutal-badge" style={{ background: '#FFE600' }}>DGCA TEST ENGINE</span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '4px' }}>
                EXAMINATION SIMULATOR
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="brutal-btn brutal-btn-white" onClick={() => setMode('search')}>
                <Search size={16} /> SEARCH 818 QUESTIONS
              </button>
            </div>
          </div>
          <p style={{ color: '#444', fontWeight: 600, marginBottom: '1.5rem' }}>
            Choose an exam mode tailored to your preparation schedule. Passing criterion is <b>70%</b> as per DGCA regulations.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {/* Mode 1: Full DGCA Mock */}
            <div className="brutal-card brutal-card-hover" style={{ background: '#FFF9C4', border: '3px solid #000' }}>
              <div className="brutal-badge" style={{ background: '#FF4757', color: '#FFF' }}>HOT 🔥</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '8px 0' }}>FULL DGCA MOCK EXAM</h3>
              <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '1rem', fontWeight: 600 }}>
                • 50 Randomized questions<br />
                • 60 Minutes countdown timer<br />
                • Pass mark: 70% (35/50 correct)<br />
                • Full DGCA question palette & final review
              </p>
              <button className="brutal-btn brutal-btn-red" style={{ width: '100%', justifyContent: 'center' }} onClick={() => startQuiz('exam', 'ALL', 50)}>
                <Play size={16} /> LAUNCH 50-Q MOCK
              </button>
            </div>

            {/* Mode 2: Rapid Sprint */}
            <div className="brutal-card brutal-card-hover" style={{ background: '#E0F7FA', border: '3px solid #000' }}>
              <div className="brutal-badge" style={{ background: '#00F0FF', color: '#000' }}>QUICK DRILL ⚡</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '8px 0' }}>10-QUESTION SPRINT</h3>
              <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '1rem', fontWeight: 600 }}>
                • 10 High-yield exam questions<br />
                • 12 Minutes rapid timer<br />
                • Quick cognitive test before flights<br />
                • Fast diagnostic scorecard
              </p>
              <button className="brutal-btn brutal-btn-cyan" style={{ width: '100%', justifyContent: 'center' }} onClick={() => startQuiz('sprint', 'ALL', 10)}>
                <Zap size={16} /> START 10-Q SPRINT
              </button>
            </div>

            {/* Mode 3: Topic Practice */}
            <div className="brutal-card brutal-card-hover" style={{ background: '#E8F5E9', border: '3px solid #000' }}>
              <div className="brutal-badge" style={{ background: '#00E676', color: '#000' }}>TOPIC MASTERY 🎯</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '8px 0' }}>CHAPTER-WISE DRILL</h3>
              <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '0.75rem', fontWeight: 600 }}>
                Drill specific domains with instant answer reveal and verified explanations:
              </p>
              <select 
                className="brutal-input" 
                style={{ marginBottom: '1rem', padding: '0.5rem', fontWeight: 700 }}
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
              >
                {topics.map(t => (
                  <option key={t} value={t}>{t} ({questionsData.filter(q => t === 'ALL' || q.topic === t).length} Qs)</option>
                ))}
              </select>
              <button className="brutal-btn brutal-btn-green" style={{ width: '100%', justifyContent: 'center' }} onClick={() => startQuiz('practice', selectedTopic, 40)}>
                <Play size={16} /> PRACTICE TOPIC
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. SEARCH ALL 818 QUESTIONS
  if (mode === 'search') {
    const filtered = questionsData.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(q.options || {}).some(opt => opt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (q.topic && q.topic.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
      <div className="brutal-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <span className="brutal-badge">DATABASE INSPECTOR</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>
              SEARCH 818 DGCA QUESTIONS
            </h2>
          </div>
          <button className="brutal-btn brutal-btn-white" onClick={() => setMode('menu')}>
            ← BACK TO QUIZ MENU
          </button>
        </div>

        <input 
          type="text" 
          className="brutal-input" 
          placeholder="Type keyword e.g. 'altimeter', 'QNH', 'dewpoint', 'radiation fog', 'CAVOK', 'jet stream'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          style={{ marginBottom: '1rem' }}
        />

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          Showing {filtered.length} matching questions from 818 total:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
          {filtered.slice(0, 50).map((q) => (
            <div key={q.id} className="brutal-card" style={{ background: '#FAF8F5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="brutal-badge" style={{ background: '#000', color: '#FFE600' }}>Q{q.id}</span>
                <span className="brutal-badge" style={{ background: '#00F0FF', color: '#000' }}>{q.topic || 'General'}</span>
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '8px' }}>{q.question}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px' }}>
                {Object.entries(q.options || {}).map(([key, text]) => {
                  const isCorrect = key === q.answer;
                  return (
                    <div 
                      key={key} 
                      style={{ 
                        padding: '6px 10px', 
                        border: '1.5px solid #000', 
                        background: isCorrect ? '#E8F5E9' : '#FFF',
                        borderColor: isCorrect ? '#2E7D32' : '#000',
                        fontWeight: isCorrect ? 800 : 500,
                        fontSize: '0.85rem'
                      }}
                    >
                      <b>[{key}]</b> {text} {isCorrect && '✓'}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {filtered.length > 50 && (
            <p style={{ textAlign: 'center', fontWeight: 700, color: '#888' }}>
              ...and {filtered.length - 50} more. Refine your search query above.
            </p>
          )}
        </div>
      </div>
    );
  }

  // 3. EXAM / PRACTICE VIEW
  const currentQ = quizQuestions[currentIndex];
  if (!currentQ) return null;

  const isCurrentAnswered = userAnswers[currentIndex] !== undefined;
  const isReviewed = reviewedFlags[currentIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Top Cockpit Status Bar */}
      <div className="brutal-card" style={{ background: '#000', color: '#FFF', padding: '0.8rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="brutal-badge" style={{ background: '#FFE600', color: '#000' }}>
            {mode === 'exam' ? 'OFFICIAL MOCK EXAM' : 'PRACTICE MODE'}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem' }}>
            QUESTION {currentIndex + 1} OF {quizQuestions.length}
          </span>
        </div>

        {timerActive && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: timeLeft < 300 ? '#FF4757' : '#111', padding: '4px 12px', border: '2px solid #FFE600' }}>
            <span style={{ color: '#FFE600', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 900 }}>
              ⏳ {formatTimer(timeLeft)}
            </span>
          </div>
        )}

        <button className="brutal-btn brutal-btn-red" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={finishQuiz}>
          SUBMIT & FINISH EXAM
        </button>
      </div>

      <div className="quiz-exam-layout">
        {/* Left Column: Active Question */}
        <div className="brutal-card" style={{ background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="brutal-badge" style={{ background: '#00F0FF', color: '#000' }}>
              TOPIC: {currentQ.topic || 'Aviation Meteorology'}
            </span>
            <button 
              className={`brutal-btn ${isReviewed ? 'brutal-btn-red' : 'brutal-btn-white'}`}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              onClick={toggleReviewFlag}
            >
              <Flag size={14} /> {isReviewed ? 'MARKED FOR REVIEW' : 'MARK FOR REVIEW'}
            </button>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.4, marginBottom: '1.5rem' }}>
            Q{currentQ.id || currentIndex + 1}. {currentQ.question}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.entries(currentQ.options || {}).map(([key, text]) => {
              const isSelected = userAnswers[currentIndex] === key;
              const hasAnswered = userAnswers[currentIndex] !== undefined;
              let extraClass = '';

              if (hasAnswered) {
                if (showAnswerInstantly) {
                  // In practice mode: evaluate ONLY after user makes a choice!
                  if (isSelected) {
                    extraClass = (key === currentQ.answer) ? 'correct' : 'wrong';
                  } else if (key === currentQ.answer) {
                    extraClass = 'correct';
                  }
                } else if (isSelected) {
                  // In exam mode: only highlight selected
                  extraClass = 'selected';
                }
              }

              return (
                <button
                  key={key}
                  className={`quiz-opt-btn ${extraClass}`}
                  onClick={() => handleSelectOption(key)}
                >
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontWeight: 900, 
                    background: '#000', 
                    color: '#FFE600', 
                    padding: '2px 8px',
                    border: '1px solid #000'
                  }}>
                    {key}
                  </span>
                  <span>{text}</span>
                </button>
              );
            })}
          </div>

          {/* Instant explanation in practice mode */}
          {showAnswerInstantly && userAnswers[currentIndex] && (
            <div className="brutal-card" style={{ background: '#FFFDE7', marginTop: '1rem', border: '2px solid #000' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: '#000' }}>
                <CheckCircle2 color="#2E7D32" size={18} />
                <span>VERIFIED ANSWER: OPTION [{currentQ.answer}]</span>
              </div>
              <p style={{ fontSize: '0.85rem', marginTop: '4px', color: '#444' }}>
                According to standard DGCA / IC Joshi syllabus and Volare answer key verification.
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #EEE' }}>
            <button 
              className="brutal-btn brutal-btn-white"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              style={{ opacity: currentIndex === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} /> PREVIOUS
            </button>

            {currentIndex < quizQuestions.length - 1 ? (
              <button 
                className="brutal-btn brutal-btn-cyan"
                onClick={() => setCurrentIndex(prev => prev + 1)}
              >
                NEXT <ChevronRight size={16} />
              </button>
            ) : (
              <button 
                className="brutal-btn brutal-btn-green"
                onClick={finishQuiz}
              >
                FINISH TEST ✓
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Question Palette */}
        <div className="brutal-card" style={{ background: '#FFFFFF', height: 'fit-content' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
            FLIGHT PALETTE
          </h4>

          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: 12, height: 12, background: '#00F0FF', border: '1px solid #000' }}></span> Done ({Object.keys(userAnswers).length})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: 12, height: 12, background: '#FF9F1A', border: '1px solid #000' }}></span> Review ({Object.values(reviewedFlags).filter(Boolean).length})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: 12, height: 12, background: '#FFF', border: '1px solid #000' }}></span> Remaining ({quizQuestions.length - Object.keys(userAnswers).length})
            </span>
          </div>

          <div className="q-grid">
            {quizQuestions.map((q, idx) => {
              let statusClass = '';
              if (idx === currentIndex) statusClass = 'active';
              else if (reviewedFlags[idx]) statusClass = 'reviewed';
              else if (userAnswers[idx] !== undefined) statusClass = 'answered';

              return (
                <div 
                  key={idx}
                  className={`q-grid-item ${statusClass}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {idx + 1}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <button className="brutal-btn brutal-btn-white" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }} onClick={() => setMode('menu')}>
              EXIT TO MENU
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. RESULTS VIEW
  if (mode === 'results') {
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) correctCount++;
    });
    const totalCount = quizQuestions.length;
    const scorePct = Math.round((correctCount / totalCount) * 100);
    const isPass = scorePct >= 70;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="brutal-card" style={{ background: isPass ? '#E8F5E9' : '#FFEBEE', border: '3px solid #000', textAlign: 'center', padding: '2rem' }}>
          <div className="brutal-badge" style={{ background: isPass ? '#00E676' : '#FF4757', color: isPass ? '#000' : '#FFF', fontSize: '1rem', padding: '0.4rem 1rem', marginBottom: '1rem' }}>
            {isPass ? 'DGCA RESULT: PASS ✈️' : 'DGCA RESULT: NEEDS REVISION ⚠️'}
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '6px' }}>
            SCORE: {correctCount} / {totalCount} ({scorePct}%)
          </h2>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', color: isPass ? '#1B5E20' : '#B71C1C' }}>
            {isPass 
              ? 'Outstanding performance, Captain Daivam Mehta! You meet DGCA CPL/ATPL knowledge certification criteria.'
              : 'Keep pushing, Cadet Daivam Mehta! DGCA exam requires a minimum of 70% (35/50). Review the errors below and try again!'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button className="brutal-btn brutal-btn-yellow" onClick={() => startQuiz(quizQuestions.length > 20 ? 'exam' : 'sprint')}>
              <RotateCcw size={16} /> RETAKE EXAM
            </button>
            <button className="brutal-btn brutal-btn-white" onClick={() => setMode('menu')}>
              RETURN TO COCKPIT MENU
            </button>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="brutal-card" style={{ background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>
            DETAILED ANSWER AUDIT & SOLUTIONS
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {quizQuestions.map((q, idx) => {
              const uAns = userAnswers[idx];
              const isCorrect = uAns === q.answer;

              return (
                <div 
                  key={idx} 
                  className="brutal-card" 
                  style={{ 
                    background: isCorrect ? '#F1F8E9' : '#FFEBEE', 
                    border: '2px solid #000' 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="brutal-badge" style={{ background: '#000', color: '#FFE600' }}>Q{idx + 1}</span>
                    <span className="brutal-badge" style={{ background: isCorrect ? '#00E676' : '#FF4757', color: isCorrect ? '#000' : '#FFF' }}>
                      {isCorrect ? 'CORRECT ✓' : 'INCORRECT ✗'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '8px' }}>{q.question}</h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px', marginBottom: '8px' }}>
                    {Object.entries(q.options || {}).map(([key, text]) => {
                      const isCorrectOpt = key === q.answer;
                      const isUserOpt = key === uAns;
                      let bg = '#FFF';
                      if (isCorrectOpt) bg = '#C8E6C9';
                      else if (isUserOpt && !isCorrectOpt) bg = '#FFCDD2';

                      return (
                        <div 
                          key={key} 
                          style={{ 
                            padding: '6px 10px', 
                            border: '1.5px solid #000', 
                            background: bg,
                            fontWeight: (isCorrectOpt || isUserOpt) ? 800 : 500,
                            fontSize: '0.85rem'
                          }}
                        >
                          <b>[{key}]</b> {text} {isCorrectOpt && '✓ (Correct)'} {isUserOpt && !isCorrectOpt && '✗ (Your Pick)'}
                        </div>
                      );
                    })}
                  </div>

                  {!isCorrect && (
                    <p style={{ fontSize: '0.85rem', color: '#B71C1C', fontWeight: 700 }}>
                      ⚠️ Your answer was [{uAns || 'Skipped'}]. Correct answer according to DGCA/Volare is [{q.answer}].
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
