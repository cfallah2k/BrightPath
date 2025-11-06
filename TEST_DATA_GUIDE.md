# Test Data Guide for BrightPath Frontend

## Overview

The frontend now uses a comprehensive test data system that simulates a real backend. This allows you to build, test, and deploy the frontend without needing a connected Supabase backend.

## Test Data Structure

### Location
- **Test Data**: `frontend/src/data/testData.ts`
- **Helpers**: `frontend/src/utils/testDataHelpers.ts`
- **Service**: `frontend/src/services/testDataService.ts`

### Data Included

1. **8 Test Children** with realistic profiles:
   - Various enrollment statuses (enrolled, at_risk, not_enrolled, dropped_out)
   - Different regions (Greater Accra, Ashanti, Northern, Central, Western)
   - Mix of genders, ages, disabilities
   - Poverty indicators and barriers to education

2. **5 Test Schools** across different regions:
   - Primary, Lower Secondary, Upper Secondary, Mixed types
   - Realistic locations with coordinates

3. **7 Enrollment Records** tracking enrollment history

4. **30 Days of Attendance Data** for enrolled children:
   - Realistic attendance patterns
   - Absence reasons
   - Calculated attendance rates

5. **5 Assessment Records**:
   - Baseline and quarterly assessments
   - Literacy and numeracy scores
   - Progress tracking

6. **3 Field Workers** with different roles:
   - Field workers
   - Education officers
   - School administrators

## Using Test Data

### In Components

All pages now automatically use test data through the `testDataService`:

```typescript
import { testDataService } from '../services/testDataService'

// Get children
const children = await testDataService.getChildren({ 
  search: 'Ama',
  status: 'enrolled' 
})

// Get child details
const childData = await testDataService.getChildById('child-001')

// Get statistics
const stats = await testDataService.getStatistics()
```

### Helper Functions

Use helper functions for formatting and calculations:

```typescript
import { 
  formatChildName, 
  calculateAge, 
  getEnrollmentStatusColor,
  formatDate 
} from '../utils/testDataHelpers'

// Format child name
const name = formatChildName(child) // "Ama Mensah"

// Calculate age
const age = calculateAge(child.date_of_birth) // 8

// Get status color
const color = getEnrollmentStatusColor('enrolled') // 'green'

// Format date
const date = formatDate('2023-09-01') // "September 1, 2023"
```

## Test Data Features

### Realistic Data
- All data matches the database schema
- Relationships between entities are maintained
- Geographic data includes real Ghana regions and districts
- Dates are realistic and sequential

### Dynamic Calculations
- Attendance rates calculated from attendance records
- Statistics computed from actual data
- Student counts per school calculated dynamically
- Disaggregated data computed on-the-fly

### Simulated API Delays
- All service calls include realistic delays (200-500ms)
- Simulates network latency
- Loading states work properly

## Testing the Application

### 1. Start Development Server

```bash
cd frontend
npm install
npm run dev
```

### 2. Test Login

Use any email/password to login (mock authentication):
- Email: `demo@brightpath.com`
- Password: `demo123`

Or any credentials - the mock auth accepts anything.

### 3. Navigate Through Pages

- **Dashboard**: See statistics from test data
- **Children List**: View all 8 test children
- **Child Details**: Click any child to see full profile
- **Attendance**: Record and view attendance
- **Assessments**: View and create assessments
- **Reports**: See analytics with real calculations
- **Schools**: View all 5 test schools

### 4. Test Features

- **Search**: Search children by name
- **Filters**: Filter by enrollment status, region
- **Forms**: Register new child, record attendance
- **Navigation**: Test all routes and navigation

## Data Relationships

```
Field Workers (3)
  └── Create Children (8)
      ├── Enrollments (7)
      ├── Attendance (30 days × enrolled children)
      └── Assessments (5)
      
Schools (5)
  └── Enrollments (7)
      └── Attendance records
```

## Adding More Test Data

To add more test data, edit `frontend/src/data/testData.ts`:

```typescript
// Add a new child
export const testChildren: Child[] = [
  // ... existing children
  {
    id: 'child-009',
    first_name: 'New',
    last_name: 'Child',
    // ... other fields
  }
]
```

The service will automatically use the new data.

## Statistics Available

The test data provides:
- **Total Children**: 8
- **Enrolled**: 5
- **Not Enrolled**: 1
- **At Risk**: 1
- **Dropped Out**: 1
- **Enrollment Rate**: ~62.5%
- **Retention Rate**: ~83.3%

## Building for Production

The test data system works in production builds:

```bash
npm run build
```

All test data is bundled with the application. When you're ready to connect to Supabase, simply replace the `testDataService` calls with actual Supabase queries.

## Migration to Real Backend

When connecting to Supabase:

1. **Replace Service Calls**: Update `testDataService` to use Supabase client
2. **Keep Helpers**: Helper functions can remain the same
3. **Update Types**: Ensure database types match Supabase schema
4. **Test Authentication**: Replace mock auth with Supabase Auth

The structure is designed to make this transition seamless!

## Notes

- Test data persists in memory (not localStorage)
- Changes made in forms are simulated (not actually saved)
- All data resets on page refresh
- Perfect for demos and testing before backend connection

---

**The frontend is now fully functional with test data and ready for deployment!** 🚀

