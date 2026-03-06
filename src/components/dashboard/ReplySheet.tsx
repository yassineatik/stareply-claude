"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import type { Review, Tone } from "@/types";

interface ReplySheetProps {
  review: Review;
  onClose: () => void;
  onPublished: (reviewId: string) => void;
}

const tones: { value: Tone; label: string; description: string }[] = [
  { value: "friendly", label: "Friendly", description: "Warm and casual" },
  { value: "professional", label: "Professional", description: "Formal and clear" },
  { value: "personal", label: "Personal", description: "Uses names and specifics" },
];

export function ReplySheet({ review, onClose, onPublished }: ReplySheetProps) {
  const [selectedTone, setSelectedTone] = useState<Tone>("friendly");
  const [generatedReply, setGeneratedReply] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [replyId, setReplyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [published, setPublished] = useState(false);

  // Typewriter effect — DESIGN.md §7
  useEffect(() => {
    if (!generatedReply || isEditing) return;

    setDisplayedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < generatedReply.length) {
        setDisplayedText(generatedReply.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [generatedReply, isEditing]);

  const handleGenerate = useCallback(async () => {
    setError(null);
    setIsGenerating(true);
    setGeneratedReply("");
    setDisplayedText("");
    setPublished(false);

    try {
      const response = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review_id: review.id, tone: selectedTone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to generate reply");
        return;
      }

      setGeneratedReply(data.reply);
      setReplyId(data.reply_id);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [review.id, selectedTone]);

  async function handlePublish() {
    if (!replyId) return;
    setError(null);
    setIsPublishing(true);

    // If edited, we'd need to update the reply content first
    const contentToPublish = isEditing ? editText : generatedReply;

    try {
      const response = await fetch("/api/publish-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply_id: replyId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to publish reply");
        return;
      }

      setPublished(true);
      setTimeout(() => {
        onPublished(review.id);
      }, 1500);
    } catch {
      setError("Your reply couldn't be published. Google may be temporarily unavailable.");
    } finally {
      setIsPublishing(false);
    }
  }

  function handleEdit() {
    setIsEditing(true);
    setEditText(generatedReply);
  }

  function handleSaveEdit() {
    setGeneratedReply(editText);
    setIsEditing(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close panel"
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />

      {/* Panel */}
      <div
        className="relative flex w-full max-w-lg flex-col border-l border-border-subtle bg-bg-surface"
        style={{ animation: "slideIn 200ms ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
          <h3 className="font-display text-lg font-bold text-text-primary">
            Generate Reply
          </h3>
          <button
            onClick={onClose}
            className="text-xl text-text-muted hover:text-text-primary cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-6">
            {/* Original review */}
            <div>
              <div className="mb-2 flex items-center gap-3">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-sm font-medium text-text-primary font-body">
                  {review.reviewer_name}
                </span>
              </div>
              {review.comment && (
                <p className="font-mono text-sm leading-relaxed text-text-secondary">
                  &ldquo;{review.comment}&rdquo;
                </p>
              )}
            </div>

            {/* Tone selector */}
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary font-body">
                Reply Tone
              </label>
              <div className="grid grid-cols-3 gap-2">
                {tones.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setSelectedTone(t.value)}
                    className={[
                      "flex flex-col items-center gap-1 rounded-[var(--radius-md)] border p-3 text-center transition-all cursor-pointer",
                      selectedTone === t.value
                        ? "border-[rgba(124,58,237,0.3)] bg-[linear-gradient(135deg,rgba(124,58,237,0.08)_0%,var(--bg-surface)_50%)] shadow-[var(--shadow-accent)]"
                        : "border-border-subtle bg-bg-elevated hover:border-border-default",
                    ].join(" ")}
                  >
                    <span className="text-sm font-medium text-text-primary font-body">
                      {t.label}
                    </span>
                    <span className="text-xs text-text-muted font-body">
                      {t.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            {!generatedReply && !isGenerating && (
              <Button onClick={handleGenerate} loading={isGenerating}>
                Generate Reply
              </Button>
            )}

            {/* Generating state */}
            {isGenerating && (
              <div className="rounded-[var(--radius-md)] border border-accent-dim bg-accent-dim/20 p-4">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full bg-accent"
                    style={{ animation: "typingPulse 1s ease-in-out infinite" }}
                  />
                  <span className="text-sm text-text-secondary font-body">
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            {/* Generated reply */}
            {generatedReply && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted font-body">
                    AI Reply Draft
                  </span>
                  {published && (
                    <Badge variant="success">Published</Badge>
                  )}
                </div>
                <div
                  className={[
                    "rounded-[var(--radius-md)] border p-4",
                    published
                      ? "border-l-[3px] border-l-success border-success/30 bg-success/5"
                      : "border-[rgba(124,58,237,0.3)] bg-accent-dim/20",
                  ].join(" ")}
                >
                  {isEditing ? (
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full resize-none bg-transparent font-body text-sm leading-relaxed text-text-primary outline-none"
                      rows={6}
                    />
                  ) : (
                    <p className="font-body text-sm leading-relaxed text-text-primary">
                      {displayedText}
                      {displayedText.length < generatedReply.length && (
                        <span
                          className="ml-0.5 inline-block h-4 w-0.5 bg-accent"
                          style={{ animation: "typingPulse 0.8s ease-in-out infinite" }}
                        />
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-[var(--radius-md)] border border-error/30 bg-error/10 px-4 py-3 text-sm text-error font-body">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        {generatedReply && !published && (
          <div className="flex items-center gap-2 border-t border-border-subtle px-6 py-4">
            {isEditing ? (
              <Button size="sm" onClick={handleSaveEdit}>
                Save Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleGenerate}
                  loading={isGenerating}
                >
                  Regenerate
                </Button>
                <Button
                  size="sm"
                  onClick={handlePublish}
                  loading={isPublishing}
                  className="ml-auto"
                >
                  Publish to Google
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
