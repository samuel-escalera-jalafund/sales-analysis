import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const sales = await prisma.sales_Fact.findMany();
        return NextResponse.json(sales);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching sales data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}