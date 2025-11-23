"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateProfile } from "@/actions/user";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    phonePrimary: z.string().min(10, {
        message: "Phone number must be at least 10 characters.",
    }),
    phoneSecondary: z.string().optional(),
    helpLineNumber: z.string().optional(),
});

interface ProfileFormProps {
    initialData?: {
        firstName: string | null;
        lastName: string | null;
        phonePrimary: string | null;
        phoneSecondary: string | null;
        helpLineNumber: string | null;
    } | null;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: initialData?.firstName || "",
            lastName: initialData?.lastName || "",
            phonePrimary: initialData?.phonePrimary || "",
            phoneSecondary: initialData?.phoneSecondary || "",
            helpLineNumber: initialData?.helpLineNumber || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateProfile(values);
            toast.success("Profile updated successfully");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phonePrimary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Primary Contact Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="+1234567890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneSecondary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Secondary Contact Number (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="+1234567890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="helpLineNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Help Line Number (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="+1234567890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Save Changes</Button>
            </form>
        </Form>
    );
}
