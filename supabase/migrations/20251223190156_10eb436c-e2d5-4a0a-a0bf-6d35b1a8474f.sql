-- Drop the restrictive policy
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create a permissive policy instead
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);