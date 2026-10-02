import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import AuthGuard from '@site/src/components/AuthGuard';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { supabase } from '@site/src/lib/supabase';

export default function AdminOrdersPage(): React.ReactElement {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadOrders() {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('orders')
      .select('*, profiles!buyer_id(email, name)')
      .order('created_at', { ascending: false });
    
    if (err) setError(err.message);
    else setOrders(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(orderId: string, status: string) {
    const updates: any = { status };
    if (status === 'refunded') {
      const buyer_receiving_number = prompt('Enter buyer receiving number:');
      if (!buyer_receiving_number) return;
      const outgoing_transfer_reference = prompt('Enter outgoing transfer reference:');
      if (!outgoing_transfer_reference) return;
      updates.buyer_receiving_number = buyer_receiving_number;
      updates.outgoing_transfer_reference = outgoing_transfer_reference;
    }

    const { error: err } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId);
    
    if (err) alert('Failed: ' + err.message);
    else loadOrders();
  }

  return (
    <Layout title="Orders Admin">
      <AuthGuard requireRole={['admin']}>
        <AppDashboardShell title="Orders" activePath="/app/admin/orders">
          <h2>Pending Claims</h2>
          {error && <div className="alert alert--danger">{error}</div>}
          {loading ? <p>Loading...</p> : (
            <table className="table">
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Buyer</th>
                  <th>Method</th>
                  <th>TID</th>
                  <th>Sender</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>{o.short_reference}</td>
                    <td>{o.profiles?.name} ({o.profiles?.email})</td>
                    <td>{o.method}</td>
                    <td>{o.claimed_transaction_id}</td>
                    <td>{o.claimed_sender}</td>
                    <td>{o.amount}</td>
                    <td>{o.status}</td>
                    <td>
                      {o.status === 'pending_verification' && (
                        <>
                          <button onClick={() => updateStatus(o.id, 'verified')} className="button button--sm button--success margin-right--sm">Verify</button>
                          <button onClick={() => updateStatus(o.id, 'rejected')} className="button button--sm button--danger">Reject</button>
                        </>
                      )}
                      {o.status === 'verified' && (
                        <button onClick={() => updateStatus(o.id, 'refunded')} className="button button--sm button--warning">Refund</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </AppDashboardShell>
      </AuthGuard>
    </Layout>
  );
}
