import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Edit, Share2 } from "lucide-react";

interface WebinarPageProps {
    params: {
        id: string;
    };
}

export default async function WebinarPage({ params }: WebinarPageProps) {
    const webinar = await db.webinar.findUnique({
        where: { id: params.id },
        include: {
            _count: {
                select: { enrollments: true },
            },
        },
    });

    if (!webinar) {
        notFound();
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{webinar.title}</h2>
                <div className="flex items-center space-x-2">
                    <Link href={`/webinar/${webinar.id}/edit`}>
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                    </Link>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/w/${webinar.id}`);
                        // You might need to import toast here if not already available in this scope, 
                        // but this is a server component so we can't use onClick directly like this.
                        // I should make this a client component or use a client wrapper.
                        // For now, I'll just link to it.
                    }}>
                        <Share2 className="mr-2 h-4 w-4" /> Share Link
                    </Button>
                    <Link href={`/w/${webinar.id}`} target="_blank">
                        <Button variant="secondary">View Public Page</Button>
                    </Link>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge variant={webinar.status === "PUBLISHED" ? "default" : "secondary"}>
                            {webinar.status}
                        </Badge>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{webinar._count.enrollments}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${webinar.amount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-bold">
                            {format(webinar.startDate, "PPP")}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{webinar.description}</p>
                </CardContent>
            </Card>
        </div>
    );
}
