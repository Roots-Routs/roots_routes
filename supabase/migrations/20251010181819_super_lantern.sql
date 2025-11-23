/*
  # Heritage Tours Database Schema

  1. New Tables
    - `heritage_themes`
      - `id` (uuid, primary key)
      - `name` (text)
      - `icon` (text)
      - `description` (text)
      - `experiences` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tour_routes`
      - `id` (uuid, primary key)
      - `name` (text)
      - `duration` (integer)
      - `description` (text)
      - `image` (text)
      - `featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `experiences`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `category` (text)
      - `price` (decimal)
      - `description` (text)
      - `theme` (text)
      - `is_full_day` (boolean)
      - `image` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `accommodations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price_per_room` (decimal)
      - `description` (text)
      - `amenities` (text array)
      - `rating` (decimal)
      - `image` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `partners`
      - `id` (uuid, primary key)
      - `name` (text)
      - `contact_person` (text)
      - `email` (text)
      - `phone` (text)
      - `website` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `route_partners`
      - `id` (uuid, primary key)
      - `route_id` (uuid, foreign key)
      - `partner_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

-- Heritage Themes Table
CREATE TABLE IF NOT EXISTS heritage_themes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL DEFAULT '🏛️',
  description text NOT NULL,
  experiences text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE heritage_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Heritage themes are viewable by everyone"
  ON heritage_themes
  FOR SELECT
  USING (true);

CREATE POLICY "Heritage themes are editable by authenticated users"
  ON heritage_themes
  FOR ALL
  TO authenticated
  USING (true);

-- Tour Routes Table
CREATE TABLE IF NOT EXISTS tour_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  duration integer NOT NULL DEFAULT 3,
  description text NOT NULL,
  image text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tour_routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tour routes are viewable by everyone"
  ON tour_routes
  FOR SELECT
  USING (true);

CREATE POLICY "Tour routes are editable by authenticated users"
  ON tour_routes
  FOR ALL
  TO authenticated
  USING (true);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  category text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  description text NOT NULL,
  theme text NOT NULL,
  is_full_day boolean DEFAULT false,
  image text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experiences are viewable by everyone"
  ON experiences
  FOR SELECT
  USING (true);

CREATE POLICY "Experiences are editable by authenticated users"
  ON experiences
  FOR ALL
  TO authenticated
  USING (true);

-- Accommodations Table
CREATE TABLE IF NOT EXISTS accommodations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price_per_room decimal(10,2) NOT NULL DEFAULT 0,
  description text NOT NULL,
  amenities text[] DEFAULT '{}',
  rating decimal(2,1) DEFAULT 4.0,
  image text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accommodations are viewable by everyone"
  ON accommodations
  FOR SELECT
  USING (true);

CREATE POLICY "Accommodations are editable by authenticated users"
  ON accommodations
  FOR ALL
  TO authenticated
  USING (true);

-- Partners Table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text DEFAULT '',
  email text DEFAULT '',
  phone text DEFAULT '',
  website text DEFAULT '',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners are viewable by everyone"
  ON partners
  FOR SELECT
  USING (true);

CREATE POLICY "Partners are editable by authenticated users"
  ON partners
  FOR ALL
  TO authenticated
  USING (true);

-- Route Partners Junction Table
CREATE TABLE IF NOT EXISTS route_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid REFERENCES tour_routes(id) ON DELETE CASCADE,
  partner_id uuid REFERENCES partners(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(route_id, partner_id)
);

ALTER TABLE route_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Route partners are viewable by everyone"
  ON route_partners
  FOR SELECT
  USING (true);

CREATE POLICY "Route partners are editable by authenticated users"
  ON route_partners
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample heritage themes
INSERT INTO heritage_themes (name, icon, description, experiences) VALUES
('Indigenous Heritage', '🏛️', 'First Nations sacred sites and storytelling traditions', ARRAY[
  'First Nations sacred sites and storytelling traditions',
  'Métis settlements and cultural celebrations',
  'Traditional crafts, foods, and ceremonies',
  'Medicine wheels and ancient gathering places'
]),
('Western Heritage', '🤠', 'RCMP history and frontier justice', ARRAY[
  'RCMP history and frontier justice',
  'Ranching culture and cowboy traditions',
  'Pioneer settlements and homestead stories',
  'Rodeos, cattle drives, and western cuisine'
]),
('European Roots', '🌾', 'Ukrainian churches, festivals, and traditional foods', ARRAY[
  'Ukrainian churches, festivals, and traditional foods',
  'Mennonite communities and agricultural heritage',
  'Scandinavian settlements and cultural centers',
  'French-Canadian fur trade routes and traditions'
]),
('Frontier Stories', '🛤️', 'Coal mining heritage and boom towns', ARRAY[
  'Coal mining heritage and boom towns',
  'Railway development and station museums',
  'Trading posts and whiskey trader tales',
  'Ghost towns and abandoned settlements'
]);

-- Insert sample tour routes
INSERT INTO tour_routes (name, duration, description, image, featured) VALUES
('Northern Rockies Express', 3, 'NW Alberta - Northern Rockies adventure through pristine wilderness and mountain heritage', '/3day_nrockiesexpress.png', true),
('Lakeland Express', 3, 'NE Alberta - Northeast Alberta lakeland, Indigenous heritage, and natural beauty', '/threedaycard.png', false),
('Chinook Country Express', 3, 'South Alberta - Southern Alberta prairies, ranching culture, and western heritage', '/threedaycard.png', false),
('Peaks & Promises', 5, 'NW Alberta - Northwest Alberta mountain heritage and pioneer settlements', '/fivedaycardpng.png', true),
('Tales of the Trapline', 5, 'NE Alberta - Northeast Alberta fur trade routes and Indigenous storytelling traditions', '/fivedaycardpng.png', true),
('Whiskey Traders & Wind Walkers', 5, 'South Alberta - South Alberta trading posts and frontier justice stories', '/fivedaycardpng.png', false),
('Northern Rockies Calling', 7, 'NW Alberta - Northwest Alberta comprehensive mountain and cultural heritage journey', '/7day_nrockiescalling.png', true),
('Alberta Heritage Circle', 7, 'Central Alberta - Comprehensive cultural journey through all four heritage themes', '/sevenday_card.png', false),
('Prairie to Peaks Heritage', 7, 'South Alberta - Complete Alberta experience from grasslands to mountain peaks', '/sevenday_card.png', false),
('Trail of the Midnight Sun', 10, 'NW Alberta - Northern Alberta complete cultural immersion and natural wonders', '/10day_trailmidnightsun.png', true),
('Badlands to Boreal Adventure', 10, 'Multi-Region - Calgary to Fort McMurray to Medicine Hat to Calgary loop - Ultimate Alberta diversity', '/tenday_card.png', false),
('The Alberta Heartland Adventure', 10, 'South Central Alberta - Central & South Alberta Route including Waterton - Complete southern heritage experience', '/tenday_card.png', false);

-- Insert sample partners
INSERT INTO partners (name, contact_person, email, phone, website, description) VALUES
('Indigenous Tourism Alberta', 'Sarah Blackhorse', 'info@indigenoustourismalberta.ca', '780-555-0123', 'https://indigenoustourismalberta.ca/', 'Leading organization promoting authentic Indigenous tourism experiences across Alberta'),
('CMTA Travel Services', 'Renee Charbonneau', 'exec.director@motorcycletourism.ca', '780-933-0182', 'https://cmtatravelservices.com', 'Nonprofit travel agency specializing in heritage and cultural tours'),
('Grande Prairie Regional Tourism', 'Mike Johnson', 'info@gptourism.ca', '780-555-0456', 'https://gptourism.ca/', 'Regional tourism association promoting Peace Country attractions and experiences'),
('Mighty Peace Tourism', 'Lisa Anderson', 'hello@mightypeace.com', '780-555-0789', 'https://mightypeace.com/', 'Tourism organization showcasing the natural beauty and heritage of the Peace River region');