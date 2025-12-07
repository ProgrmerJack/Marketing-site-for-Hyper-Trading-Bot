import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribe } from "@/lib/newsletter";

// Remove edge runtime if using Node.js specific libs, or keep if compatible. 
// Supabase JS is compatible.
export const runtime = "edge";

const SubscribeSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  consent: z.boolean().optional().default(true),
  source: z.string().optional().default("homepage"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = SubscribeSchema.parse(body);

    const result = await subscribe(validatedData.email);

    if (result.status === "already-subscribed") {
      return NextResponse.json(
        {
          success: true,
          message: "You are already subscribed to the newsletter",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to the newsletter",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.errors[0].message,
        },
        { status: 400 }
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

