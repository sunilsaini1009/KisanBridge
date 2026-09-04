/* ==========================================================================
   KISANBRIDGE - VOICE ASSISTANT (HuggingFace STT & TTS Integration)
   ========================================================================== */

const VoiceAssistant = {
  mediaRecorder: null,
  audioChunks: [],
  isListening: false,
  activeTargetInput: null,
  currentLanguage: 'hi-IN',
  backendUrl: 'http://127.0.0.1:7860', // Updated to run locally

  init() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn("Media devices API not supported in this browser.");
      return false;
    }
    
    // Bind focus events for TTS guidance
    this.bindTTSFocusEvents();
    return true;
  },

  setLanguage(langCode) {
    this.currentLanguage = langCode;
  },

  async start(targetInputId) {
    const inputElement = document.getElementById(targetInputId);
    if (!inputElement) return;
    this.activeTargetInput = inputElement;

    // Check language from dropdown if present
    const langSelect = document.getElementById('preferredLanguage');
    if (langSelect) {
      const val = langSelect.value;
      if (val === 'Hindi') this.setLanguage('hi-IN');
      else if (val === 'English') this.setLanguage('en-IN');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstart = () => {
        this.isListening = true;
        showToast("🎙️ Sun rahe hain... Boliye (Listening...)", "info");
        this.updateMicUI(true);
      };

      this.mediaRecorder.onstop = async () => {
        this.isListening = false;
        this.updateMicUI(false);
        showToast("Processing voice...", "info");
        
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());

        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        await this.sendToSTT(audioBlob);
      };

      this.mediaRecorder.start();
    } catch (err) {
      console.error("Mic access denied or error:", err);
      showToast("Microphone permission denied or not available.", "error");
    }
  },

  stop() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
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

  async sendToSTT(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('lang', this.currentLanguage);
    formData.append('targetId', this.activeTargetInput?.id || '');

    try {
      const response = await fetch(`${this.backendUrl}/stt`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data && data.text && this.activeTargetInput) {
        this.activeTargetInput.value = data.text;
        this.activeTargetInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.activeTargetInput.dispatchEvent(new Event('change', { bubbles: true }));
        showToast(`Heard: "${data.text}"`, "success");
      } else {
        showToast("Could not transcribe voice clearly.", "error");
      }
    } catch (err) {
      console.error("STT Error:", err);
      showToast("Backend STT service unavailable.", "error");
    }
  },

  bindTTSFocusEvents() {
    const inputs = document.querySelectorAll('input[data-instruction-hi]');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        // Prevent re-triggering if already playing or if user is recording
        if (this.isListening) return;
        
        const instruction = input.getAttribute('data-instruction-hi');
        if (instruction) {
          this.speakGuidance(instruction, 'hi-IN');
        }
      });
    });
  },

  // Madad / Voice Guidance Feature
  async speakGuidance(text, lang = 'hi-IN') {
    // If backend isn't ready or we want to fallback to native, we could.
    // For this implementation, we are fetching from the ML Backend
    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('lang', lang);

      const response = await fetch(`${this.backendUrl}/tts`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      } else {
        console.error("TTS backend error");
        showToast(text, "info"); // Fallback to toast
      }
    } catch (err) {
      console.error("TTS fetch error:", err);
      showToast(text, "info"); // Fallback to toast
    }
  }
};

// Auto-bind voice buttons on DOM load
document.addEventListener('DOMContentLoaded', () => {
  VoiceAssistant.init();

  document.querySelectorAll('.btn-voice').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.dataset.target;
      if (targetId) {
        // Toggle mic state
        if (VoiceAssistant.isListening && VoiceAssistant.activeTargetInput?.id === targetId) {
          VoiceAssistant.stop();
        } else {
          VoiceAssistant.start(targetId);
        }
      }
    });
  });

  const voiceHelpBtn = document.getElementById('voice-help-btn');
  if (voiceHelpBtn) {
    voiceHelpBtn.addEventListener('click', () => {
      VoiceAssistant.speakGuidance("नमस्ते किसान भाई! अपना नाम, मोबाइल नंबर और फसल का विवरण भरें। माइक बटन दबाकर बोलकर भी भर सकते हैं।", "hi-IN");
      showToast("🔊 Voice Help: Guidance in Hindi playing from HF Backend...", "info");
    });
  }
});
