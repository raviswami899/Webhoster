import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface Webinar {
    id: string;
    title: string;
    category: string;
    status: string;
    amount: number;
    startDate: Date;
    endDate: Date;
    _count: {
        enrollments: number;
    };
}

interface WebinarTableProps {
    webinars: Webinar[];
}

export function WebinarTable({ webinars }: WebinarTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Enrolled</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {webinars.map((webinar) => (
                        <TableRow key={webinar.id}>
                            <TableCell className="font-medium">
                                <Link href={`/webinar/${webinar.id}`} className="hover:underline">
                                    {webinar.title}
                                </Link>
                            </TableCell>
                            <TableCell>{webinar.category}</TableCell>
                            <TableCell>
                                <Badge variant={webinar.status === "PUBLISHED" ? "default" : "secondary"}>
                                    {webinar.status}
                                </Badge>
                            </TableCell>
                            <TableCell>${webinar.amount}</TableCell>
                            <TableCell>{webinar._count.enrollments}</TableCell>
                            <TableCell>{new Date(webinar.startDate).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Link href={`/webinar/${webinar.id}/edit`}>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
