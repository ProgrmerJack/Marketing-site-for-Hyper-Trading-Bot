# How to View Data in Supabase Dashboard

## Important: Check the `api` Schema

Your tables are created in the **`api` schema**, not the default `public` schema.

### Steps to View Your Data:

1. Open your Supabase Dashboard
2. Go to **Table Editor** (left sidebar)
3. Look for a **schema selector** (usually at the top of the page or in the table list)
4. **Select `api` schema** instead of `public`
5. You should now see two tables:
   - `contacts`
   - `subscribers`

### Alternative: Use SQL Editor

1. Go to **SQL Editor** in your Supabase Dashboard
2. Run this query to view all contacts:
   ```sql
   SELECT * FROM api.contacts ORDER BY created_at DESC;
   ```
3. Run this query to view all subscribers:
   ```sql
   SELECT * FROM api.subscribers ORDER BY created_at DESC;
   ```

### Verify Schema Structure

To confirm the tables exist in the `api` schema:
```sql
SELECT table_schema, table_name 
FROM information_schema.tables 
WHERE table_schema = 'api';
```

This should return:
- `api.contacts`
- `api.subscribers`
