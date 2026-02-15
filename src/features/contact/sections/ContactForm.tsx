// src/features/contact/sections/ContactForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, type ContactInput } from "@/features/contact/schema";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type SubmitStatus = "idle" | "success" | "error";
type SubjectValue = "general" | "project" | "hiring";

const SUBJECT_OPTIONS: ReadonlyArray<{ value: SubjectValue; label: string }> = [
  { value: "general", label: "General" },
  { value: "project", label: "Project" },
  { value: "hiring", label: "Hiring" },
];

export default function ContactForm(): React.JSX.Element {
  const form = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "general",
      message: "",
      company: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const {
    errors,
    touchedFields,
    submitCount,
    isSubmitting,
    isValid,
    isDirty,
  } = form.formState;

  const showError = (k: keyof ContactInput) =>
    Boolean(touchedFields[k] || submitCount > 0) && Boolean(errors[k]);

  const canSubmit = isValid && isDirty && !isSubmitting;

  const [status, setStatus] = React.useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [messageLen, setMessageLen] = React.useState(0);

  const formStartedAtRef = React.useRef<number>(Date.now());
  const minSubmitDelayMs = 1200;
  const inFlightRef = React.useRef<AbortController | null>(null);

  function focusFirstError(): void {
    const order: Array<keyof ContactInput> = ["name", "email", "subject", "message"];
    for (const key of order) {
      if (errors[key]) {
        form.setFocus(key);
        break;
      }
    }
  }

  function handleSubjectKeyDown(
    e: React.KeyboardEvent<HTMLDivElement>,
    current: SubjectValue,
    onChange: (v: SubjectValue) => void,
  ): void {
    const idx = SUBJECT_OPTIONS.findIndex((o) => o.value === current);
    if (idx < 0) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onChange(SUBJECT_OPTIONS[(idx + 1) % SUBJECT_OPTIONS.length].value);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onChange(SUBJECT_OPTIONS[(idx - 1 + SUBJECT_OPTIONS.length) % SUBJECT_OPTIONS.length].value);
    }
  }

  async function onSubmit(values: ContactInput): Promise<void> {
    if (values.company && values.company.trim().length > 0) {
      setStatus("error");
      setErrorMsg("Spam detected.");
      return;
    }
    if (Date.now() - formStartedAtRef.current < minSubmitDelayMs) {
      setStatus("error");
      setErrorMsg("That was too fast. Please try again.");
      return;
    }

    setStatus("idle");
    setErrorMsg("");

    inFlightRef.current?.abort();
    const ctrl = new AbortController();
    inFlightRef.current = ctrl;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values satisfies ContactInput),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        const fallback = "Something went wrong.";
        try {
          const payload: {
            message?: string;
            fieldErrors?: Partial<Record<keyof ContactInput, string>>;
          } = await res.json();

          if (res.status === 422 && payload.fieldErrors) {
            (Object.entries(payload.fieldErrors) as Array<[keyof ContactInput, string]>).forEach(
              ([key, msg]) => {
                if (msg) form.setError(key, { type: "server", message: msg });
              },
            );
            setStatus("error");
            setErrorMsg("Please fix the highlighted fields.");
            focusFirstError();
            return;
          }

          setStatus("error");
          setErrorMsg(payload.message ?? fallback);
          return;
        } catch {
          setStatus("error");
          setErrorMsg(fallback);
          return;
        }
      }

      setStatus("success");
      form.reset({ name: "", email: "", subject: "general", message: "", company: "" });
      setMessageLen(0);
      formStartedAtRef.current = Date.now();
    } catch (err) {
      if ((err as DOMException).name === "AbortError") return;
      setStatus("error");
      setErrorMsg("Network error. Check your connection and try again.");
    }
  }

  function onInvalid(): void {
    setStatus("error");
    setErrorMsg("Please fix the highlighted fields.");
    focusFirstError();
  }

  return (
    <div className={cn(
      "flex h-full flex-col rounded-2xl border p-5 sm:p-6",
      "border-border/50 bg-card/80 backdrop-blur-sm",
    )}>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Send className="h-4 w-4" aria-hidden />
          </div>
          <h3 className="text-base font-semibold">Send a message</h3>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="flex flex-1 flex-col gap-5"
          noValidate
          aria-busy={isSubmitting}
        >
          {/* Honeypot */}
          <input
            type="text"
            {...form.register("company")}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute h-0 w-0 p-0 m-0 opacity-0 pointer-events-none"
          />

          {/* Name + Email */}
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contact-name">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      autoComplete="name"
                      inputMode="text"
                      className="rounded-lg border-border/50 bg-background/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                      {...field}
                      aria-invalid={showError("name")}
                    />
                  </FormControl>
                  {showError("name") && <FormMessage />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contact-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      inputMode="email"
                      className="rounded-lg border-border/50 bg-background/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                      {...field}
                      aria-invalid={showError("email")}
                    />
                  </FormControl>
                  {showError("email") && <FormMessage />}
                </FormItem>
              )}
            />
          </div>

          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <div
                    role="radiogroup"
                    aria-label="Choose a subject"
                    className="grid grid-cols-3 gap-2"
                    onKeyDown={(e) => handleSubjectKeyDown(e, field.value, field.onChange)}
                  >
                    {SUBJECT_OPTIONS.map((opt) => {
                      const selected = field.value === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => field.onChange(opt.value)}
                          className={cn(
                            "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                            "outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                            selected
                              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                              : "border border-border/50 bg-background/60 text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </FormControl>
                {showError("subject") && <FormMessage />}
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col min-h-[220px]">
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="contact-message">Message</FormLabel>
                  <span
                    id="message-counter"
                    className={cn(
                      "text-xs tabular-nums",
                      messageLen > 2000
                        ? "text-red-600 dark:text-red-400"
                        : "text-muted-foreground",
                    )}
                    aria-live="polite"
                  >
                    {messageLen}/2000
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell me about your idea..."
                    aria-describedby="message-counter"
                    className="flex-1 h-full min-h-[180px] md:min-h-[260px] resize-y rounded-lg border-border/50 bg-background/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                    rows={10}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setMessageLen(e.currentTarget.value.length);
                    }}
                    aria-invalid={showError("message")}
                  />
                </FormControl>
                {showError("message") && <FormMessage />}
              </FormItem>
            )}
          />

          {/* Status messages */}
          {status === "success" && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl border border-green-600/20 bg-green-600/10 px-4 py-3 text-sm text-green-700 dark:text-green-300"
              aria-live="polite"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
              Your message has been sent. I&apos;ll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-red-600/20 bg-red-600/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
              aria-live="assertive"
            >
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <div className="mt-auto pt-1">
            <button
              type="submit"
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200",
                canSubmit
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed",
              )}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Send className="h-4 w-4" aria-hidden />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
