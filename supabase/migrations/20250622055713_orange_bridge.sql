/*
  # Initial Schema for Everything Coconut

  1. New Tables
    - `collections`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `image` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (numeric)
      - `description` (text)
      - `image` (text)
      - `collection_id` (uuid, foreign key)
      - `featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `site_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `build_triggers`
      - `id` (uuid, primary key)
      - `trigger_type` (text)
      - `table_name` (text)
      - `record_id` (uuid)
      - `action` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage data
    - Add policies for public read access

  3. Functions
    - Auto-update timestamps
    - Trigger build hooks on data changes
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price > 0),
  description text NOT NULL,
  image text NOT NULL,
  collection_id uuid REFERENCES collections(id) ON DELETE CASCADE,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Build triggers table
CREATE TABLE IF NOT EXISTS build_triggers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trigger_type text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  action text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE build_triggers ENABLE ROW LEVEL SECURITY;

-- Collections policies
CREATE POLICY "Collections are viewable by everyone"
  ON collections
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Collections are manageable by authenticated users"
  ON collections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Products policies
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Products are manageable by authenticated users"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Site settings policies
CREATE POLICY "Site settings are viewable by everyone"
  ON site_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Site settings are manageable by authenticated users"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Build triggers policies
CREATE POLICY "Build triggers are manageable by authenticated users"
  ON build_triggers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to log build triggers
CREATE OR REPLACE FUNCTION log_build_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO build_triggers (trigger_type, table_name, record_id, action)
  VALUES ('data_change', TG_TABLE_NAME, COALESCE(NEW.id, OLD.id), TG_OP);
  RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Triggers for build logging
CREATE TRIGGER collections_build_trigger
  AFTER INSERT OR UPDATE OR DELETE ON collections
  FOR EACH ROW
  EXECUTE FUNCTION log_build_trigger();

CREATE TRIGGER products_build_trigger
  AFTER INSERT OR UPDATE OR DELETE ON products
  FOR EACH ROW
  EXECUTE FUNCTION log_build_trigger();

CREATE TRIGGER site_settings_build_trigger
  AFTER INSERT OR UPDATE OR DELETE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION log_build_trigger();