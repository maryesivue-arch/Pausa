/**
 * PAUSA - FASTING DASHBOARD LOGIC
 * Vanilla JavaScript implementation with persistent localStorage state,
 * live countdown/elapsed timer, dynamic SVG ring, interactive plan switching,
 * weekly bar chart rendering, and full history pagination + CSV export.
 */

// Initial Seed Data (matching the reference mockups)
const DEFAULT_PLANS = {
  '12:12': {
    name: '12:12',
    title: 'Ease into fasting',
    fastHours: 12,
    eatHours: 12,
    startHour: 20, // 8:00 PM
    endHour: 8,    // 8:00 AM
    timeRangeText: '8:00 PM – 8:00 AM',
    eatRangeText: '8:00 AM – 8:00 PM'
  },
  '14:10': {
    name: '14:10',
    title: 'Find your balance',
    fastHours: 14,
    eatHours: 10,
    startHour: 20, // 8:00 PM
    endHour: 10,   // 10:00 AM
    timeRangeText: '8:00 PM – 10:00 AM',
    eatRangeText: '10:00 AM – 8:00 PM'
  },
  '16:8': {
    name: '16:8',
    title: 'Keep a steady rhythm',
    fastHours: 16,
    eatHours: 8,
    startHour: 20, // 8:00 PM
    endHour: 12,   // 12:00 PM
    timeRangeText: '8:00 PM – 12:00 PM',
    eatRangeText: '12:00 PM – 8:00 PM'
  }
};

const SEED_HISTORY = [
  {
    id: 1,
    dateMain: 'Oct 1, 2026',
    dateSub: 'Thursday',
    start: 'Sep 30, 8:00 PM',
    end: 'Oct 1, 12:32 PM',
    duration: '16h 32m',
    durationSeconds: 16.53 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 2,
    dateMain: 'Sep 30, 2026',
    dateSub: 'Wednesday',
    start: 'Sep 29, 8:00 PM',
    end: 'Sep 30, 12:08 PM',
    duration: '16h 08m',
    durationSeconds: 16.13 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 3,
    dateMain: 'Sep 29, 2026',
    dateSub: 'Tuesday',
    start: 'Sep 28, 8:00 PM',
    end: 'Sep 29, 10:05 AM',
    duration: '14h 05m',
    durationSeconds: 14.08 * 3600,
    plan: '14:10',
    status: 'Goal met'
  },
  {
    id: 4,
    dateMain: 'Sep 28, 2026',
    dateSub: 'Monday',
    start: 'Sep 27, 8:00 PM',
    end: 'Sep 28, 12:12 PM',
    duration: '16h 12m',
    durationSeconds: 16.20 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 5,
    dateMain: 'Sep 27, 2026',
    dateSub: 'Sunday',
    start: 'Sep 26, 8:00 PM',
    end: 'Sep 27, 12:00 PM',
    duration: '16h 00m',
    durationSeconds: 16 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 6,
    dateMain: 'Sep 26, 2026',
    dateSub: 'Saturday',
    start: 'Sep 25, 8:00 PM',
    end: 'Sep 26, 11:45 AM',
    duration: '15h 45m',
    durationSeconds: 15.75 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 7,
    dateMain: 'Sep 25, 2026',
    dateSub: 'Friday',
    start: 'Sep 24, 8:00 PM',
    end: 'Sep 25, 12:15 PM',
    duration: '16h 15m',
    durationSeconds: 16.25 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 8,
    dateMain: 'Sep 24, 2026',
    dateSub: 'Thursday',
    start: 'Sep 23, 8:00 PM',
    end: 'Sep 24, 12:00 PM',
    duration: '16h 00m',
    durationSeconds: 16 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 9,
    dateMain: 'Sep 23, 2026',
    dateSub: 'Wednesday',
    start: 'Sep 22, 8:00 PM',
    end: 'Sep 23, 12:10 PM',
    duration: '16h 10m',
    durationSeconds: 16.16 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 10,
    dateMain: 'Sep 22, 2026',
    dateSub: 'Tuesday',
    start: 'Sep 21, 8:00 PM',
    end: 'Sep 22, 10:00 AM',
    duration: '14h 00m',
    durationSeconds: 14 * 3600,
    plan: '14:10',
    status: 'Goal met'
  },
  {
    id: 11,
    dateMain: 'Sep 21, 2026',
    dateSub: 'Monday',
    start: 'Sep 20, 8:00 PM',
    end: 'Sep 21, 12:00 PM',
    duration: '16h 00m',
    durationSeconds: 16 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 12,
    dateMain: 'Sep 20, 2026',
    dateSub: 'Sunday',
    start: 'Sep 19, 8:00 PM',
    end: 'Sep 20, 12:05 PM',
    duration: '16h 05m',
    durationSeconds: 16.08 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 13,
    dateMain: 'Sep 19, 2026',
    dateSub: 'Saturday',
    start: 'Sep 18, 8:00 PM',
    end: 'Sep 19, 12:00 PM',
    duration: '16h 00m',
    durationSeconds: 16 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 14,
    dateMain: 'Sep 18, 2026',
    dateSub: 'Friday',
    start: 'Sep 17, 8:00 PM',
    end: 'Sep 18, 12:18 PM',
    duration: '16h 18m',
    durationSeconds: 16.3 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 15,
    dateMain: 'Sep 17, 2026',
    dateSub: 'Thursday',
    start: 'Sep 16, 8:00 PM',
    end: 'Sep 17, 12:00 PM',
    duration: '16h 00m',
    durationSeconds: 16 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 16,
    dateMain: 'Sep 16, 2026',
    dateSub: 'Wednesday',
    start: 'Sep 15, 8:00 PM',
    end: 'Sep 16, 12:00 PM',
    duration: '16h 00m',
    durationSeconds: 16 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 17,
    dateMain: 'Sep 15, 2026',
    dateSub: 'Tuesday',
    start: 'Sep 14, 8:00 PM',
    end: 'Sep 15, 12:00 PM',
    duration: '16h 00m',
    durationSeconds: 16 * 3600,
    plan: '16:8',
    status: 'Goal met'
  },
  {
    id: 18,
    dateMain: 'Sep 14, 2026',
    dateSub: 'Monday',
    start: 'Sep 13, 8:00 PM',
    end: 'Sep 14, 12:20 PM',
    duration: '16h 20m',
    durationSeconds: 16.33 * 3600,
    plan: '16:8',
    status: 'Goal met'
  }
];

// App State
let state = {
  currentScreen: 'dashboard',
  activePlan: '16:8',
  isFasting: true,
  // Default start time: 12 hours, 36 minutes, 8 seconds ago
  fastStartTime: Date.now() - (12 * 3600 + 36 * 60 + 8) * 1000,
  history: SEED_HISTORY,
  streak: 4,
  longestStreak: 7,
  currentPage: 1,
  itemsPerPage: 4
};

// Load saved state from LocalStorage if available
function loadState() {
  const savedState = localStorage.getItem('pausa_fasting_state');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      state = { ...state, ...parsed };
    } catch (e) {
      console.error('Failed to parse saved state', e);
    }
  }
}

// Save state to LocalStorage
function saveState() {
  localStorage.setItem('pausa_fasting_state', JSON.stringify({
    activePlan: state.activePlan,
    isFasting: state.isFasting,
    fastStartTime: state.fastStartTime,
    history: state.history,
    streak: state.streak,
    longestStreak: state.longestStreak
  }));
}

// Format duration helper (HH:MM:SS)
function formatTime(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Helper: Format hours & minutes
function formatHoursMins(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  return `${hrs}h ${String(mins).padStart(2, '0')}m`;
}

// Initialize Timer & Visuals
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 94; // 590.62px

function updateFastingTimer() {
  const timerDisplay = document.getElementById('timer-display');
  const timerGoalText = document.getElementById('timer-goal-text');
  const timerRemainingPill = document.getElementById('timer-remaining-pill');
  const ringCircle = document.getElementById('fast-ring-circle');
  const rhythmFooterMsg = document.getElementById('rhythm-footer-msg');
  const fastStatusText = document.getElementById('fast-status-text');
  const fastStatusBadge = document.getElementById('fast-status-badge');
  const toggleFastBtn = document.getElementById('toggle-fast-btn');

  const planInfo = DEFAULT_PLANS[state.activePlan] || DEFAULT_PLANS['16:8'];
  const targetSeconds = planInfo.fastHours * 3600;

  if (!state.isFasting) {
    timerDisplay.textContent = '00:00:00';
    timerGoalText.textContent = `Target: ${planInfo.fastHours}-hour fast`;
    timerRemainingPill.textContent = 'Fast ended';
    ringCircle.style.strokeDashoffset = CIRCLE_CIRCUMFERENCE;
    fastStatusText.textContent = 'Eating window';
    fastStatusBadge.style.backgroundColor = '#f4f4f7';
    fastStatusBadge.style.color = '#717887';
    toggleFastBtn.textContent = 'Start fast';
    rhythmFooterMsg.textContent = 'Enjoy your meals mindfully.';
    return;
  }

  toggleFastBtn.textContent = 'End fast';
  fastStatusText.textContent = 'Fasting in progress';
  fastStatusBadge.style.backgroundColor = '#f3effc';
  fastStatusBadge.style.color = '#6c47c5';

  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - state.fastStartTime) / 1000));
  timerDisplay.textContent = formatTime(elapsedSeconds);
  timerGoalText.textContent = `of your ${planInfo.fastHours}-hour goal`;

  const remainingSeconds = targetSeconds - elapsedSeconds;
  if (remainingSeconds > 0) {
    const remHrs = Math.floor(remainingSeconds / 3600);
    const remMins = Math.floor((remainingSeconds % 3600) / 60);
    const remText = `${remHrs}h ${remMins}m to go`;
    timerRemainingPill.textContent = remText;
    rhythmFooterMsg.textContent = `Your eating window opens in ${remText.replace(' to go', '')}.`;
  } else {
    const overSeconds = Math.abs(remainingSeconds);
    const overHrs = Math.floor(overSeconds / 3600);
    const overMins = Math.floor((overSeconds % 3600) / 60);
    timerRemainingPill.textContent = overHrs > 0 ? `+${overHrs}h ${overMins}m over goal` : `Goal completed!`;
    rhythmFooterMsg.textContent = 'Your fasting goal is reached! Break fast when ready.';
  }

  // Update ring stroke
  const progressRatio = Math.min(elapsedSeconds / targetSeconds, 1);
  const strokeOffset = CIRCLE_CIRCUMFERENCE - (progressRatio * CIRCLE_CIRCUMFERENCE);
  ringCircle.style.strokeDashoffset = strokeOffset;
}

// Update schedule labels based on active plan & start time
function updateScheduleDisplays() {
  const plan = DEFAULT_PLANS[state.activePlan] || DEFAULT_PLANS['16:8'];

  // Dashboard top-right button
  const activePlanBadgeText = document.getElementById('active-plan-badge-text');
  if (activePlanBadgeText) {
    activePlanBadgeText.textContent = `${plan.name} plan`;
  }

  // Dashboard Rhythm Card
  document.getElementById('rhythm-fasting-details').textContent = `${plan.timeRangeText} · ${plan.fastHours} hours`;
  document.getElementById('rhythm-eating-details').textContent = `${plan.eatRangeText} · ${plan.eatHours} hours`;

  // Dashboard Schedule bar in fast card
  document.getElementById('start-time-display').textContent = '8:00 PM';
  const goalEndText = plan.name === '12:12' ? '8:00 AM' : plan.name === '14:10' ? '10:00 AM' : '12:00 PM';
  document.getElementById('goal-time-display').textContent = goalEndText;

  // Plan screen daily schedule card
  document.getElementById('plan-schedule-repeat-text').textContent = `${plan.name} plan · Repeats every day`;
  document.getElementById('timeline-fast-text').textContent = `Fast: ${plan.timeRangeText}`;
  document.getElementById('timeline-eat-text').textContent = `Eat: ${plan.eatRangeText}`;

  // Update 24h timeline segments
  const timelineBar = document.getElementById('timeline-24h-bar');
  if (timelineBar) {
    if (plan.name === '12:12') {
      timelineBar.innerHTML = `
        <div class="timeline-seg fast" style="flex: 8;">Fasting</div>
        <div class="timeline-seg eat" style="flex: 12;">Eating</div>
        <div class="timeline-seg fast" style="flex: 4;"></div>
      `;
    } else if (plan.name === '14:10') {
      timelineBar.innerHTML = `
        <div class="timeline-seg fast" style="flex: 10;">Fasting</div>
        <div class="timeline-seg eat" style="flex: 10;">Eating</div>
        <div class="timeline-seg fast" style="flex: 4;"></div>
      `;
    } else {
      timelineBar.innerHTML = `
        <div class="timeline-seg fast" style="flex: 12;">Fasting</div>
        <div class="timeline-seg eat" style="flex: 8;">Eating</div>
        <div class="timeline-seg fast" style="flex: 4;"></div>
      `;
    }
  }

  // Update Plan cards selected state
  document.querySelectorAll('.plan-card').forEach(card => {
    const cardPlan = card.getAttribute('data-plan');
    const badge = card.querySelector('.plan-badge');
    const radio = card.querySelector('.plan-radio');
    const ratio = card.querySelector('.plan-ratio');
    const btn = card.querySelector('.btn-plan-select');

    if (cardPlan === state.activePlan) {
      card.classList.add('current-selected');
      if (badge) {
        badge.textContent = 'YOUR CURRENT PLAN';
        badge.classList.add('current');
      }
      if (radio) radio.classList.add('current');
      if (ratio) ratio.classList.add('purple-highlight');
      if (btn) {
        btn.classList.add('selected');
        btn.innerHTML = '<span>✓ Current plan</span>';
      }
    } else {
      card.classList.remove('current-selected');
      if (badge) {
        badge.textContent = cardPlan === '12:12' ? 'BEGINNER FRIENDLY' : 'A LITTLE MORE STRUCTURE';
        badge.classList.remove('current');
      }
      if (radio) radio.classList.remove('current');
      if (ratio) ratio.classList.remove('purple-highlight');
      if (btn) {
        btn.classList.remove('selected');
        btn.textContent = 'Select plan';
      }
    }
  });

  // Update Progress screen chart daily goal text
  const chartGoalText = document.getElementById('chart-daily-goal-text');
  if (chartGoalText) {
    chartGoalText.textContent = `Daily goal: ${plan.fastHours} hours`;
  }
}

// Screen Navigation
function navigateToScreen(screenId) {
  state.currentScreen = screenId;

  // Toggle nav buttons active class
  document.querySelectorAll('.nav-item').forEach(btn => {
    if (btn.getAttribute('data-screen') === screenId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Toggle screen containers
  document.querySelectorAll('.screen').forEach(sec => {
    sec.classList.remove('active');
  });

  const targetSection = document.getElementById(`screen-${screenId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update breadcrumb title
  const breadcrumb = document.getElementById('breadcrumb-title');
  if (breadcrumb) {
    if (screenId === 'dashboard') breadcrumb.textContent = 'Dashboard';
    if (screenId === 'plans') breadcrumb.textContent = 'Fasting plans';
    if (screenId === 'progress') breadcrumb.textContent = 'Progress';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Metrics & Stats on Progress Screen
function renderMetrics() {
  const completedCountEl = document.getElementById('metric-completed-count');
  const avgTimeEl = document.getElementById('metric-avg-time');
  const streakEl = document.getElementById('metric-streak-count');
  const longestStreakEl = document.getElementById('metric-longest-streak');
  const totalSessionsEl = document.getElementById('history-total-sessions');

  const totalSessions = state.history.length;
  completedCountEl.textContent = totalSessions;
  totalSessionsEl.textContent = `${totalSessions} sessions`;

  // Compute average duration
  if (totalSessions > 0) {
    const totalSeconds = state.history.reduce((sum, item) => sum + (item.durationSeconds || 16 * 3600), 0);
    const avgSeconds = totalSeconds / totalSessions;
    avgTimeEl.textContent = formatHoursMins(avgSeconds);
  } else {
    avgTimeEl.textContent = '0h 00m';
  }

  streakEl.textContent = `${state.streak} days`;
  longestStreakEl.textContent = `Your longest streak is ${state.longestStreak} days`;
}

// Render History Table with Pagination
function renderHistoryTable() {
  const tbody = document.getElementById('history-table-body');
  const paginationInfo = document.getElementById('pagination-info-text');
  const paginationPage = document.getElementById('pagination-page-text');
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');

  const total = state.history.length;
  const totalPages = Math.max(1, Math.ceil(total / state.itemsPerPage));

  // Ensure current page is valid
  if (state.currentPage > totalPages) state.currentPage = totalPages;
  if (state.currentPage < 1) state.currentPage = 1;

  const startIdx = (state.currentPage - 1) * state.itemsPerPage;
  const endIdx = Math.min(startIdx + state.itemsPerPage, total);
  const currentItems = state.history.slice(startIdx, endIdx);

  tbody.innerHTML = '';

  if (currentItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 28px; color: #8c93a3;">No fasting sessions logged yet.</td></tr>`;
  } else {
    currentItems.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div class="table-date-cell">
            <span class="table-date-main">${item.dateMain}</span>
            <span class="table-date-sub">${item.dateSub}</span>
          </div>
        </td>
        <td>${item.start}</td>
        <td>${item.end}</td>
        <td class="duration-bold">${item.duration}</td>
        <td>${item.plan}</td>
        <td>
          <span class="status-tag met">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${item.status}</span>
          </span>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  paginationInfo.textContent = total > 0 ? `Showing ${startIdx + 1}–${endIdx} of ${total} sessions` : 'Showing 0 of 0 sessions';
  paginationPage.textContent = `Page ${state.currentPage} of ${totalPages}`;

  prevBtn.disabled = state.currentPage <= 1;
  nextBtn.disabled = state.currentPage >= totalPages;
}

// Export History to CSV
function exportHistoryCSV() {
  if (state.history.length === 0) {
    alert('No fasting history to export.');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'Date,Day,Start Time,End Time,Duration,Plan,Status\n';

  state.history.forEach(row => {
    csvContent += `"${row.dateMain}","${row.dateSub}","${row.start}","${row.end}","${row.duration}","${row.plan}","${row.status}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'pausa_fasting_history.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Modal handling
function openEditModal(isSchedule = false) {
  const modal = document.getElementById('edit-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalTimeInput = document.getElementById('modal-time-input');

  if (isSchedule) {
    modalTitle.textContent = 'Edit daily schedule';
  } else {
    modalTitle.textContent = 'Edit fast start time';
  }

  // Pre-fill with current start time
  const startDate = new Date(state.fastStartTime);
  const formattedDateStr = startDate.toISOString().slice(0, 16);
  modalTimeInput.value = formattedDateStr;

  modal.classList.add('active');
}

function closeEditModal() {
  document.getElementById('edit-modal').classList.remove('active');
}

// Event Listeners Setup
function initEventListeners() {
  // Navigation tabs
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.getAttribute('data-screen');
      navigateToScreen(screen);
    });
  });

  // Dashboard top-right plan pill button
  document.getElementById('dashboard-plan-btn').addEventListener('click', () => {
    navigateToScreen('plans');
  });

  // Week card view progress button
  document.getElementById('week-view-progress-btn').addEventListener('click', () => {
    navigateToScreen('progress');
  });

  // Fast toggle button (Start / End fast)
  document.getElementById('toggle-fast-btn').addEventListener('click', () => {
    if (state.isFasting) {
      // Ending the fast
      const elapsedSeconds = Math.max(0, Math.floor((Date.now() - state.fastStartTime) / 1000));
      const now = new Date();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const newLog = {
        id: Date.now(),
        dateMain: `${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`,
        dateSub: dayNames[now.getDay()],
        start: 'Yesterday, 8:00 PM',
        end: `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        duration: formatHoursMins(elapsedSeconds),
        durationSeconds: elapsedSeconds,
        plan: state.activePlan,
        status: 'Goal met'
      };

      state.history.unshift(newLog);
      state.isFasting = false;
      state.streak += 1;
      if (state.streak > state.longestStreak) {
        state.longestStreak = state.streak;
      }

      saveState();
      updateFastingTimer();
      renderMetrics();
      renderHistoryTable();
    } else {
      // Starting a new fast
      state.isFasting = true;
      state.fastStartTime = Date.now();
      saveState();
      updateFastingTimer();
    }
  });

  // Edit start time button
  document.getElementById('edit-start-time-btn').addEventListener('click', () => {
    openEditModal(false);
  });

  // Edit schedule button on plans screen
  document.getElementById('edit-schedule-btn').addEventListener('click', () => {
    openEditModal(true);
  });

  // Modal actions
  document.getElementById('modal-close-btn').addEventListener('click', closeEditModal);
  document.getElementById('modal-cancel-btn').addEventListener('click', closeEditModal);
  document.getElementById('modal-save-btn').addEventListener('click', () => {
    const inputVal = document.getElementById('modal-time-input').value;
    if (inputVal) {
      state.fastStartTime = new Date(inputVal).getTime();
      saveState();
      updateFastingTimer();
    }
    closeEditModal();
  });

  // Plan card selection buttons
  document.querySelectorAll('.btn-plan-select').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedPlan = btn.getAttribute('data-select-plan');
      if (selectedPlan && DEFAULT_PLANS[selectedPlan]) {
        state.activePlan = selectedPlan;
        saveState();
        updateScheduleDisplays();
        updateFastingTimer();
      }
    });
  });

  // Pagination buttons
  document.getElementById('prev-page-btn').addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      renderHistoryTable();
    }
  });

  document.getElementById('next-page-btn').addEventListener('click', () => {
    const totalPages = Math.ceil(state.history.length / state.itemsPerPage);
    if (state.currentPage < totalPages) {
      state.currentPage++;
      renderHistoryTable();
    }
  });

  // Export history button
  document.getElementById('export-history-btn').addEventListener('click', exportHistoryCSV);

  // Beginner guide modal
  const guideModal = document.getElementById('guide-modal');
  document.getElementById('read-guide-btn').addEventListener('click', (e) => {
    e.preventDefault();
    guideModal.classList.add('active');
  });
  document.getElementById('guide-modal-close').addEventListener('click', () => {
    guideModal.classList.remove('active');
  });
  document.getElementById('guide-modal-ok').addEventListener('click', () => {
    guideModal.classList.remove('active');
  });
  document.getElementById('help-btn').addEventListener('click', () => {
    guideModal.classList.add('active');
  });
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initEventListeners();
  updateScheduleDisplays();
  updateFastingTimer();
  renderMetrics();
  renderHistoryTable();

  // Run live timer every 1000ms
  setInterval(updateFastingTimer, 1000);
});
