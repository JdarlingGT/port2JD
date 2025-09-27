import { Request, Response } from "express";
import OpenAI from "openai";
import portfolioData from "../../shared/portfolioData.json" with { type: "json" };
import rateLimit from "express-rate-limit";
import { z } from "zod";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatLimiter = rateLimit({
  windowMs: 60_000,
  max: 30,
});

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]).default("user"),
  content: z.string().min(1).max(4000),
});
const ChatBodySchema = z.object({
  messages: z.array(MessageSchema).min(1).max(50),
});

export async function chatHandler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parseResult = ChatBodySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: "Invalid messages format" });
  }
  const { messages } = parseResult.data;

  try {
    const context = `
    You are Jacob Darling's marketing portfolio AI assistant. Answer questions professionally and concisely using the following information:

    ### Current Employment
    ${portfolioData.employment.map(e =>
      `**${e.role}** at **${e.company}** (${e.years}):
    ${e.highlights.map(h => `• ${h}`).join('\n')}`
    ).join('\n\n')}

    ### Bearcave Marketing Projects
    ${portfolioData.bearcaveProjects.map(p =>
      `**${p.client}** (${p.website}):
    Services: ${p.services.join(", ")}
    Outcome: ${p.outcome}`
    ).join('\n\n')}

    ### Core Capabilities
    ${portfolioData.capabilities.join('\n• ')}

    ### Technical Skills
    ${portfolioData.technologies.join('\n• ')}

    Guidelines:
    - Keep responses concise but informative
    - Focus on Jacob's unique hybrid skillset combining marketing strategy with technical implementation
    - Highlight measurable results when available (like "70% reduction in support tickets" or "250% increase in qualified leads")
    - Be professional but conversational
    - If asked about specific projects, provide details from the portfolio data
    - Always emphasize Jacob's ability to both strategize and execute technically
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: context },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return res.json({
      reply: completion.choices[0].message?.content || "I'm sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({
      error: "I'm having trouble connecting right now. Please try again in a moment.",
    });
  }
}
