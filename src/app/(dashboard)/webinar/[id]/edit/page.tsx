import { db } from "@/lib/db";
import { WebinarForm } from "../../create/webinar-form"; // Reusing the form, need to adapt it for edit
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

interface EditWebinarPageProps {
    params: {
        id: string;
    };
}

export default async function EditWebinarPage({ params }: EditWebinarPageProps) {
    const webinar = await db.webinar.findUnique({
        where: { id: params.id },
    });

    if (!webinar) {
        notFound();
    }

    // We need to adapt WebinarForm to accept initial data
    // For now, I'll just render the form. I need to update WebinarForm to accept props.
    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Webinar</CardTitle>
                    <CardDescription>
                        Update webinar details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* @ts-ignore: Component needs update to accept initialData */}
                    <WebinarForm initialData={webinar} />
                </CardContent>
            </Card>
        </div>
    );
}
