import React, { useState, useEffect } from 'react';
import { 
  Mail, Copy, RefreshCw, LayoutTemplate, 
  Target, Sliders, Sparkles, 
  Star, ShieldCheck, Trash2, Zap
} from 'lucide-react';



import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:3000/generate-email';

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i += 5; // Faster typing speed
      if (i > text.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [text]);

  return <div>{displayedText}</div>;
};

const App: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [recipient, setRecipient] = useState('');
  const [tone, setTone] = useState('Professional');
  const [pointInput, setPointInput] = useState('');
  const [points, setPoints] = useState<string[]>([]);
  const [formality, setFormality] = useState(8);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<any[]>([]);

  const tones = [
    { name: 'Professional', icon: ShieldCheck, color: 'text-blue-400' },
    { name: 'Friendly', icon: Star, color: 'text-amber-400' },
    { name: 'Urgent', icon: Zap, color: 'text-red-400' },
    { name: 'Persuasive', icon: Target, color: 'text-indigo-400' },
  ];

  const handleAddPoint = () => {
    if (pointInput.trim()) {
      setPoints([...points, pointInput.trim()]);
      setPointInput('');
    }
  };

  const removePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (!goal) {
      setError('Please tell us the goal of your message.');
      return;
    }
    setError('');
    setIsGenerating(true);
    setGeneratedEmail('');

    try {
      const response = await axios.post(API_BASE_URL, {
        goal,
        recipient,
        tone,
        points,
        formality,
      });
      
      const newEmail = response.data.email;
      setGeneratedEmail(newEmail);
      setHistory([{ goal, content: newEmail, date: new Date().toLocaleTimeString() }, ...history]);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Connection failed. Ensure backend is active.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
  };

  return (
    <div className="h-screen relative overflow-hidden bg-[#0f1115] text-[#f8fafc] font-body selection:bg-[#463bf9]/30">
      <div className="aim-gradient-bg" />

      <div className="relative z-10 h-full flex flex-col max-w-screen-xl mx-auto px-4 py-4 md:py-6 lg:py-8 lg:px-6">

        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center justify-center mb-4 space-y-2 shrink-0"
        >
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#15181e] border border-[#232732] rounded-xl flex items-center justify-center shadow-lg">
                <Mail className="w-5 h-5 text-[#463bf9]" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#f8fafc]">Pro_Compose</h1>
           </div>
           <p className="text-[#94a3b8] text-sm max-w-md text-center">
             Create high-converting, professional emails instantly utilizing our advanced AI models.
           </p>
        </motion.header>

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch min-h-0">
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-7 h-full min-h-0"
          >
            <div className="aim-card p-5 md:p-6 h-full flex flex-col gap-4 overflow-y-auto custom-scrollbar flex-shrink-0">
              
              <div className="space-y-2">
                <label className="aim-label">What is the central message?</label>
                <div className="relative group">
                  <textarea 
                    className="aim-input min-h-[100px] resize-none pb-10" 
                    placeholder="E.g., Following up strictly regarding the Q3 budget proposal sent on Tuesday..."
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[#4b5563]">
                     <Sparkles className="w-4 h-4" />
                     <span className="text-xs font-medium">Be precise</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="aim-label">Who is the recipient?</label>
                  <input 
                    className="aim-input" 
                    placeholder="e.g. Stakeholders, HR"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="aim-label">Professional Tone</label>
                  <div className="relative">
                    <select 
                      className="aim-input appearance-none cursor-pointer pr-10"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                    >
                      {tones.map(t => (
                        <option key={t.name} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                    <Sliders className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="aim-label">Must-Include Details</label>
                <div className="flex gap-3">
                  <input 
                    className="aim-input" 
                    placeholder="Add a specific detail to cover..."
                    value={pointInput}
                    onChange={(e) => setPointInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddPoint()}
                  />
                  <button onClick={handleAddPoint} className="aim-button-secondary px-6 hover:text-white">+</button>
                </div>
                {points.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    <AnimatePresence>
                      {points.map((p, i) => (
                        <motion.div 
                          key={i}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          className="px-3 py-1.5 bg-[#1a1d24] border border-[#2b303b] rounded-lg text-sm text-[#e2e8f0] flex items-center gap-2 group"
                        >
                          <span className="truncate max-w-[200px]">{p}</span>
                          <Trash2 className="w-3.5 h-3.5 text-[#64748b] hover:text-[#ef4444] cursor-pointer" onClick={() => removePoint(i)} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <label className="aim-label mb-0">Formality Index</label>
                  <span className="text-[10px] font-mono text-[#463bf9] bg-[#463bf9]/10 px-2 py-0.5 rounded">{formality}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  className="w-full accent-[#463bf9] h-1.5 bg-[#232732] rounded-lg appearance-none cursor-pointer" 
                  value={formality}
                  onChange={(e) => setFormality(parseInt(e.target.value))}
                />
              </div>

              <div className="pt-2 mt-auto shrink-0">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="aim-button-primary w-full h-12 text-[14px] flex items-center justify-center cursor-pointer"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generating Output...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>Generate Professional Draft</span>
                    </div>
                  )}
                </button>
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#ef4444] text-center text-sm font-medium mt-4">{error}</motion.p>}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 relative h-full min-h-0 flex flex-col"
          >
            <AnimatePresence mode="wait">
              {generatedEmail ? (
                <motion.div 
                  key="output"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="aim-card p-6 md:p-8 h-full flex flex-col flex-1 min-h-0"
                >
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#232732]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                      <span className="text-sm font-medium text-[#f8fafc]">Final Polish</span>
                    </div>
                    <button onClick={copyToClipboard} className="aim-button-secondary px-4 py-2 text-xs flex items-center gap-2 hover:text-white">
                      <Copy className="w-3.5 h-3.5" />
                      Copy Text
                    </button>
                  </div>

                  <div className="flex-1 font-body text-[15px] leading-[1.7] text-[#e2e8f0] overflow-y-auto custom-scrollbar pr-2 whitespace-pre-wrap">
                    <Typewriter text={generatedEmail} />
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#232732]">
                    <button 
                      onClick={handleGenerate}
                      className="aim-button-secondary w-full h-12 flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate Alternate Version
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="aim-card p-6 md:p-10 h-full flex flex-col flex-1 min-h-0 items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-[#1a1d24] rounded-2xl flex items-center justify-center border border-[#2b303b] shadow-inner shrink-0">
                    <LayoutTemplate className="w-10 h-10 text-[#4b5563]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#f8fafc]">No output yet</h3>
                    <p className="text-[#94a3b8] text-sm leading-relaxed max-w-[250px] mx-auto">
                      Provide your requirements on the left, and our AI will instantly draft a flawless response.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>

    </div>
  );
}

export default App;

