"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function enrollUser(webinarId: string) {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    // Check if already enrolled
    const existingEnrollment = await db.enrollment.findFirst({
        where: {
            webinarId,
            userEmail: user.emailAddresses[0].emailAddress,
        },
    });

    if (existingEnrollment) {
        return { success: true, message: "Already enrolled" };
    }

    // Create enrollment (Mark as paid for demo purposes, or handle Stripe here)
    await db.enrollment.create({
        data: {
            webinarId,
            userEmail: user.emailAddresses[0].emailAddress,
            paid: true, // Simulating successful payment
        },
    });

    revalidatePath(`/webinar/${webinarId}`);
    return { success: true, message: "Enrolled successfully" };
}

export async function getEnrollment(webinarId: string) {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    const enrollment = await db.enrollment.findFirst({
        where: {
            webinarId,
            userEmail: user.emailAddresses[0].emailAddress,
        },
    });

    return enrollment;
}
