import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  User,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  Cpu
} from 'lucide-react';
import { mockTraineeProfile, chatBotKnowledgeBase } from '../../data/mockData';
import {
  chatWithCoopCareerRealAI,
  isOpenRouterConfigured,
  getModelId
} from '../../services/openRouterService';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isError?: boolean;
  chips?: string[];
}

export const CoopCareerChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: `Namaste ${mockTraineeProfile.name}! I am **CoopCareer AI**, your personalized career mentor for India's cooperative sector. Powered by real-time NCCT skill taxonomy. How can I assist your career journey today?`,
      timestamp: "Just now",
      chips: ["Recommend a Course", "Find Suitable Jobs", "Explain My Skill Gaps", "Career Guidance"]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const traineeContext = {
    name: mockTraineeProfile.name,
    age: mockTraineeProfile.age,
    programme: mockTraineeProfile.programme,
    institute: mockTraineeProfile.institute,
    batch: mockTraineeProfile.batch,
    attendance: mockTraineeProfile.attendanceRate,
    completedCourses: [
      "Cooperative Management & Governance",
      "Digital Literacy & PACS ERP Software",
      "Financial Awareness & Credit Appraisal"
    ],
    skillScore: mockTraineeProfile.skillScore,
    skills: mockTraineeProfile.skills,
    certificates: ["NCCT-2026-DCBM-84920", "NCCT-2026-PACS-77312"]
  };

  // Predefined prompts for quick chips as specified in prompt
  const chipPromptMapping: Record<string, string> = {
    "Recommend a Course": "Based on my current skills, what course should I learn next?",
    "Find Suitable Jobs": "What job roles in the cooperative sector match my profile?",
    "Explain My Skill Gaps": "Can you explain my current skill gaps and how to bridge them?",
    "Career Guidance": "What career progression path do you recommend for me in cooperative banking?"
  };

  const getFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('course') || q.includes('learn') || q.includes('study')) {
      return "Based on your current profile (78% skill score), **Digital Marketing Basics for Cooperatives** and **Excel & Data Analytics for PACS MIS** are recommended next. These will bridge your two highest priority skill gaps.\n\n*(Note: Set VITE_OPENROUTER_API_KEY in .env for live OpenRouter responses)*";
    }
    if (q.includes('job') || q.includes('suitable') || q.includes('hire') || q.includes('work') || q.includes('career match')) {
      return "You have strong AI alignment with **Digital Operations Assistant (87% Match)** and **Cooperative Field Officer (92% Match)** at State Apex Cooperative Bank.\n\n*(Note: Set VITE_OPENROUTER_API_KEY in .env for live OpenRouter responses)*";
    }
    if (q.includes('gap') || q.includes('skill gap') || q.includes('weakness') || q.includes('improve')) {
      return "Your profile shows gaps in **Digital Marketing (Beginner)**, **Data Analysis & MIS (Beginner)**, and **Financial Planning (Intermediate)**. Completing these recommended modules will raise your overall skill score to 91%.\n\n*(Note: Set VITE_OPENROUTER_API_KEY in .env for live OpenRouter responses)*";
    }
    return "For leadership progression in cooperative banking and PACS administration, we recommend: 1) **PACS Computerization Certification**, 2) **Credit Risk & NPA Management**, and 3) **Cooperative Societies Governance Acts**.\n\n*(Note: Set VITE_OPENROUTER_API_KEY in .env for live OpenRouter responses)*";
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      if (isOpenRouterConfigured()) {
        // Send history + context to real OpenRouter AI
        const historyForApi = newMessages.map(m => ({
          sender: m.sender,
          text: m.text
        }));

        const aiResponse = await chatWithCoopCareerRealAI(historyForApi, traineeContext);

        const botMsg: Message = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: aiResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        // Intelligent fallback if API key is not yet set in .env
        await new Promise(r => setTimeout(r, 800));
        const fallbackText = getFallbackResponse(query);
        const botMsg: Message = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (err: any) {
      console.error("Chatbot API Error:", err);
      const isMissingKey = err?.message?.includes("MISSING_API_KEY");
      const errorMessageText = isMissingKey
        ? "OpenRouter API Key not set. Please add `VITE_OPENROUTER_API_KEY=your_key` to `.env` to enable real-time OpenRouter chat completions."
        : "AI service is temporarily unavailable. Please try again.";

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: errorMessageText,
        isError: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChipClick = (chipTitle: string) => {
    const fullPrompt = chipPromptMapping[chipTitle] || chipTitle;
    handleSend(fullPrompt);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'm-1',
        sender: 'bot',
        text: `Namaste ${mockTraineeProfile.name}! I am **CoopCareer AI**, your personalized career mentor for India's cooperative sector. How can I assist your capacity building journey today?`,
        timestamp: "Just now",
        chips: ["Recommend a Course", "Find Suitable Jobs", "Explain My Skill Gaps", "Career Guidance"]
      }
    ]);
  };

  return (
    <>
      {/* Floating Chatbot Trigger Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-glow-purple transition-all duration-300 transform hover:scale-105"
          aria-label="Open CoopCareer AI Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-600 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-600"></span>
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide">CoopCareer AI</span>
          <span className="hidden sm:inline-block text-[11px] font-medium bg-white/20 px-2 py-0.5 rounded-full">
            Real AI
          </span>
        </button>
      </div>

      {/* Chat Window / Bottom Sheet for Mobile */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-20 sm:right-6 z-50 w-full sm:w-[430px] max-w-full sm:max-w-[430px] sm:max-h-[640px] h-[85vh] sm:h-[600px] flex flex-col bg-white dark:bg-slate-900 sm:rounded-3xl rounded-t-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 px-5 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-inner">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base text-white leading-tight">CoopCareer AI</h3>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-400 text-slate-950 font-black uppercase">
                    {isOpenRouterConfigured() ? 'OpenRouter' : 'Live'}
                  </span>
                </div>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  AI Career Assistant • SIH 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart Chat"
                className="p-1.5 text-blue-100 hover:text-white rounded-lg hover:bg-white/10 transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-blue-100 hover:text-white rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Action Suggestion Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 px-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Quick:</span>
            {["Recommend a Course", "Find Suitable Jobs", "Explain My Skill Gaps", "Career Guidance"].map((item, idx) => (
              <button
                key={idx}
                disabled={isTyping}
                onClick={() => handleChipClick(item)}
                className="shrink-0 text-xs px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 rounded-full text-slate-700 dark:text-slate-300 transition-all hover:bg-blue-50 dark:hover:bg-blue-950/40 disabled:opacity-50"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className={`w-8 h-8 rounded-xl text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 ${
                    msg.isError ? 'bg-red-500' : 'bg-gradient-to-tr from-blue-600 to-purple-600'
                  }`}>
                    {msg.isError ? <AlertCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : msg.isError
                    ? 'bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800 rounded-tl-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">
                    {msg.text.split('**').map((chunk, idx) => (
                      idx % 2 === 1 ? <strong key={idx} className="font-bold underline decoration-blue-400/50">{chunk}</strong> : chunk
                    ))}
                  </p>
                  
                  {msg.chips && (
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-1.5">
                      {msg.chips.map((chip, cIdx) => (
                        <button
                          key={cIdx}
                          disabled={isTyping}
                          onClick={() => handleChipClick(chip)}
                          className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-900 transition flex items-center gap-1 disabled:opacity-50"
                        >
                          <span>{chip}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className={`block text-[10px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none p-3 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium ml-1">
                    CoopCareer AI is thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                disabled={isTyping}
                placeholder="Ask e.g. What course should I learn next?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-md transition"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
              <span>Model: <strong className="font-mono">{getModelId().split('/')[1] || getModelId()}</strong></span>
              <span>OpenRouter AI Chatbot</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
