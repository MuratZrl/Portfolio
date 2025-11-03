// src/features/contact/sections/ContactForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, type ContactInput } from "@/features/contact/schema";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [status, setStatus] = React.useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [messageLen, setMessageLen] = React.useState<number>(0);
  const [copiedJson, setCopiedJson] = React.useState<boolean>(false);

  const formStartedAtRef = React.useRef<number>(Date.now());
  const minSubmitDelayMs = 1200;
  const inFlightRef = React.useRef<AbortController | null>(null);

  function focusFirstError(): void {
    const order: Array<keyof ContactInput> = ["name", "email", "subject", "message"];
    for (const key of order) {
      if (form.formState.errors[key]) {
        form.setFocus(key);
        break;
      }
    }
  }

  function handleSubjectKeyDown(
    e: React.KeyboardEvent<HTMLDivElement>,
    current: SubjectValue,
    onChange: (v: SubjectValue) => void
  ): void {
    const idx = SUBJECT_OPTIONS.findIndex(o => o.value === current);
    if (idx < 0) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = SUBJECT_OPTIONS[(idx + 1) % SUBJECT_OPTIONS.length];
      onChange(next.value);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev =
        SUBJECT_OPTIONS[(idx - 1 + SUBJECT_OPTIONS.length) % SUBJECT_OPTIONS.length];
      onChange(prev.value);
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
        let message = "Something went wrong.";
        try {
          const payload: { message?: string } = await res.json();
          message = payload.message ?? message;
        } catch {}
        setStatus("error");
        setErrorMsg(message);
        return;
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
    <Card className="w-full h-full self-stretch flex flex-col">
      <CardHeader>
        <CardTitle>Send a message</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="flex flex-1 flex-col gap-5"
            noValidate
            aria-busy={form.formState.isSubmitting}
          >
            {/* TOP FIELDS */}
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="contact-name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="contact-name"
                        placeholder="Your name"
                        autoComplete="name"
                        inputMode="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* SUBJECT */}
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
                              "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                              selected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-input hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MESSAGE fills the remaining height */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col min-h-[220px]">
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="contact-message">Message</FormLabel>
                    <span
                      id="message-counter"
                      className={cn(
                        "text-xs tabular-nums",
                        messageLen > 2000 ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
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
                      className="flex-1 h-full min-h-[180px] md:min-h-[260px] resize-y"
                      rows={10}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setMessageLen(e.currentTarget.value.length);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* STATUS */}
            {status === "success" && (
              <div
                role="status"
                className="rounded-md border border-green-600/20 bg-green-600/10 px-3 py-2 text-sm text-green-700 dark:text-green-300"
                aria-live="polite"
              >
                Your message has been sent. I’ll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div
                role="alert"
                className="rounded-md border border-red-600/20 bg-red-600/10 px-3 py-2 text-sm text-red-700 dark:text-red-300"
                aria-live="assertive"
              >
                {errorMsg}
              </div>
            )}

            {/* ACTIONS pinned to bottom */}
            <div className="mt-auto flex items-center gap-3 pt-1">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : "Send"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={form.formState.isSubmitting}
                onClick={() => {
                  const payload: ContactInput = {
                    name: form.getValues("name"),
                    email: form.getValues("email"),
                    subject: form.getValues("subject"),
                    message: form.getValues("message"),
                    company: "",
                  };
                  void navigator.clipboard
                    .writeText(JSON.stringify(payload, null, 2))
                    .then(() => setCopiedJson(true))
                    .finally(() => {
                      window.setTimeout(() => setCopiedJson(false), 1200);
                    });
                }}
                aria-live="polite"
              >
                {copiedJson ? "Copied" : "Copy as JSON"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
