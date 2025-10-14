import { redirect } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout is now part of the /account layout.
    // Redirect any direct access to the account page.
    redirect('/account');
}
