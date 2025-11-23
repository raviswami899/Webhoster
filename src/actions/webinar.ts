"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getDashboardStats() {
    const user = await currentUser();

    if (!user) {
        return {
            total: 0,
            draft: 0,
            published: 0,
            completed: 0,
        };
    }

    const webinars = await db.webinar.findMany({
        where: { hostId: user.id },
    });

    const total = webinars.length;
    const draft = webinars.filter((w: { status: string }) => w.status === "DRAFT").length;
    const published = webinars.filter((w: { status: string }) => w.status === "PUBLISHED").length;
    // Assuming completed logic based on endDate
    const completed = webinars.filter((w: { endDate: Date }) => new Date(w.endDate) < new Date()).length;

    return {
        total,
        draft,
        published,
        completed,
    };
}

export async function getWebinars() {
    const user = await currentUser();

    if (!user) {
        return [];
    }

    const webinars = await db.webinar.findMany({
        where: { hostId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { enrollments: true },
            },
        },
    });

    return webinars;
}

export async function createWebinar(data: {
    title: string;
    description: string;
    category: string;
    amount: number;
    startDate: Date;
    endDate: Date;
    whatsappLink?: string;
}) {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    // Ensure user exists in DB (in case they skipped profile)
    const dbUser = await db.user.upsert({
        where: { clerkId: user.id },
        update: {},
        create: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    });

    const webinar = await db.webinar.create({
        data: {
            title: data.title,
            description: data.description,
            category: data.category,
            amount: data.amount,
            startDate: data.startDate,
            endDate: data.endDate,
            whatsappLink: data.whatsappLink,
            status: "DRAFT",
            hostId: dbUser.id,
        },
    });

    return webinar;
}
