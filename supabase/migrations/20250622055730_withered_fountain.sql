/*
  # Seed Data for Everything Coconut

  1. Insert Collections
  2. Insert Products
  3. Insert Site Settings
*/

-- Insert collections
INSERT INTO collections (id, name, description, image) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Bowls & Tableware', 'Handcrafted coconut bowls and sustainable dining essentials', 'https://images.pexels.com/photos/6542652/pexels-photo-6542652.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Home Decor', 'Eco-friendly coconut shell decorative items for your home', 'https://images.pexels.com/photos/6207516/pexels-photo-6207516.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Planters & Garden', 'Natural coconut shell planters and garden accessories', 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Kitchen Accessories', 'Sustainable coconut-based kitchen tools and accessories', 'https://images.pexels.com/photos/4198224/pexels-photo-4198224.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Wellness & Spa', 'Natural coconut products for wellness and self-care', 'https://images.pexels.com/photos/3865711/pexels-photo-3865711.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert products
INSERT INTO products (id, name, price, description, image, collection_id, featured) VALUES
  ('550e8400-e29b-41d4-a716-446655440101', 'Handcrafted Coconut Bowl Set (4 pieces)', 45.99, 'Beautiful set of 4 handcrafted coconut bowls, each uniquely shaped and polished. Perfect for smoothie bowls, salads, or decorative use. Made from upcycled coconut shells.', 'https://images.pexels.com/photos/6542652/pexels-photo-6542652.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440001', true),
  ('550e8400-e29b-41d4-a716-446655440102', 'Coconut Shell Spoon Set', 18.99, 'Set of 6 handcarved coconut shell spoons. Smooth finish, perfect for eating or serving. Completely natural and biodegradable.', 'https://images.pexels.com/photos/7195259/pexels-photo-7195259.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440001', true),
  ('550e8400-e29b-41d4-a716-446655440103', 'Large Coconut Serving Bowl', 24.99, 'Extra large coconut bowl perfect for serving salads, fruits, or as a centerpiece. Naturally water-resistant and durable.', 'https://images.pexels.com/photos/6207516/pexels-photo-6207516.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440001', false),
  ('550e8400-e29b-41d4-a716-446655440104', 'Coconut Shell Cups (Set of 2)', 22.99, 'Pair of handcrafted coconut shell cups with smooth interior finish. Perfect for hot or cold beverages.', 'https://images.pexels.com/photos/8032834/pexels-photo-8032834.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440001', false),
  ('550e8400-e29b-41d4-a716-446655440201', 'Coconut Shell Candle Holders (Set of 3)', 32.99, 'Beautiful set of 3 coconut shell candle holders in different sizes. Creates warm, ambient lighting for any space.', 'https://images.pexels.com/photos/6207516/pexels-photo-6207516.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440002', true),
  ('550e8400-e29b-41d4-a716-446655440202', 'Decorative Coconut Shell Wall Art', 38.99, 'Unique wall art piece made from coconut shells arranged in an artistic pattern. Adds natural texture to any room.', 'https://images.pexels.com/photos/6207516/pexels-photo-6207516.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440002', false),
  ('550e8400-e29b-41d4-a716-446655440203', 'Coconut Shell Bird Feeder', 19.99, 'Charming bird feeder made from a whole coconut shell. Includes hanging rope and drainage holes.', 'https://images.pexels.com/photos/6207516/pexels-photo-6207516.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440002', true),
  ('550e8400-e29b-41d4-a716-446655440301', 'Hanging Coconut Planters (Set of 3)', 42.99, 'Set of 3 hanging coconut shell planters with natural rope hangers. Perfect for succulents and small plants.', 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440003', true),
  ('550e8400-e29b-41d4-a716-446655440302', 'Large Coconut Shell Planter', 28.99, 'Large coconut shell planter with drainage holes. Ideal for herbs, small flowers, or indoor plants.', 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440003', false),
  ('550e8400-e29b-41d4-a716-446655440401', 'Coconut Shell Measuring Cups', 26.99, 'Set of 4 coconut shell measuring cups in standard sizes. Natural, non-toxic alternative to plastic.', 'https://images.pexels.com/photos/4198224/pexels-photo-4198224.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440004', true),
  ('550e8400-e29b-41d4-a716-446655440501', 'Coconut Oil Soap Bars (Set of 3)', 21.99, 'Handmade soap bars with pure coconut oil. Moisturizing and gentle on all skin types. Natural ingredients only.', 'https://images.pexels.com/photos/3865711/pexels-photo-3865711.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440005', true),
  ('550e8400-e29b-41d4-a716-446655440502', 'Pure Coconut Oil (16oz)', 18.99, 'Cold-pressed, virgin coconut oil perfect for cooking, skincare, and hair care. Organic and unrefined.', 'https://images.pexels.com/photos/3865711/pexels-photo-3865711.jpeg?auto=compress&cs=tinysrgb&w=800', '550e8400-e29b-41d4-a716-446655440005', true);

-- Insert site settings
INSERT INTO site_settings (key, value) VALUES
  ('hero_product', '{
    "id": "hero-1",
    "title": "Handcrafted Coconut Bowl Set",
    "description": "Transform your dining experience with our beautifully handcrafted coconut bowls. Each piece is uniquely upcycled from discarded coconut shells, creating sustainable tableware that tells a story of environmental consciousness and artisan craftsmanship.",
    "image": "https://images.pexels.com/photos/6542652/pexels-photo-6542652.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "ctaText": "Shop Coconut Bowls",
    "ctaLink": "/products?collection=Bowls & Tableware",
    "price": 45.99
  }'),
  ('brand_settings', '{
    "brandName": "Everything Coconut",
    "tagline": "Sustainable Handmade Coconut Products"
  }');