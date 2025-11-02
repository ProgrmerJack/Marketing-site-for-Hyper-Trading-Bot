import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  email: z.string().email(),
  company: z.string().min(2),
  jurisdiction: z.string().min(2),
  message: z.string().max(2000).optional(),
  role: z.string().max(120).optional(),
  consent: z.literal("true"),
});

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid submission",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // TODO: integrate with transactional email / CRM system.
  return NextResponse.json(
    {
      status: "accepted",
      message: "Thanks. We’ll be in touch after reviewing compliance requirements.",
    },
    { status: 202 },
  );
}
