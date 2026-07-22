import React, { useState, useEffect, useRef } from 'react';
import { Soundwave } from './Soundwave';
import lafinaSampleAudio from '../assets/voice/lafina_sample_audio.wav';
import ringtoneAudio from '../assets/phone_ring_tone.mp3';

interface VoiceDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

type CallState = 'ringing' | 'connected' | 'listening' | 'acknowledged' | 'snoozed';

export const VoiceDemo: React.FC<VoiceDemoProps> = ({ isOpen, onClose }) => {
  const [callState, setCallState] = useState<CallState>('ringing');
  const [transcription, setTranscription] = useState<string>('');
  const [speechText] = useState<string>(
    "Hello! This is LAFINA. Your Compiler Design midterm exam is scheduled in 30 minutes at Room 302. Please say 'Acknowledge' or 'Snooze'."
  );
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerIntervalRef = useRef<any>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ringtoneRef = useRef<HTMLAudioElement | null>(null);

  function playRingtone() {
    if (!ringtoneRef.current) {
      ringtoneRef.current = new Audio(ringtoneAudio);
      ringtoneRef.current.loop = true;
    }
    ringtoneRef.current.currentTime = 0;
    ringtoneRef.current.play().catch(err => {
      console.warn("Failed to play ringtone:", err);
    });
  }

  function stopRingtone() {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
  }

  function playSampleAudio() {
    if (!audioRef.current) {
      audioRef.current = new Audio(lafinaSampleAudio);
    }
    
    audioRef.current.currentTime = 0;
    
    audioRef.current.onended = () => {
      setCallState('listening');
    };

    audioRef.current.play().catch(err => {
      console.warn("Failed to play audio sample:", err);
      speakText(speechText);
    });
  }

  function stopSampleAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function speakText(text: string, onEndCallback?: () => void) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      
      utterance.onend = () => {
        if (onEndCallback) {
          onEndCallback();
        } else {
          setCallState('listening');
        }
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        if (onEndCallback) {
          onEndCallback();
        } else {
          setCallState('listening');
        }
      }, 3000);
    }
  }

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCallState('ringing');
      setTranscription('');
      setTimer(0);
      playRingtone();
    } else {
      // Stop speech, ringtone and timers when modal closes
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopRingtone();
      stopSampleAudio();
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      stopListening();
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      stopRingtone();
      stopSampleAudio();
      stopListening();
    };
  }, [isOpen]);

  useEffect(() => {
    if (callState === 'connected') {
      stopRingtone();
      // Start call duration timer
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      
      // LAFINA starts speaking with the premium recorded sample audio
      playSampleAudio();
    } else if (callState === 'listening') {
      startListening();
    } else {
      if (timerIntervalRef.current && (callState === 'acknowledged' || callState === 'snoozed')) {
        clearInterval(timerIntervalRef.current);
      }
      if (callState === 'acknowledged' || callState === 'snoozed') {
        stopSampleAudio();
      }
    }
  }, [callState]);

  function startListening() {
    // Attempt to use Web Speech API
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const resultText = event.results[0][0].transcript.toLowerCase();
          setTranscription(resultText);
          
          if (resultText.includes('acknowledge') || resultText.includes('done') || resultText.includes('yes')) {
            setCallState('acknowledged');
          } else if (resultText.includes('snooze') || resultText.includes('wait') || resultText.includes('later')) {
            setCallState('snoozed');
          } else {
            // Unrecognized voice trigger, retry
            speakText("Sorry, I didn't get that. Please say Acknowledge or Snooze.", () => {
              setCallState('connected');
            });
          }
        };

        recognition.onerror = () => {
          // Fallback to manual tap UI if mic fails or is denied
          simulateSpeechTyping();
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch {
        simulateSpeechTyping();
      }
    } else {
      simulateSpeechTyping();
    }
  }

  function simulateSpeechTyping() {
    // If no mic / browser support, simulate student speaking
    const phrases = ['I am on it...', 'Acknowledge', 'Snooze that...'];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    let currentText = '';
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < randomPhrase.length) {
        currentText += randomPhrase[index];
        setTranscription(currentText);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (randomPhrase.toLowerCase().includes('snooze')) {
            setCallState('snoozed');
          } else {
            setCallState('acknowledged');
          }
        }, 1200);
      }
    }, 100);
  }

  function stopListening() {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore errors if stopping fails
      }
      recognitionRef.current = null;
    }
  }

  const handleAcceptCall = () => {
    stopRingtone();
    setCallState('connected');
  };

  const handleDeclineCall = () => {
    stopRingtone();
    onClose();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4">
      {/* Phone container */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-[3rem] border-8 border-slate-800 bg-slate-950 shadow-2xl transition-all aspect-[9/19] flex flex-col justify-between text-white">
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20 flex justify-center items-center">
          <div className="w-12 h-1 bg-slate-900 rounded-full mb-1"></div>
        </div>

        {/* Ringing State */}
        {callState === 'ringing' && (
          <div className="flex-1 flex flex-col justify-between p-8 pt-16 text-center animate-fadeIn">
            <div className="mt-8 space-y-md">
              <span className="bg-primary/20 text-primary border border-primary/30 text-xs px-md py-1 rounded-full uppercase tracking-widest font-bold">
                Incoming Call
              </span>
              <h3 className="font-headline-md text-headline-md mt-sm tracking-wide">LAFINA Scheduler</h3>
              <p className="text-body-md text-slate-400">University Academic Assistant</p>
            </div>

            {/* Glowing Logo */}
            <div className="relative flex justify-center items-center my-xxl">
              <div className="absolute w-36 h-36 rounded-full bg-primary/20 animate-ping opacity-60"></div>
              <div className="absolute w-28 h-28 rounded-full bg-honey-gold/30 animate-pulse"></div>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-honey-gold via-primary to-deep-indigo p-[2px] shadow-2xl">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                </div>
              </div>
            </div>

            <div className="space-y-xxl">
              <p className="text-caption text-slate-500 animate-pulse">
                Offline-First Alarm daemon triggering...
              </p>
              
              {/* Call Controls */}
              <div className="flex justify-around items-center mb-6">
                <button 
                  onClick={handleDeclineCall} 
                  className="w-16 h-16 rounded-full bg-coral-red flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-coral-red/90"
                  title="Decline"
                >
                  <span className="material-symbols-outlined text-3xl">call_end</span>
                </button>
                <button 
                  onClick={handleAcceptCall} 
                  className="w-16 h-16 rounded-full bg-success-mint flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-success-mint/90 animate-bounce"
                  title="Accept"
                >
                  <span className="material-symbols-outlined text-3xl">call</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Connected / Active Call State */}
        {(callState === 'connected' || callState === 'listening' || callState === 'acknowledged' || callState === 'snoozed') && (
          <div className="flex-1 flex flex-col justify-between p-8 pt-16 text-center">
            {/* Header info */}
            <div>
              <p className="text-xs tracking-widest text-slate-400 uppercase font-semibold">Active Scheduler Call</p>
              <h3 className="font-headline-md text-title-sm mt-1">LAFINA Assistant</h3>
              <p className="text-caption text-success-mint mt-1 flex items-center justify-center gap-xs">
                <span className="w-2 h-2 rounded-full bg-success-mint animate-pulse"></span>
                {formatTime(timer)}
              </p>
            </div>

            {/* Speaking / Listening Visualization */}
            <div className="my-xxl flex flex-col items-center justify-center space-y-lg min-h-[160px]">
              {callState === 'connected' && (
                <>
                  <Soundwave colorClass="bg-primary" heightClass="h-16" barCount={21} isAnimated={true} />
                  <p className="text-body-md text-primary font-semibold animate-pulse">LAFINA is speaking...</p>
                </>
              )}

              {callState === 'listening' && (
                <>
                  <div className="w-16 h-16 rounded-full bg-honey-gold/10 border border-honey-gold flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined text-3xl text-honey-gold animate-bounce">mic</span>
                  </div>
                  <p className="text-body-md text-honey-gold font-semibold">Listening for spoken response...</p>
                  <div className="text-xs text-slate-400 max-w-[200px] italic">
                    Say <span className="font-bold text-white">"Acknowledge"</span> or <span className="font-bold text-white">"Snooze"</span>
                  </div>
                </>
              )}

              {callState === 'acknowledged' && (
                <>
                  <div className="w-16 h-16 rounded-full bg-success-mint/20 border-2 border-success-mint flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-success-mint">check_circle</span>
                  </div>
                  <p className="text-body-md text-success-mint font-bold uppercase tracking-wider">Alarm Acknowledged</p>
                  <p className="text-caption text-slate-400">Task scheduled inside local SQLite DB.</p>
                </>
              )}

              {callState === 'snoozed' && (
                <>
                  <div className="w-16 h-16 rounded-full bg-honey-gold/20 border-2 border-honey-gold flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-honey-gold">snooze</span>
                  </div>
                  <p className="text-body-md text-honey-gold font-bold uppercase tracking-wider">Alarm Snoozed</p>
                  <p className="text-caption text-slate-400">Rescheduled for 10 minutes from now.</p>
                </>
              )}
            </div>

            {/* Transcription Display */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-md min-h-[90px] flex flex-col justify-center text-left">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">On-Device VAD/STT (Whisper.cpp)</span>
              {callState === 'connected' && (
                <p className="text-body-md text-slate-300 font-medium">"{speechText}"</p>
              )}
              {callState === 'listening' && (
                <p className="text-body-md text-honey-gold font-semibold font-mono">
                  {transcription ? `> ${transcription}` : 'Listening...'}
                </p>
              )}
              {callState === 'acknowledged' && (
                <p className="text-body-md text-success-mint font-semibold font-mono">
                  &gt; {transcription || "I am on it."}
                </p>
              )}
              {callState === 'snoozed' && (
                <p className="text-body-md text-honey-gold font-semibold font-mono">
                  &gt; {transcription || "Snooze."}
                </p>
              )}
            </div>

            {/* Footer Call Controls */}
            <div className="space-y-md">
              <div className="flex justify-center items-center gap-xxl mb-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-12 h-12 rounded-full border ${
                    isMuted ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-400 hover:text-white'
                  } flex items-center justify-center active:scale-95 transition-all`}
                  title="Mute"
                >
                  <span className="material-symbols-outlined">{isMuted ? 'mic_off' : 'mic'}</span>
                </button>
                <button
                  onClick={handleDeclineCall}
                  className="w-14 h-14 rounded-full bg-coral-red flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-coral-red/90"
                  title="End Call"
                >
                  <span className="material-symbols-outlined text-2xl">call_end</span>
                </button>
              </div>
              
              {/* Quick simulation buttons (as a fallback or override) */}
              <div className="flex justify-center gap-sm mt-md">
                <button
                  onClick={() => setCallState('acknowledged')}
                  disabled={callState === 'acknowledged' || callState === 'snoozed'}
                  className="px-sm py-1 bg-slate-900 border border-slate-800 rounded-md text-[10px] uppercase font-bold text-slate-400 hover:text-success-mint hover:border-success-mint/30 disabled:opacity-40"
                >
                  Force Acknowledge
                </button>
                <button
                  onClick={() => setCallState('snoozed')}
                  disabled={callState === 'acknowledged' || callState === 'snoozed'}
                  className="px-sm py-1 bg-slate-900 border border-slate-800 rounded-md text-[10px] uppercase font-bold text-slate-400 hover:text-honey-gold hover:border-honey-gold/30 disabled:opacity-40"
                >
                  Force Snooze
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
