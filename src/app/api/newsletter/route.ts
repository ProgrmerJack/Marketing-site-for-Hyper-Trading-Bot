import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribe } from "@/lib/newsletter";

const Body = z.object({ email: z.string().email() });

export async function POST(req: Request) {
    try {
        const { email } = Body.parse(await req.json());
        const result = await subscribe(email);
        return NextResponse.json(result, { status: 201 });
    } catch (err: any) {
        if (err?.code === "23505") {
            return NextResponse.json({ status: "already-subscribed" }, { status: 200 });
        }
        if (err?.name === "ZodError") {
            return NextResponse.json({ error: "validation", issues: err.issues }, { status: 422 });
        }
        return NextResponse.json({ error: "unexpected" }, { status: 500 });
    }
}
