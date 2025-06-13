'use client';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export default function DashboardPage() {
  const [salesSummary, setSalesSummary] = useState({
    today: { count: 0, amount: 0 },
    week: { count: 0, amount: 0 },
    month: { count: 0, amount: 0 },
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesSummary.today.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
              <p className="text-xs text-muted-foreground">{salesSummary.today.count} transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesSummary.week.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
              <p className="text-xs text-muted-foreground">{salesSummary.week.count} transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesSummary.month.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
              <p className="text-xs text-muted-foreground">{salesSummary.month.count} transactions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No recent sales data available.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
