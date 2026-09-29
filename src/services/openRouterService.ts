/**
 * OpenRouter AI Service for SMART TRAINING SYSTEM
 * 
 * IMPORTANT ARCHITECTURAL & SECURITY NOTE:
 * This is a frontend prototype for the Smart India Hackathon 2026 demonstration.
 * In a production environment, NEVER expose client-side API keys via VITE_ prefixed variables.
 * Production deployments should always route LLM requests through a secure server-side proxy
 * (e.g. Node.js/Express, Python/FastAPI, or serverless functions) where the API key remains
 * secret, and authentication, authorization, and rate limiting can be enforced.
 */

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AiSkillAnalysisResult {
  overallScore: number;
  strongSkills: {
    skill: string;
    score: number;
  }[];
  skillGaps: {
    skill: string;
    level: string;
    reason: string;
  }[];
  recommendedCourses: {
    course: string;
    reason: string;
  }[];
  summary: string;
}

// Safely retrieve environment variables without leaking in UI or crashing in static hosting
const getApiKey = (): string => {
  try {
    const key = import.meta?.env?.VITE_OPENROUTER_API_KEY;
    return typeof key === 'string' ? key.trim() : '';
  } catch {
    return '';
  }
};

export const getModelId = (): string => {
  try {
    const model = import.meta?.env?.VITE_OPENROUTER_MODEL;
    return typeof model === 'string' && model.trim() ? model.trim() : 'meta-llama/llama-3.3-70b-instruct';
  } catch {
    return 'meta-llama/llama-3.3-70b-instruct';
  }
};

export const isOpenRouterConfigured = (): boolean => {
  try {
    const key = getApiKey();
    return Boolean(key && key !== 'YOUR_API_KEY_HERE' && !key.startsWith('YOUR_'));
  } catch {
    return false;
  }
};

/**
 * Generic caller for OpenRouter chat completions API
 */
export async function callOpenRouterChat(
  messages: OpenRouterMessage[],
  temperature = 0.5
): Promise<string> {
  const apiKey = getApiKey().trim();

  if (!isOpenRouterConfigured()) {
    throw new Error(
      "MISSING_API_KEY: VITE_OPENROUTER_API_KEY is not configured in .env. Please add your OpenRouter API key to the .env file."
    );
  }

  const model = getModelId();

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
        "X-Title": "SMART TRAINING SYSTEM - SIH 2026"
      },
      body: JSON.stringify({
        model,
        messages,
        temperature
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid OpenRouter API Key. Please verify your key in .env");
      }
      if (response.status === 429) {
        throw new Error("OpenRouter rate limit reached or credits exhausted. Please try again shortly.");
      }
      const errorData = await response.json().catch(() => null);
      const errMsg = errorData?.error?.message || `OpenRouter API error (HTTP ${response.status})`;
      throw new Error(errMsg);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response received from OpenRouter AI.");
    }

    return content;
  } catch (error: any) {
    console.error("[OpenRouter Error]:", error);
    throw error;
  }
}

/**
 * 1. REAL AI SKILL ANALYSIS
 * Sends trainee learning, attendance, and assessment metrics to OpenRouter and receives strict JSON
 */
export async function analyzeSkillsWithRealAI(traineeData: {
  name: string;
  attendance: string | number;
  courseProgress: Record<string, number>;
  assessmentScores: Record<string, number>;
}): Promise<AiSkillAnalysisResult> {
  const prompt = `You are the AI Capacity Diagnostic Engine for SMART TRAINING SYSTEM (National Council for Cooperative Training - NCCT).

Analyze this trainee's real-time learning records:

Trainee Name: ${traineeData.name}
Attendance: ${traineeData.attendance}%

Course Progress:
${Object.entries(traineeData.courseProgress).map(([c, p]) => `- ${c}: ${p}%`).join('\n')}

Assessment Scores:
${Object.entries(traineeData.assessmentScores).map(([s, score]) => `- ${s}: ${score}`).join('\n')}

Instructions:
Analyze:
1. Overall skill level (number between 0 and 100)
2. Strong skills with estimated scores (0-100)
3. Skill gaps (identifying skill, current level e.g. Beginner/Intermediate, and clear reason)
4. Recommended courses tailored to bridge the gaps with reasons
5. Short concise skill analysis summary (2-3 sentences max)

CRITICAL: Return ONLY valid, raw JSON. Do not include markdown code block syntax, do not include preamble or conversational text. Return an object matching this EXACT JSON schema:
{
  "overallScore": 82,
  "strongSkills": [
    {
      "skill": "Digital Literacy",
      "score": 88
    },
    {
      "skill": "Cooperative Knowledge",
      "score": 85
    }
  ],
  "skillGaps": [
    {
      "skill": "Entrepreneurship",
      "level": "Beginner",
      "reason": "Assessment score of 58 indicates need for business modeling and DPR preparation foundations."
    },
    {
      "skill": "Financial Skills",
      "level": "Intermediate",
      "reason": "Lower score in financial skills requires deeper practice in balance sheet audit."
    }
  ],
  "recommendedCourses": [
    {
      "course": "Entrepreneurship Fundamentals & FPO Governance",
      "reason": "Directly bridges identified entrepreneurship gap for rural business leadership."
    },
    {
      "course": "Excel & Data Analytics for PACS MIS",
      "reason": "Strengthens financial modeling and day-end ledger reconciliation."
    }
  ],
  "summary": "Trainee displays strong digital literacy and cooperative foundational knowledge. Prioritizing entrepreneurship and credit appraisal will optimize career readiness for Cooperative Field Officer roles."
}`;

  const messages: OpenRouterMessage[] = [
    {
      role: 'system',
      content: 'You are an AI skill evaluation system for India cooperative education. You always respond in STRICT raw JSON.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  const rawResponse = await callOpenRouterChat(messages, 0.2);

  // Clean response of any accidental ```json or markdown formatting
  let cleaned = rawResponse.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
  }

  try {
    const parsed: AiSkillAnalysisResult = JSON.parse(cleaned);

    // Validate structure
    if (typeof parsed.overallScore !== 'number') {
      parsed.overallScore = 80;
    }
    if (!Array.isArray(parsed.strongSkills)) {
      parsed.strongSkills = [];
    }
    if (!Array.isArray(parsed.skillGaps)) {
      parsed.skillGaps = [];
    }
    if (!Array.isArray(parsed.recommendedCourses)) {
      parsed.recommendedCourses = [];
    }
    if (!parsed.summary) {
      parsed.summary = "Skill analysis successfully completed based on current attendance and assessment parameters.";
    }

    return parsed;
  } catch (parseError) {
    console.error("Failed to parse JSON response from OpenRouter:", rawResponse);
    throw new Error("Failed to parse AI diagnostic JSON. Showing existing benchmark data.");
  }
}

/**
 * 2. REAL AI CAREER CHATBOT
 * Context-aware career assistant using OpenRouter chat completions
 */
export async function chatWithCoopCareerRealAI(
  conversationHistory: { sender: 'user' | 'bot'; text: string }[],
  traineeContext: {
    name: string;
    age: number;
    programme: string;
    institute: string;
    batch: string;
    attendance: number;
    completedCourses: string[];
    skillScore: number;
    skills: string[];
    certificates: string[];
  }
): Promise<string> {
  const systemPrompt = `You are CoopCareer AI, a career guidance assistant for a cooperative training and rural youth employment platform.

Give practical and simple career guidance.

You can help with:
- course recommendations
- skill-gap explanation
- job preparation
- career guidance
- cooperative-sector career opportunities
- digital skills
- entrepreneurship guidance

Do not invent certificates, jobs or personal information.
Use only the trainee information provided in the context below.
Keep responses concise, professional, encouraging and easy to understand.

Trainee Context:
- Name: ${traineeContext.name} (${traineeContext.age} years old)
- Programme: ${traineeContext.programme}
- Institute: ${traineeContext.institute}
- Batch: ${traineeContext.batch}
- Attendance Rate: ${traineeContext.attendance}%
- Completed Accredited Courses: ${traineeContext.completedCourses.join(', ')}
- Current AI Skill Score: ${traineeContext.skillScore}%
- Verified Skills: ${traineeContext.skills.join(', ')}
- Issued Certificates: ${traineeContext.certificates.join(', ')}
- Target Cooperative Roles in India: Cooperative Field Officer (92% Match), Digital Operations Assistant (87% Match), Rural Entrepreneurship Coordinator (81% Match).`;

  const messages: OpenRouterMessage[] = [
    {
      role: 'system',
      content: systemPrompt
    }
  ];

  // Include up to last 8 conversation turns to maintain chat memory without token bloat
  const recentHistory = conversationHistory.slice(-8);
  for (const msg of recentHistory) {
    messages.push({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    });
  }

  return await callOpenRouterChat(messages, 0.6);
}
