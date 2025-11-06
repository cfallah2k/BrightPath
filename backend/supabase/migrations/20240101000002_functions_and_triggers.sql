-- Function to automatically update child enrollment status when enrollment is created
CREATE OR REPLACE FUNCTION update_child_enrollment_status()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE children
    SET enrollment_status = 'enrolled',
        enrolled_school_id = NEW.school_id,
        enrollment_date = NEW.enrollment_date,
        updated_at = NOW()
    WHERE id = NEW.child_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_update_child_enrollment_on_insert
    AFTER INSERT ON enrollments
    FOR EACH ROW
    WHEN (NEW.status = 'active')
    EXECUTE FUNCTION update_child_enrollment_status();

-- Function to mark child as at-risk based on attendance
CREATE OR REPLACE FUNCTION check_attendance_risk()
RETURNS TRIGGER AS $$
DECLARE
    attendance_rate DECIMAL;
    days_checked INTEGER := 30;
BEGIN
    -- Calculate attendance rate for last 30 days
    SELECT 
        COUNT(*) FILTER (WHERE present = true)::DECIMAL / NULLIF(COUNT(*), 0) * 100
    INTO attendance_rate
    FROM attendance
    WHERE child_id = NEW.child_id
    AND date >= CURRENT_DATE - INTERVAL '30 days';
    
    -- Mark as at-risk if attendance rate is below 80%
    IF attendance_rate < 80 AND attendance_rate IS NOT NULL THEN
        UPDATE children
        SET enrollment_status = 'at_risk',
            updated_at = NOW()
        WHERE id = NEW.child_id
        AND enrollment_status = 'enrolled';
    -- Mark as enrolled if attendance improves
    ELSIF attendance_rate >= 80 AND attendance_rate IS NOT NULL THEN
        UPDATE children
        SET enrollment_status = 'enrolled',
            updated_at = NOW()
        WHERE id = NEW.child_id
        AND enrollment_status = 'at_risk';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_check_attendance_risk
    AFTER INSERT OR UPDATE ON attendance
    FOR EACH ROW
    EXECUTE FUNCTION check_attendance_risk();

-- Function to get child statistics (for dashboards)
CREATE OR REPLACE FUNCTION get_child_statistics(
    region_filter TEXT DEFAULT NULL,
    district_filter TEXT DEFAULT NULL,
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL
)
RETURNS TABLE (
    total_children BIGINT,
    enrolled_count BIGINT,
    not_enrolled_count BIGINT,
    at_risk_count BIGINT,
    dropped_out_count BIGINT,
    male_count BIGINT,
    female_count BIGINT,
    with_disability_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*)::BIGINT as total_children,
        COUNT(*) FILTER (WHERE enrollment_status = 'enrolled')::BIGINT as enrolled_count,
        COUNT(*) FILTER (WHERE enrollment_status = 'not_enrolled')::BIGINT as not_enrolled_count,
        COUNT(*) FILTER (WHERE enrollment_status = 'at_risk')::BIGINT as at_risk_count,
        COUNT(*) FILTER (WHERE enrollment_status = 'dropped_out')::BIGINT as dropped_out_count,
        COUNT(*) FILTER (WHERE gender = 'male')::BIGINT as male_count,
        COUNT(*) FILTER (WHERE gender = 'female')::BIGINT as female_count,
        COUNT(*) FILTER (WHERE disability_status = true)::BIGINT as with_disability_count
    FROM children
    WHERE 
        (region_filter IS NULL OR location->>'region' = region_filter)
        AND (district_filter IS NULL OR location->>'district' = district_filter)
        AND (start_date IS NULL OR created_at >= start_date)
        AND (end_date IS NULL OR created_at <= end_date);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

