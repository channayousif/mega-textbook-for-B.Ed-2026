import React, { useState } from 'react';
import Layout from '@theme/Layout';
import AuthGuard from '@site/src/components/AuthGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { getSupabase } from '@site/src/lib/supabase';

// Placeholders for accounts
const ACCOUNTS = {
  bank: 'PK00 XXXX 0000 0000 0000 0000 (Raast: 0300 0000000)',
  jazzcash: '0300 0000000',
  easypaisa: '0300 0000000',
};

export default function PurchasePage(): React.ReactElement {
  const { profile } = useAuth();
  const [method, setMethod] = useState<'bank' | 'jazzcash' | 'easypaisa'>('bank');
  const [transactionId, setTransactionId] = useState('');
  const [sender, setSender] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [shortRef, setShortRef] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setError(null);
    setSubmitting(true);

    const supabase = getSupabase();
    // Generate a short reference
    const ref = 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    let receiptUrl = null;
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Screenshot must be less than 10MB');
        setSubmitting(false);
        return;
      }
      const ext = file.name.split('.').pop();
      const path = `${profile.id}/${ref}.${ext}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(path, file);
      
      if (uploadError) {
        setError('Failed to upload screenshot. ' + uploadError.message);
        setSubmitting(false);
        return;
      }
      receiptUrl = path;
    }

    const { error: insertError } = await supabase
      .from('orders')
      .insert({
        buyer_id: profile.id,
        method,
        claimed_transaction_id: transactionId,
        claimed_sender: sender,
        amount: 1500,
        status: 'pending_verification',
        short_reference: ref,
        receipt_url: receiptUrl
      });

    if (insertError) {
      setError('Failed to submit claim: ' + insertError.message);
    } else {
      setSuccess('Claim submitted successfully. Please wait for manual verification (typically one working day).');
      setShortRef(ref);
    }
    setSubmitting(false);
  }

  return (
    <Layout title="Purchase Licence Practice Pass">
      <AuthGuard>
        <main className="container margin-vert--lg">
          <h1>Purchase Licence Practice Pass</h1>
          
          {success ? (
            <div className="alert alert--success">
              {success}
              <br/><br/>
              <strong>Your Reference: {shortRef}</strong>
            </div>
          ) : (
            <div className="row">
              <div className="col col--6">
                <div className="card shadow--md margin-bottom--lg">
                  <div className="card__header">
                    <h3>1. Send Rs 1,500 to one of these accounts</h3>
                  </div>
                  <div className="card__body">
                    <ul>
                      <li><strong>Bank Transfer / Raast:</strong> {ACCOUNTS.bank}</li>
                      <li><strong>JazzCash:</strong> {ACCOUNTS.jazzcash}</li>
                      <li><strong>EasyPaisa:</strong> {ACCOUNTS.easypaisa}</li>
                    </ul>
                  </div>
                </div>

                <div className="card shadow--md">
                  <div className="card__header">
                    <h3>2. Submit your payment claim</h3>
                  </div>
                  <div className="card__body">
                    {error && <div className="alert alert--danger margin-bottom--md">{error}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="margin-bottom--md">
                        <label>Payment Method Used</label>
                        <select className="input" value={method} onChange={e => setMethod(e.target.value as any)}>
                          <option value="bank">Bank / Raast</option>
                          <option value="jazzcash">JazzCash</option>
                          <option value="easypaisa">EasyPaisa</option>
                        </select>
                      </div>
                      <div className="margin-bottom--md">
                        <label>Transaction ID (TID) / Reference</label>
                        <input className="input" required value={transactionId} onChange={e => setTransactionId(e.target.value)} />
                      </div>
                      <div className="margin-bottom--md">
                        <label>Sender Account Name / Number</label>
                        <input className="input" required value={sender} onChange={e => setSender(e.target.value)} />
                      </div>
                      <div className="margin-bottom--md">
                        <label>Screenshot (optional, max 10MB)</label>
                        <input type="file" className="input" accept="image/png,image/jpeg,application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
                      </div>
                      <button type="submit" className="button button--primary" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Claim'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </AuthGuard>
    </Layout>
  );
}
