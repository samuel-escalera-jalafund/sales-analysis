import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
    return NextResponse.json({ test: 'Hello World!' });
}