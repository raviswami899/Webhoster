import { UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <div className="flex items-center p-4 border-b h-full">
            <div className="ml-auto flex items-center gap-x-4">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}
