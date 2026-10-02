-- 0052_order_verification_trigger.sql

-- When an order becomes 'verified', create the entitlement.
-- When an order becomes 'refunded' or 'rejected', revoke the entitlement if it exists.

CREATE OR REPLACE FUNCTION public.handle_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'verified' AND OLD.status != 'verified' THEN
    -- Grant entitlement
    INSERT INTO public.entitlements (buyer_id, order_id, entitlement_type, transaction_id)
    VALUES (NEW.buyer_id, NEW.id, 'licence_practice_pass', NEW.claimed_transaction_id)
    ON CONFLICT (transaction_id) DO UPDATE SET revoked_at = NULL;
    
  ELSIF NEW.status IN ('refunded', 'rejected') AND OLD.status NOT IN ('refunded', 'rejected') THEN
    -- Revoke entitlement
    UPDATE public.entitlements
    SET revoked_at = now()
    WHERE order_id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_order_status_change
  AFTER UPDATE OF status ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_order_status_change();
