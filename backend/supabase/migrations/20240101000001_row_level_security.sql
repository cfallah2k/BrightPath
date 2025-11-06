-- Enable Row Level Security on all tables
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_workers ENABLE ROW LEVEL SECURITY;

-- Field Workers Policies
-- Field workers can view their own profile
CREATE POLICY "Field workers can view own profile"
    ON field_workers FOR SELECT
    USING (auth.uid() = user_id);

-- Field workers can update their own profile
CREATE POLICY "Field workers can update own profile"
    ON field_workers FOR UPDATE
    USING (auth.uid() = user_id);

-- Education officers and coordinators can view all field workers
CREATE POLICY "Officers can view all field workers"
    ON field_workers FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM field_workers
            WHERE user_id = auth.uid()
            AND role IN ('education_officer', 'coordinator')
        )
    );

-- Children Policies
-- Field workers can view children they created or in their assigned area
CREATE POLICY "Field workers can view assigned children"
    ON children FOR SELECT
    USING (
        created_by IN (
            SELECT id FROM field_workers WHERE user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM field_workers
            WHERE user_id = auth.uid()
            AND (
                role IN ('education_officer', 'coordinator')
                OR (role = 'field_worker' AND (
                    assigned_region = (children.location->>'region')
                    OR assigned_district = (children.location->>'district')
                ))
            )
        )
    );

-- Field workers can insert children
CREATE POLICY "Field workers can insert children"
    ON children FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM field_workers
            WHERE user_id = auth.uid()
            AND role IN ('field_worker', 'school_admin', 'education_officer', 'coordinator')
        )
    );

-- Field workers can update children they created or in their area
CREATE POLICY "Field workers can update assigned children"
    ON children FOR UPDATE
    USING (
        created_by IN (
            SELECT id FROM field_workers WHERE user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM field_workers
            WHERE user_id = auth.uid()
            AND role IN ('education_officer', 'coordinator')
        )
    );

-- Schools Policies
-- Everyone can view schools
CREATE POLICY "Everyone can view schools"
    ON schools FOR SELECT
    USING (true);

-- Only officers and coordinators can insert schools
CREATE POLICY "Officers can insert schools"
    ON schools FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM field_workers
            WHERE user_id = auth.uid()
            AND role IN ('education_officer', 'coordinator', 'school_admin')
        )
    );

-- Enrollments Policies
-- Field workers can view enrollments for children in their area
CREATE POLICY "Field workers can view assigned enrollments"
    ON enrollments FOR SELECT
    USING (
        child_id IN (
            SELECT id FROM children
            WHERE created_by IN (
                SELECT id FROM field_workers WHERE user_id = auth.uid()
            )
            OR EXISTS (
                SELECT 1 FROM field_workers
                WHERE user_id = auth.uid()
                AND role IN ('education_officer', 'coordinator')
            )
        )
    );

-- Field workers can insert enrollments
CREATE POLICY "Field workers can insert enrollments"
    ON enrollments FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM field_workers
            WHERE user_id = auth.uid()
            AND role IN ('field_worker', 'school_admin', 'education_officer', 'coordinator')
        )
    );

-- Attendance Policies
-- Field workers can view attendance for children in their area
CREATE POLICY "Field workers can view assigned attendance"
    ON attendance FOR SELECT
    USING (
        child_id IN (
            SELECT id FROM children
            WHERE created_by IN (
                SELECT id FROM field_workers WHERE user_id = auth.uid()
            )
            OR EXISTS (
                SELECT 1 FROM field_workers
                WHERE user_id = auth.uid()
                AND role IN ('education_officer', 'coordinator', 'school_admin')
            )
        )
    );

-- Field workers can insert attendance
CREATE POLICY "Field workers can insert attendance"
    ON attendance FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM field_workers
            WHERE user_id = auth.uid()
            AND role IN ('field_worker', 'school_admin', 'education_officer', 'coordinator')
        )
    );

-- Assessments Policies
-- Field workers can view assessments for children in their area
CREATE POLICY "Field workers can view assigned assessments"
    ON assessments FOR SELECT
    USING (
        child_id IN (
            SELECT id FROM children
            WHERE created_by IN (
                SELECT id FROM field_workers WHERE user_id = auth.uid()
            )
            OR EXISTS (
                SELECT 1 FROM field_workers
                WHERE user_id = auth.uid()
                AND role IN ('education_officer', 'coordinator')
            )
        )
    );

-- Field workers can insert assessments
CREATE POLICY "Field workers can insert assessments"
    ON assessments FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM field_workers
            WHERE user_id = auth.uid()
            AND role IN ('field_worker', 'school_admin', 'education_officer', 'coordinator')
        )
    );

