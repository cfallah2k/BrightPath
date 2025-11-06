# BrightPath - Test Credentials Guide

## 🔐 Quick Login (Easiest Method)

On the login page, you can use the **Quick Login buttons** which automatically fill in credentials:

### Quick Login Buttons
Click any of these buttons on the login page to auto-fill credentials:

1. **Field Worker**
   - Email: `demo-field_worker@brightpath.com`
   - Password: `demo123`

2. **School Administrator**
   - Email: `demo-school_admin@brightpath.com`
   - Password: `demo123`

3. **Education Officer**
   - Email: `demo-education_officer@brightpath.com`
   - Password: `demo123`

4. **Coordinator**
   - Email: `demo-coordinator@brightpath.com`
   - Password: `demo123`

## 📝 Manual Login

Since the app is in **demo mode**, **ANY email and password combination will work** as long as:

- ✅ Email field is not empty
- ✅ Password field is not empty
- ✅ You select a role from the dropdown

### Example Manual Credentials

You can use any of these (or make up your own):

**Option 1:**
- Email: `test@brightpath.com`
- Password: `test123`
- Role: `Field Worker`

**Option 2:**
- Email: `admin@example.com`
- Password: `password`
- Role: `Education Officer`

**Option 3:**
- Email: `user@test.com`
- Password: `123456`
- Role: `School Administrator`

## 🎯 Role-Based Testing

Each role will give you different permissions and views:

### Field Worker
- Can view and register children
- Can record attendance
- Can create assessments
- Assigned to specific region/district

### School Administrator
- Can manage school records
- Can verify enrollments
- Can update attendance
- School-focused view

### Education Officer
- Can view all children in assigned region
- Can access reports and analytics
- Can manage multiple schools
- Regional oversight capabilities

### Coordinator
- Full system access
- Can view all data across regions
- Can access all reports
- System-wide coordination

## 🚀 How to Test

1. **Start the app:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Navigate to login:**
   - Go to http://localhost:5173
   - You'll be redirected to `/login`

3. **Choose a login method:**
   - **Easy**: Click a Quick Login button
   - **Manual**: Enter any email/password and select a role

4. **Click "Sign In"**
   - Login will succeed with any credentials
   - You'll be redirected to the dashboard

## 📱 Testing Different Roles

To test different roles:

1. Logout (click profile menu → logout)
2. Select a different role from the dropdown
3. Click the corresponding Quick Login button
4. Sign in

Or simply enter:
- Email: `demo-{role}@brightpath.com`
- Password: `demo123`
- Select the role from dropdown

## ⚠️ Important Notes

- **All credentials work** - This is demo mode, authentication is mocked
- **Role matters** - The selected role determines what data you see
- **Data is test data** - All children, schools, etc. are from test data
- **No real backend** - Everything works offline with mock data

## 🔄 When Backend is Connected

Once you connect to Supabase:
- These test credentials will be replaced with real authentication
- You'll need to create actual user accounts
- Role will be determined by the database, not the login form

---

**For now, just use any email/password - it all works!** 🎉

