import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, BarChart, AlertTriangle } from 'lucide-react';
import { differenceInDays, addDays } from 'date-fns';
import OnboardingForm from '@/components/OnboardingForm';

export default async function DashboardPage() {
  const supabase = await createClient(); // ✅ FIXED: await here

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the user's complete profile
  const { data: userProfile, error: profileError } = await supabase
    .from('profiles')
    .select('plan_status, subscription_start_date, leads_used_this_cycle, has_completed_onboarding')
    .eq('id', user.id)
    .single();

  if (profileError || !userProfile) {
    console.error('Error fetching user profile:', profileError?.message);
    return (
      <div className="pt-10">
        <OnboardingForm userId={user.id} />
      </div>
    );
  }

  if (!userProfile.has_completed_onboarding) {
    return (
      <div className="pt-10">
        <OnboardingForm userId={user.id} />
      </div>
    );
  }

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const trialDaysLeft =
    7 - differenceInDays(new Date(), new Date(userProfile.subscription_start_date));
  const nextInvoiceDate = addDays(new Date(userProfile.subscription_start_date), 30);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {user.email}</p>
      </div>

      {/* Trial or payment due banner */}
      {userProfile.plan_status === 'trialing' && trialDaysLeft >= 0 && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
          You have <span className="font-bold">{trialDaysLeft}</span> days left in your free trial.
        </div>
      )}
      {userProfile.plan_status === 'payment_due' && (
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle>Payment Due</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Your invoice for the last cycle is due. Please complete your payment to continue
              service.
            </p>
            <Button asChild className="mt-4">
              <Link href="/billing">Pay Now</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads This Cycle</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProfile.leads_used_this_cycle}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Invoice</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(userProfile.leads_used_this_cycle * 1.39).toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Invoice Date</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nextInvoiceDate.toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads table */}
      <div>
        <h2 className="text-2xl font-bold">Your Leads</h2>
        <Card className="mt-4">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left bg-muted">
                  <tr>
                    <th className="p-4 font-medium">Customer Name</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads && leads.length > 0 ? (
                    leads.map((lead) => (
                      <tr key={lead.id} className="border-t">
                        <td className="p-4">{lead.customer_name || 'N/A'}</td>
                        <td className="p-4">{lead.customer_contact || 'N/A'}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-8 text-center text-muted-foreground"
                      >
                        You have no leads yet. They will appear here automatically!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
