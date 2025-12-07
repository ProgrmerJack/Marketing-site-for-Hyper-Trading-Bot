import { NextResponse } from "next/server";
import { z } from "zod";
import { sbAdmin } from "@/lib/supabase-admin";
import { sendContactConfirmation } from "@/lib/email";


const Body = z.object({
  email: z.string().email(),
  company: z.string().min(2),
  jurisdiction: z.string().min(2),
  message: z.string().min(1).max(4000).optional(),
  role: z.string().max(120).optional(),
  consent: z.string(), // "true" from form
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = Body.parse(json);

    // Convert consent string to boolean
    const insertData = {
      ...body,
      consent: body.consent === "true",
    };

    console.log('[Contact API] Attempting to insert:', insertData);
    const { data, error } = await sbAdmin.from("contacts").insert(insertData).select().single();

    if (error) {
      console.error('[Contact API] Database error:', error);
      // Map known Postgres/Supabase errors → clean responses
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "duplicate", message: "A similar entry already exists." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "db_error", message: error.message, details: error },
        { status: 502 }
      );
    }

    console.log('[Contact API] Successfully inserted:', data);

    // Send confirmation email
    try {
      await sendContactConfirmation(body.email, body.company);
      console.log(`[Contact API] Confirmation email sent to: ${body.email}`);
    } catch (emailError) {
      console.error('[Contact API] Failed to send email:', emailError);
      // Don't fail the request if email fails - contact is still saved
    }


    return NextResponse.json({
      ok: true,
      data,
      message: "Thanks. We'll be in touch after reviewing compliance requirements."
    }, { status: 201 });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      return NextResponse.json({ error: "validation", issues: err.issues }, { status: 422 });
    }
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}

