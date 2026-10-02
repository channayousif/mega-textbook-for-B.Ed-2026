-- 0050_licence_practice_pages.sql

CREATE TABLE public.paid_pages (
    id TEXT,
    locale TEXT NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (id, locale)
);

ALTER TABLE public.paid_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users with entitlement can read paid pages"
    ON public.paid_pages FOR SELECT
    USING (
      public.is_admin(auth.uid()) OR
      EXISTS (
          SELECT 1 FROM public.entitlements e
          WHERE e.buyer_id = auth.uid()
          AND e.entitlement_type = 'licence_practice_pass'
          AND e.revoked_at IS NULL
      )
    );

CREATE POLICY "Admins can manage paid pages"
    ON public.paid_pages FOR ALL
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));
