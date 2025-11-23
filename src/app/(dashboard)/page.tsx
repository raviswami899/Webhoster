import { getDashboardStats, getWebinars } from "@/actions/webinar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { WebinarTable } from "@/components/dashboard/webinar-table";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await currentUser();
    if (!user) redirect("/");

    const profile = await getProfile();
    const stats = await getDashboardStats();
    const webinars = await getWebinars();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center space-x-4">
                    <img
                        src={user.imageUrl}
                        alt="User"
                        className="h-12 w-12 rounded-full"
                    />
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Welcome back, {profile?.firstName || user.firstName}!
                        </h2>
                        <p className="text-muted-foreground">
                            Here's an overview of your webinars.
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href="/webinar/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create Webinar
                        </Button>
                    </Link>
                </div>
            </div>
            <StatsCards {...stats} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-7">
                    <WebinarTable webinars={webinars} />
                </div>
            </div>
        </div>
    );
}
