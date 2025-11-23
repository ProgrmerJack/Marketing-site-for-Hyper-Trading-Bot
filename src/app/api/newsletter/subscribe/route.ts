/**
 * Newsletter Subscribe Endpoint
 * Handles email subscriptions for the mailing list
 * GDPR and CAN-SPAM compliant
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { newsletterService, SubscriptionRecord } from "@/lib/newsletter";

export const runtime = "edge";

const SubscribeSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  consent: z.boolean().optional().default(true),
  source: z.string().optional().default("homepage"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = SubscribeSchema.parse(body);

    // Check for duplicate subscription
    const isSubscribed = await newsletterService.isSubscribed(validatedData.email);
    
    if (isSubscribed) {
      return NextResponse.json(
        {
          success: true,
          message: "You are already subscribed to the newsletter",
        },
        { status: 200 }
      );
    }

    const record: SubscriptionRecord = {
      email: validatedData.email,
      timestamp: new Date().toISOString(),
      source: validatedData.source,
      ipAddress:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      consent: validatedData.consent,
    };

    // Store in database
    await newsletterService.subscribe(record);

    // Send welcome email and add to provider
    await Promise.all([
      newsletterService.sendWelcomeEmail(validatedData.email),
      newsletterService.addToProvider(validatedData.email, validatedData.source)
    ]);

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

// Support OPTIONS for CORS preflight
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
