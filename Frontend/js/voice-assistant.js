/* ==========================================================================
   KISANBRIDGE - VOICE ASSISTANT (WEB SPEECH API HINDI / ENGLISH)
   ========================================================================== */

const VoiceAssistant = {
  recognition: null,
  isListening: false,
  activeTargetInput: null,
  currentLanguage: 'hi-IN', // Default to Hindi, supports 'en-IN'

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Web Speech API is not supported in this browser.");
      return false;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = this.currentLanguage;

    this.recognition.onstart = () => {
      this.isListening = true;
      showToast("🎙️ Sun rahe hain... Boliye (Listening...)", "info");
      this.updateMicUI(true);
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (this.activeTargetInput) {
        this.activeTargetInput.value = transcript;
        this.activeTargetInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.activeTargetInput.dispatchEvent(new Event('change', { bubbles: true }));
        showToast(`Heard: "${transcript}"`, "success");
      }
    };

    this.recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      this.stop();
      if (event.error === 'not-allowed') {
        showToast("Microphone permission denied", "error");
      } else {
        showToast("Voice recognition couldn't catch that. Try again.", "error");
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.updateMicUI(false);
    };

    return true;
  },

  setLanguage(langCode) {
    this.currentLanguage = langCode;
    if (this.recognition) {
      this.recognition.lang = langCode;
    }
  },

  start(targetInputId) {
    if (!this.recognition && !this.init()) {
      showToast("Speech recognition is not supported in your browser. Please type directly.", "error");
      return;
    }

    const inputElement = document.getElementById(targetInputId);
    if (!inputElement) return;

    this.activeTargetInput = inputElement;

    // Check language from dropdown if present
    const langSelect = document.getElementById('preferredLanguage');
    if (langSelect) {
      const val = langSelect.value;
      if (val === 'Hindi') this.setLanguage('hi-IN');
      else if (val === 'English') this.setLanguage('en-IN');
      else if (val === 'Marathi') this.setLanguage('mr-IN');
      else if (val === 'Tamil') this.setLanguage('ta-IN');
      else if (val === 'Punjabi') this.setLanguage('pa-IN');
    }

    try {
      this.recognition.start();
    } catch (e) {
      this.recognition.stop();
      setTimeout(() => this.recognition.start(), 200);
    }
  },

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.updateMicUI(false);
    }
  },

  updateMicUI(listening) {
    const allVoiceBtns = document.querySelectorAll('.btn-voice');
    allVoiceBtns.forEach(btn => {
      if (listening && btn.dataset.target === this.activeTargetInput?.id) {
        btn.classList.add('listening');
        btn.innerHTML = '🔴';
      } else {
        btn.classList.remove('listening');
        btn.innerHTML = '🎤';
      }
    });
  },

  // Madad / Voice Guidance Feature
  speakGuidance(text, lang = 'hi-IN') {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      showToast(text, "info");
    }
  }
};

// Auto-bind voice buttons on DOM load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-voice').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.dataset.target;
      if (targetId) {
        VoiceAssistant.start(targetId);
      }
    });
  });

  const voiceHelpBtn = document.getElementById('voice-help-btn');
  if (voiceHelpBtn) {
    voiceHelpBtn.addEventListener('click', () => {
      VoiceAssistant.speakGuidance("नमस्ते किसान भाई! अपना नाम, मोबाइल नंबर और फसल का विवरण भरें। माइक बटन दबाकर बोलकर भी भर सकते हैं।", "hi-IN");
      showToast("🔊 Voice Help: Guidance in Hindi playing...", "info");
    });
  }
});
