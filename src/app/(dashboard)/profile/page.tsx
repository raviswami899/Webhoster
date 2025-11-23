import { getProfile } from "@/actions/user";
import { ProfileForm } from "./profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
    const user = await getProfile();

    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                        Manage your personal information and contact details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm initialData={user} />
                </CardContent>
            </Card>
        </div>
    );
}
