-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis" SCHEMA public;

-- Create custom types/enums
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE enrollment_status_type AS ENUM ('not_enrolled', 'enrolled', 'at_risk', 'dropped_out');
CREATE TYPE poverty_quintile_type AS ENUM ('poorest', 'poor', 'middle', 'rich', 'richest');
CREATE TYPE user_role_type AS ENUM ('field_worker', 'school_admin', 'education_officer', 'coordinator');
CREATE TYPE school_type AS ENUM ('primary', 'lower_secondary', 'upper_secondary', 'mixed');
CREATE TYPE enrollment_status_detail AS ENUM ('active', 'completed', 'withdrawn');
CREATE TYPE assessment_type AS ENUM ('literacy', 'numeracy', 'baseline', 'quarterly');

-- Schools table
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    location JSONB NOT NULL, -- {region, district, community, coordinates: {lat, lng}}
    school_type school_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Field workers / Users table
CREATE TABLE field_workers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    role user_role_type DEFAULT 'field_worker',
    assigned_region TEXT,
    assigned_district TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Children table
CREATE TABLE children (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE,
    gender gender_type NOT NULL,
    location JSONB NOT NULL, -- {region, district, community, coordinates: {lat, lng}}
    disability_status BOOLEAN DEFAULT false,
    disability_details TEXT,
    household_poverty_indicator poverty_quintile_type,
    barriers_to_education TEXT[] DEFAULT '{}',
    enrollment_status enrollment_status_type DEFAULT 'not_enrolled',
    enrolled_school_id UUID REFERENCES schools(id),
    enrollment_date DATE,
    photo_url TEXT,
    created_by UUID REFERENCES field_workers(id) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments table (enrollment history)
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID REFERENCES children(id) ON DELETE CASCADE NOT NULL,
    school_id UUID REFERENCES schools(id) NOT NULL,
    enrollment_date DATE NOT NULL,
    status enrollment_status_detail DEFAULT 'active',
    withdrawal_date DATE,
    withdrawal_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendance table
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID REFERENCES children(id) ON DELETE CASCADE NOT NULL,
    school_id UUID REFERENCES schools(id) NOT NULL,
    date DATE NOT NULL,
    present BOOLEAN NOT NULL,
    reason_for_absence TEXT,
    recorded_by UUID REFERENCES field_workers(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(child_id, school_id, date)
);

-- Assessments table
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID REFERENCES children(id) ON DELETE CASCADE NOT NULL,
    assessment_type assessment_type NOT NULL,
    assessment_date DATE NOT NULL,
    literacy_score DECIMAL(5,2),
    numeracy_score DECIMAL(5,2),
    details JSONB, -- Additional assessment data
    assessed_by UUID REFERENCES field_workers(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_children_enrollment_status ON children(enrollment_status);
CREATE INDEX idx_children_location ON children USING GIN(location);
CREATE INDEX idx_children_created_by ON children(created_by);
CREATE INDEX idx_children_enrolled_school ON children(enrolled_school_id);
CREATE INDEX idx_attendance_child_date ON attendance(child_id, date);
CREATE INDEX idx_attendance_school_date ON attendance(school_id, date);
CREATE INDEX idx_enrollments_child ON enrollments(child_id);
CREATE INDEX idx_enrollments_school ON enrollments(school_id);
CREATE INDEX idx_assessments_child ON assessments(child_id);
CREATE INDEX idx_schools_location ON schools USING GIN(location);
CREATE INDEX idx_field_workers_user_id ON field_workers(user_id);
CREATE INDEX idx_field_workers_role ON field_workers(role);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_field_workers_updated_at BEFORE UPDATE ON field_workers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

