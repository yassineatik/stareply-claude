import Anthropic from "@anthropic-ai/sdk";
import type { Tone } from "@/types";

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  }
  return _client;
}

interface GenerateReplyParams {
  reviewerName: string;
  rating: number;
  comment: string;
  tone: Tone;
  businessName: string;
  industry: string | null;
  brandKeywords: string[];
  avoidKeywords: string[];
}

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  friendly:
    "Write in a warm, casual, and approachable tone. Use conversational language. Be genuinely enthusiastic where appropriate.",
  professional:
    "Write in a formal, clear, and polished tone. Be courteous and business-appropriate. Avoid slang or overly casual language.",
  personal:
    "Write in a personal, heartfelt tone. Reference specific details from the review. Use the reviewer's name naturally. Make it feel like a human wrote this, not a template.",
  casual:
    "Write in a very relaxed, fun, and laid-back tone. Use short sentences, exclamation marks, and informal language. Sound like a friend, not a business.",
  custom:
    "Write in a balanced, natural tone that sounds like a real business owner responding personally.",
};

function buildSystemPrompt(params: GenerateReplyParams): string {
  const parts = [
    `You are an AI assistant that writes Google review responses on behalf of "${params.businessName}"${params.industry ? `, a ${params.industry} business` : ""}.`,
    "",
    "RULES:",
    "1. Write ONLY the reply text. No greetings like 'Dear reviewer' unless it sounds natural.",
    "2. Keep replies between 2-4 sentences. Concise but meaningful.",
    "3. Never use generic phrases like 'Thank you for your feedback' or 'Your feedback is important to us'.",
    "4. For negative reviews (1-2 stars): acknowledge the issue, show empathy, offer to make it right. Never be defensive.",
    "5. For positive reviews (4-5 stars): be grateful and specific. Reference something from their review.",
    "6. For neutral reviews (3 stars): acknowledge both the positive and the area for improvement.",
    "7. Never fabricate details not mentioned in the review.",
    "8. Never mention being an AI or automated system.",
    "9. Sign off naturally without a formal signature block.",
    "",
    `TONE: ${TONE_INSTRUCTIONS[params.tone]}`,
  ];

  if (params.brandKeywords.length > 0) {
    parts.push(
      "",
      `PREFERRED PHRASES (use naturally when relevant): ${params.brandKeywords.join(", ")}`
    );
  }

  if (params.avoidKeywords.length > 0) {
    parts.push(
      "",
      `NEVER USE THESE PHRASES: ${params.avoidKeywords.join(", ")}`
    );
  }

  return parts.join("\n");
}

function buildUserPrompt(params: GenerateReplyParams): string {
  return [
    `Reviewer: ${params.reviewerName}`,
    `Rating: ${params.rating}/5 stars`,
    `Review: "${params.comment || "(No written review, only a star rating)"}"`,
    "",
    "Write a reply to this review.",
  ].join("\n");
}

export async function generateReply(
  params: GenerateReplyParams
): Promise<string> {
  const message = await getClient().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 300,
    system: buildSystemPrompt(params),
    messages: [
      {
        role: "user",
        content: buildUserPrompt(params),
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  return textBlock.text.trim();
}
