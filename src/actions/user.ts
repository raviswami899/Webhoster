"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: {
    firstName: string;
    lastName: string;
    phonePrimary: string;
    phoneSecondary?: string;
    helpLineNumber?: string;
}) {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    // Ensure user exists in DB
    const dbUser = await db.user.upsert({
        where: { clerkId: user.id },
        update: {
            firstName: data.firstName,
            lastName: data.lastName,
            phonePrimary: data.phonePrimary,
            phoneSecondary: data.phoneSecondary,
            helpLineNumber: data.helpLineNumber,
        },
        create: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            firstName: data.firstName,
            lastName: data.lastName,
            phonePrimary: data.phonePrimary,
            phoneSecondary: data.phoneSecondary,
            helpLineNumber: data.helpLineNumber,
        },
    });

    revalidatePath("/profile");
    return dbUser;
}

export async function getProfile() {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    const dbUser = await db.user.findUnique({
        where: { clerkId: user.id },
    });

    return dbUser;
}
