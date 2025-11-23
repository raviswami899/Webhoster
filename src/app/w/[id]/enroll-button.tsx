"use client";

import { Button } from "@/components/ui/button";
import { enrollUser } from "@/actions/enrollment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface EnrollButtonProps {
    webinarId: string;
    amount: number;
    isEnrolled: boolean;
}

export function EnrollButton({ webinarId, amount, isEnrolled }: EnrollButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleEnroll() {
        try {
            setLoading(true);
            const result = await enrollUser(webinarId);
            if (result.success) {
                toast.success(result.message);
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to enroll. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (isEnrolled) {
        return (
            <Button disabled className="w-full bg-green-600 hover:bg-green-700">
                Enrolled
            </Button>
        );
    }

    return (
        <Button onClick={handleEnroll} disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enroll for ${amount}
        </Button>
    );
}
