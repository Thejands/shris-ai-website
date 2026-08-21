import gsap from 'gsap';
import { WaveformVisualizer, InteractiveVoiceAgent } from './waveform';

export function initInteractiveDemos(): void {
  initHeroVoiceStudio();
  initDomainSwitcher();
  initLanguageSwitcher();
  initAgentBuilder();
  initDeveloperConsole();
  initPricingCalculator();
}

/**
 * 1. Hero 2-Way Conversational Voice Studio with Toggle Audio Stop
 */
function initHeroVoiceStudio(): void {
  const canvas = document.getElementById('hero-waveform-canvas') as HTMLCanvasElement | null;
  const micBtn = document.getElementById('hero-mic-toggle-btn');
  const micLabel = document.getElementById('hero-mic-btn-label');
  const sampleBtn = document.getElementById('hero-play-sample-btn');
  const sampleLabel = document.getElementById('hero-sample-btn-label');
  const stateBadge = document.getElementById('hero-agent-state-badge');
  const statusText = document.getElementById('hero-call-state-text');
  const pulseDot = document.getElementById('hero-pulse-dot');
  const userMsgEl = document.getElementById('hero-last-user-msg');
  const agentMsgEl = document.getElementById('hero-last-agent-msg');
  const turnBadge = document.getElementById('hero-turn-badge');

  let visualizer: WaveformVisualizer | null = null;
  if (canvas) {
    visualizer = new WaveformVisualizer(canvas, { baseColor: '#6A88E2', glowColor: '#A5BBFC' });
  }

  let turnCount = 2;
  let voiceAgent: InteractiveVoiceAgent | null = null;

  if (visualizer) {
    voiceAgent = new InteractiveVoiceAgent(visualizer, {
      onTranscript: (speaker, text) => {
        turnCount++;
        if (turnBadge) turnBadge.textContent = `Turn #${turnCount}`;

        if (speaker === 'user') {
          if (userMsgEl) {
            userMsgEl.textContent = `"${text}"`;
            gsap.fromTo(userMsgEl.parentElement, { opacity: 0.4, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.3 });
          }
        } else {
          if (agentMsgEl) {
            agentMsgEl.textContent = `"${text}"`;
            gsap.fromTo(agentMsgEl.parentElement, { opacity: 0.4, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.3 });
          }
        }
      },
      onState: (state) => {
        if (state === 'listening') {
          if (stateBadge) {
            stateBadge.textContent = 'Listening to You...';
            stateBadge.className = 'badge badge-indigo';
          }
          if (statusText) statusText.textContent = 'Microphone active • Speak your query';
          if (pulseDot) pulseDot.style.background = '#6A88E2';
          if (micLabel) micLabel.textContent = 'Stop Listening';
          if (sampleLabel) sampleLabel.textContent = 'Hear Demo';
        } else if (state === 'thinking') {
          if (stateBadge) {
            stateBadge.textContent = 'Reasoning (276ms)...';
            stateBadge.className = 'badge badge-emerald';
          }
          if (statusText) statusText.textContent = 'Neural intent extraction & slot verification';
          if (pulseDot) pulseDot.style.background = '#E6A838';
        } else if (state === 'speaking') {
          if (stateBadge) {
            stateBadge.textContent = 'Agent Speaking';
            stateBadge.className = 'badge badge-emerald';
          }
          if (statusText) statusText.textContent = 'Streaming 24kHz HD neural speech (Sovereign Engine)';
          if (pulseDot) pulseDot.style.background = '#10B981';
          if (micLabel) micLabel.textContent = 'Speak to Agent (Mic)';
          if (sampleLabel) sampleLabel.textContent = 'Stop Audio';
        } else {
          if (stateBadge) {
            stateBadge.textContent = 'Ready to Speak';
            stateBadge.className = 'badge badge-emerald';
          }
          if (statusText) statusText.textContent = 'Powered by Shris Sovereign Engine (276ms latency)';
          if (pulseDot) pulseDot.style.background = '#10B981';
          if (micLabel) micLabel.textContent = 'Speak to Agent (Mic)';
          if (sampleLabel) sampleLabel.textContent = 'Hear Demo';
        }
      }
    });
  }

  micBtn?.addEventListener('click', () => {
    voiceAgent?.toggleConversation();
  });

  sampleBtn?.addEventListener('click', () => {
    if (voiceAgent?.isSpeaking) {
      voiceAgent.stopSpeaking();
    } else {
      voiceAgent?.speak(
        "Namaste! Slot confirmed for Saturday 11:30 AM with Senior Manager Rohit. I have also dispatched the floor plan and directions to your WhatsApp right now.",
        'en-IN'
      );
    }
  });
}

/**
 * 2. Butter-Smooth Domain Explorer Tab Switcher (GSAP)
 */
function initDomainSwitcher(): void {
  const tabs = document.querySelectorAll<HTMLElement>('[data-domain-tab]');
  const domainPanels = document.querySelectorAll<HTMLElement>('[data-domain-panel]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.domainTab;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      domainPanels.forEach(panel => {
        if (panel.dataset.domainPanel === targetId) {
          panel.style.display = 'grid';
          gsap.fromTo(panel, 
            { opacity: 0, y: 14 }, 
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 3. Multilingual Engine Demo with Play/Stop Toggle
 */
function initLanguageSwitcher(): void {
  const langButtons = document.querySelectorAll<HTMLElement>('[data-lang-btn]');
  const langSampleText = document.getElementById('lang-sample-text');
  const langNativeName = document.getElementById('lang-native-name');
  const langLatency = document.getElementById('lang-latency-pill');
  const langPlayBtn = document.getElementById('lang-play-btn');
  const langPlayBtnLabel = document.getElementById('lang-play-btn-label');
  const langCanvas = document.getElementById('lang-waveform-canvas') as HTMLCanvasElement | null;

  let langVisualizer: WaveformVisualizer | null = null;
  if (langCanvas) {
    langVisualizer = new WaveformVisualizer(langCanvas, { baseColor: '#6A88E2', glowColor: '#10B981' });
  }

  let currentLangCode = 'en-IN';
  let currentSampleText = 'Good afternoon! I am calling from Shris AI to confirm your consultation schedule for tomorrow.';
  let isPlayingLang = false;

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentLangCode = btn.dataset.langCode || 'en-IN';
      currentSampleText = btn.dataset.langSample || '';
      const native = btn.dataset.langNative || '';
      const name = btn.dataset.langName || '';
      const latency = btn.dataset.langLatency || '280ms';

      if (langSampleText) {
        gsap.fromTo(langSampleText, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });
        langSampleText.textContent = `"${currentSampleText}"`;
      }
      if (langNativeName) langNativeName.textContent = `${name} (${native})`;
      if (langLatency) langLatency.textContent = `P50 Latency: ${latency}`;

      if (isPlayingLang) {
        window.speechSynthesis?.cancel();
        isPlayingLang = false;
        if (langVisualizer) langVisualizer.setPlaying(false);
        if (langPlayBtnLabel) langPlayBtnLabel.textContent = 'Play Voice Sample';
      }
    });
  });

  langPlayBtn?.addEventListener('click', () => {
    if (isPlayingLang) {
      window.speechSynthesis?.cancel();
      isPlayingLang = false;
      if (langVisualizer) langVisualizer.setPlaying(false);
      if (langPlayBtnLabel) langPlayBtnLabel.textContent = 'Play Voice Sample';
      return;
    }

    if (langVisualizer) langVisualizer.setPlaying(true);
    isPlayingLang = true;
    if (langPlayBtnLabel) langPlayBtnLabel.textContent = 'Stop Audio';
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSampleText);
      utterance.lang = currentLangCode;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const matched = voices.find(v => v.lang.includes(currentLangCode.slice(0, 2)));
      if (matched) utterance.voice = matched;

      utterance.onend = () => {
        isPlayingLang = false;
        if (langVisualizer) langVisualizer.setPlaying(false);
        if (langPlayBtnLabel) langPlayBtnLabel.textContent = 'Play Voice Sample';
      };
      utterance.onerror = () => {
        isPlayingLang = false;
        if (langVisualizer) langVisualizer.setPlaying(false);
        if (langPlayBtnLabel) langPlayBtnLabel.textContent = 'Play Voice Sample';
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        isPlayingLang = false;
        if (langVisualizer) langVisualizer.setPlaying(false);
        if (langPlayBtnLabel) langPlayBtnLabel.textContent = 'Play Voice Sample';
      }, 3000);
    }
  });
}

/**
 * 4. Interactive Agent Builder Studio
 */
function initAgentBuilder(): void {
  const roleSelect = document.getElementById('builder-role-select') as HTMLSelectElement | null;
  const toneSelect = document.getElementById('builder-tone-select') as HTMLSelectElement | null;
  const speedSlider = document.getElementById('builder-speed-slider') as HTMLInputElement | null;
  const speedVal = document.getElementById('builder-speed-val');
  const escalationThreshold = document.getElementById('builder-escalation-slider') as HTMLInputElement | null;
  const escalationVal = document.getElementById('builder-escalation-val');

  const previewName = document.getElementById('builder-preview-name');
  const previewRole = document.getElementById('builder-preview-role');
  const previewToneBadge = document.getElementById('builder-preview-tone');
  const previewSpeedBadge = document.getElementById('builder-preview-speed');
  const previewEscalationBadge = document.getElementById('builder-preview-escalation');

  roleSelect?.addEventListener('change', () => {
    const selectedText = roleSelect.options[roleSelect.selectedIndex].text;
    if (previewRole) {
      previewRole.textContent = selectedText;
      gsap.fromTo(previewRole, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.25 });
    }
    if (previewName) previewName.textContent = `Custom ${roleSelect.value.toUpperCase()} Agent`;
  });

  toneSelect?.addEventListener('change', () => {
    if (previewToneBadge) previewToneBadge.textContent = `Tone: ${toneSelect.value}`;
  });

  speedSlider?.addEventListener('input', () => {
    const val = `${speedSlider.value}x`;
    if (speedVal) speedVal.textContent = val;
    if (previewSpeedBadge) previewSpeedBadge.textContent = `Pacing: ${val}`;
  });

  escalationThreshold?.addEventListener('input', () => {
    const val = `${escalationThreshold.value}%`;
    if (escalationVal) escalationVal.textContent = val;
    if (previewEscalationBadge) previewEscalationBadge.textContent = `Handoff: < ${val}`;
  });
}

/**
 * 5. Developer Console Code Tab Switcher & Copy (GSAP)
 */
function initDeveloperConsole(): void {
  const tabs = document.querySelectorAll<HTMLElement>('[data-code-tab]');
  const snippets = document.querySelectorAll<HTMLElement>('[data-code-content]');
  const copyBtn = document.getElementById('copy-code-btn');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.codeTab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      snippets.forEach(s => {
        if (s.dataset.codeContent === targetId) {
          s.style.display = 'block';
          gsap.fromTo(s, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25 });
        } else {
          s.style.display = 'none';
        }
      });
    });
  });

  copyBtn?.addEventListener('click', () => {
    const activeSnippet = document.querySelector<HTMLElement>('[data-code-content][style*="display: block"]') || 
                          document.querySelector<HTMLElement>('[data-code-content]');
    if (activeSnippet) {
      navigator.clipboard.writeText(activeSnippet.innerText.trim()).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `<span style="color: #10B981;">✓ Copied</span>`;
        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
        }, 2000);
      });
    }
  });
}

/**
 * 6. Dynamic Pricing Calculator
 */
function initPricingCalculator(): void {
  const callSlider = document.getElementById('pricing-call-slider') as HTMLInputElement | null;
  const durationSlider = document.getElementById('pricing-duration-slider') as HTMLInputElement | null;
  const dailyCallsVal = document.getElementById('calc-daily-calls-val');
  const durationVal = document.getElementById('calc-duration-val');

  const totalCallsDisplay = document.getElementById('calc-total-calls');
  const monthlyCostDisplay = document.getElementById('calc-monthly-cost');
  const humanCostDisplay = document.getElementById('calc-human-cost');
  const totalSavingsDisplay = document.getElementById('calc-total-savings');

  function calculate(): void {
    if (!callSlider || !durationSlider) return;

    const dailyCalls = parseInt(callSlider.value, 10);
    const avgDuration = parseFloat(durationSlider.value);
    const monthlyDays = 30;
    const monthlyCalls = dailyCalls * monthlyDays;
    const monthlyMinutes = monthlyCalls * avgDuration;

    if (dailyCallsVal) dailyCallsVal.textContent = dailyCalls.toLocaleString('en-IN');
    if (durationVal) durationVal.textContent = String(avgDuration);

    const aiMonthlyCost = Math.round(monthlyMinutes * 3.2);
    const agentsRequired = Math.ceil(dailyCalls / 55);
    const humanMonthlyCost = agentsRequired * 35000;

    const savings = Math.max(0, humanMonthlyCost - aiMonthlyCost);
    const savingsPercent = Math.round((savings / humanMonthlyCost) * 100);

    if (totalCallsDisplay) totalCallsDisplay.textContent = monthlyCalls.toLocaleString('en-IN');
    if (monthlyCostDisplay) monthlyCostDisplay.textContent = `₹${aiMonthlyCost.toLocaleString('en-IN')}`;
    if (humanCostDisplay) humanCostDisplay.textContent = `₹${humanMonthlyCost.toLocaleString('en-IN')}`;
    if (totalSavingsDisplay) totalSavingsDisplay.textContent = `₹${savings.toLocaleString('en-IN')} (${savingsPercent}% Saved)`;
  }

  callSlider?.addEventListener('input', calculate);
  durationSlider?.addEventListener('input', calculate);
  calculate();
}
