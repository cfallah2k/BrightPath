-- Seed data for development/testing
-- This file contains sample data for testing the application

-- Insert sample schools
INSERT INTO schools (id, name, location, school_type) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'Accra Primary School',
    '{"region": "Greater Accra", "district": "Accra Metropolitan", "community": "Accra Central", "coordinates": {"lat": 5.6037, "lng": -0.1870}}',
    'primary'
),
(
    '00000000-0000-0000-0000-000000000002',
    'Kumasi Lower Secondary',
    '{"region": "Ashanti", "district": "Kumasi Metropolitan", "community": "Kumasi", "coordinates": {"lat": 6.6885, "lng": -1.6244}}',
    'lower_secondary'
),
(
    '00000000-0000-0000-0000-000000000003',
    'Tamale Community School',
    '{"region": "Northern", "district": "Tamale Metropolitan", "community": "Tamale", "coordinates": {"lat": 9.4000, "lng": -0.8399}}',
    'mixed'
);

-- Note: Field workers and children will be created through the application
-- as they require authentication and proper user setup

