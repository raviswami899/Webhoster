import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnrollButton } from "./enroll-button";
import { getEnrollment } from "@/actions/enrollment";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface PublicWebinarPageProps {
    params: {
        id: string;
    };
}

export default async function PublicWebinarPage({ params }: PublicWebinarPageProps) {
    const webinar = await db.webinar.findUnique({
        where: { id: params.id },
        include: {
            host: true,
        },
    });

    if (!webinar) {
        notFound();
    }

    const user = await currentUser();
    const enrollment = await getEnrollment(params.id);
    const isEnrolled = !!enrollment?.paid;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-8 sm:p-10">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">{webinar.title}</h1>
                            <Badge variant={webinar.status === "PUBLISHED" ? "default" : "secondary"}>
                                {webinar.category}
                            </Badge>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-gray-500">
                            <span className="mr-4">Hosted by {webinar.host.firstName} {webinar.host.lastName}</span>
                            <span>{format(webinar.startDate, "PPP p")} - {format(webinar.endDate, "p")}</span>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900">About this webinar</h3>
                            <p className="mt-2 text-gray-600">{webinar.description}</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-8 sm:p-10 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="text-3xl font-bold text-gray-900">${webinar.amount}</p>
                            </div>
                            <div className="w-40">
                                {user ? (
                                    <EnrollButton
                                        webinarId={webinar.id}
                                        amount={webinar.amount}
                                        isEnrolled={isEnrolled}
                                    />
                                ) : (
                                    <SignInButton mode="modal">
                                        <Button className="w-full">Sign in to Enroll</Button>
                                    </SignInButton>
                                )}
                            </div>
                        </div>
                        {isEnrolled && webinar.whatsappLink && (
                            <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
                                <h4 className="text-green-800 font-medium">Success! You are enrolled.</h4>
                                <p className="mt-1 text-green-700 text-sm">
                                    Join the WhatsApp group to stay updated:
                                </p>
                                <a
                                    href={webinar.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-block text-green-600 hover:underline font-medium"
                                >
                                    Join WhatsApp Group
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
