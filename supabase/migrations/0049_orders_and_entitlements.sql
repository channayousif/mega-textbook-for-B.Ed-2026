-- Migration 0049: Orders and Entitlements

CREATE TYPE order_status AS ENUM (
  'awaiting_payment',
  'pending_verification',
  'verified',
  'rejected',
  'refunded'
);

CREATE TYPE payment_method AS ENUM (
  'jazzcash',
  'easypaisa',
  'bank'
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    method payment_method,
    claimed_transaction_id TEXT,
    claimed_sender TEXT,
    amount INTEGER,
    status order_status NOT NULL DEFAULT 'awaiting_payment',
    short_reference TEXT NOT NULL UNIQUE,
    receipt_url TEXT,
    buyer_receiving_number TEXT,
    outgoing_transfer_reference TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    entitlement_type TEXT NOT NULL,
    transaction_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    revoked_at TIMESTAMPTZ
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

-- Orders RLS
CREATE POLICY "Buyers can read own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = buyer_id);

CREATE POLICY "Buyers can insert own claims"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = buyer_id AND status = 'awaiting_payment');

CREATE POLICY "Buyers can update own claims if awaiting payment"
    ON public.orders FOR UPDATE
    USING (auth.uid() = buyer_id AND status = 'awaiting_payment')
    WITH CHECK (auth.uid() = buyer_id AND status = 'pending_verification');

CREATE POLICY "Admins can read all orders"
    ON public.orders FOR SELECT
    USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all orders"
    ON public.orders FOR UPDATE
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete all orders"
    ON public.orders FOR DELETE
    USING (public.is_admin(auth.uid()));

-- Entitlements RLS
CREATE POLICY "Buyers can read own entitlements"
    ON public.entitlements FOR SELECT
    USING (auth.uid() = buyer_id);

CREATE POLICY "Admins can manage entitlements"
    ON public.entitlements FOR ALL
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

-- Timestamp triggers
CREATE TRIGGER set_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Storage for receipts
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'receipts',
  'receipts',
  false,
  10485760, -- 10 MB
  ARRAY[
    'image/png',
    'image/jpeg',
    'application/pdf'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Receipts Storage Policies (Path convention: {buyer_id}/{filename})
CREATE POLICY receipts_bucket_select
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'receipts'
    AND (
      split_part(name, '/', 1) = auth.uid()::text
      OR public.is_admin(auth.uid())
    )
  );

CREATE POLICY receipts_bucket_insert
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'receipts'
    AND split_part(name, '/', 1) = auth.uid()::text
  );
