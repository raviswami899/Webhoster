import { WebinarForm } from "./webinar-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateWebinarPage() {
    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create Webinar</CardTitle>
                    <CardDescription>
                        Fill in the details to create a new webinar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <WebinarForm />
                </CardContent>
            </Card>
        </div>
    );
}
