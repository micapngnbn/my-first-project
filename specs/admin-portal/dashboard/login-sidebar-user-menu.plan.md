# Admin Portal - Login, Sidebar, and User Menu

## Application Overview

VMG Admin Portal (QA, v.1.48.0) is a browser web application. Users sign in on the Admin Portal QA login page and land on the Dashboard. The left sidebar exposes expandable menu dropdowns (for example Staff). The header User Menu provides Dark Mode toggle and Logout (with confirmation).

This plan covers only login, dashboard landing, sidebar menu dropdown collapse/expand, and User Menu Dark Mode and Logout.

UI map:
- Login (`admin-qa.vmg-portal.com/login`): Email *, Password *, Forgot Password?, Sign in
- Dashboard: welcome content, sidebar navigation menu, header User Menu control
- Sidebar menu dropdowns (e.g. Staff): expandable/collapsible sections with submenu links
- User Menu popover: Dark Mode toggle, Logout
- Logout confirmation: "Are you sure you want to logout?" with Cancel and OK

## Test Scenarios

### 1. Happy Path

**Seed:** `tests/seed.spec.ts`

#### 1.1. User successfully signs in and lands on the Dashboard

**File:** `tests/admin-portal/dashboard/login-success.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- Valid Admin Portal QA credentials are available
- The user is not signed in

**Test Data:**
| Field | Value |
| --- | --- |
| Email | Valid Admin Portal QA user email |
| Password | Valid Admin Portal QA user password |

**Steps:**
  1. Navigate to the Admin Portal QA login page
    - expect: The Admin Portal login page is displayed
    - expect: The Email and Password fields are displayed
    - expect: The Sign in button is displayed
  2. Enter a valid Email
    - expect: The Email field displays the entered value
  3. Enter a valid Password
    - expect: The Password field displays the entered value
  4. Click Sign in
    - expect: The user is signed in successfully
    - expect: The Dashboard is displayed
    - expect: The welcome content for the Admin Portal is displayed

---

#### 1.2. Sidebar menu dropdown expands

**File:** `tests/admin-portal/dashboard/sidebar-dropdown-expand.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- Valid Admin Portal QA credentials are available

**Test Data:**
| Field | Value |
| --- | --- |
| Sidebar menu dropdown | Staff |

**Steps:**
  1. Sign in to the Admin Portal QA with valid credentials
    - expect: The Dashboard is displayed
    - expect: The sidebar menu is displayed
  2. Click the Staff sidebar menu dropdown
    - expect: The Staff sidebar menu dropdown is expanded
    - expect: Staff submenu items are displayed

---

#### 1.3. Sidebar menu dropdown collapses

**File:** `tests/admin-portal/dashboard/sidebar-dropdown-collapse.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- Valid Admin Portal QA credentials are available

**Test Data:**
| Field | Value |
| --- | --- |
| Sidebar menu dropdown | Staff |

**Steps:**
  1. Sign in to the Admin Portal QA with valid credentials
    - expect: The Dashboard is displayed
  2. Expand the Staff sidebar menu dropdown
    - expect: The Staff sidebar menu dropdown is expanded
  3. Click the Staff sidebar menu dropdown again
    - expect: The Staff sidebar menu dropdown is collapsed
    - expect: Staff submenu items are no longer displayed

---

#### 1.4. User Menu opens with Dark Mode and Logout

**File:** `tests/admin-portal/dashboard/user-menu-opens.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- Valid Admin Portal QA credentials are available

**Steps:**
  1. Sign in to the Admin Portal QA with valid credentials
    - expect: The Dashboard is displayed
  2. Open the User Menu from the header
    - expect: The User Menu is displayed
    - expect: Dark Mode is displayed
    - expect: Logout is displayed

---

#### 1.5. Dark Mode toggle enables dark mode

**File:** `tests/admin-portal/dashboard/dark-mode-enable.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- Valid Admin Portal QA credentials are available
- Dark Mode is not enabled

**Steps:**
  1. Sign in to the Admin Portal QA with valid credentials
    - expect: The Dashboard is displayed
  2. Open the User Menu from the header
    - expect: The User Menu is displayed
    - expect: Dark Mode is displayed
  3. Enable Dark Mode
    - expect: Dark Mode is enabled
    - expect: The application is displayed in dark mode

---

#### 1.6. User confirms Logout and returns to login

**File:** `tests/admin-portal/dashboard/logout-confirm.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- Valid Admin Portal QA credentials are available

**Steps:**
  1. Sign in to the Admin Portal QA with valid credentials
    - expect: The Dashboard is displayed
  2. Open the User Menu from the header
    - expect: Logout is displayed
  3. Click Logout
    - expect: The Logout confirmation dialog is displayed
    - expect: The dialog asks if the user is sure they want to logout
    - expect: Cancel and OK actions are displayed
  4. Click OK on the Logout confirmation dialog
    - expect: The user is logged out
    - expect: The Admin Portal login page is displayed

---

### 2. Validation

#### 2.1. Sign in requires Email and Password

**File:** `tests/admin-portal/dashboard/login-required-fields.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- The user is not signed in

**Steps:**
  1. Navigate to the Admin Portal QA login page
    - expect: The Admin Portal login page is displayed
  2. Leave Email and Password empty
    - expect: The Email field is empty
    - expect: The Password field is empty
  3. Click Sign in
    - expect: The user remains on the login page
    - expect: The Dashboard is not displayed

---

### 3. Negative Scenarios

#### 3.1. Invalid credentials do not grant Dashboard access

**File:** `tests/admin-portal/dashboard/login-invalid-credentials.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- The user is not signed in

**Test Data:**
| Field | Value |
| --- | --- |
| Email | Invalid Admin Portal email |
| Password | Invalid password |

**Steps:**
  1. Navigate to the Admin Portal QA login page
    - expect: The Admin Portal login page is displayed
  2. Enter an invalid Email
    - expect: The Email field displays the entered value
  3. Enter an invalid Password
    - expect: The Password field displays the entered value
  4. Click Sign in
    - expect: The user is not signed in
    - expect: The Dashboard is not displayed
    - expect: The user remains on the login page or is shown an authentication failure

---

#### 3.2. Cancel Logout keeps the user on the Dashboard

**File:** `tests/admin-portal/dashboard/logout-cancel.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- Valid Admin Portal QA credentials are available

**Steps:**
  1. Sign in to the Admin Portal QA with valid credentials
    - expect: The Dashboard is displayed
  2. Open the User Menu and click Logout
    - expect: The Logout confirmation dialog is displayed
  3. Click Cancel on the Logout confirmation dialog
    - expect: The Logout confirmation dialog is closed
    - expect: The user remains signed in
    - expect: The Dashboard remains displayed

---

### 4. Edge Cases

#### 4.1. Sidebar menu dropdown can be expanded and collapsed repeatedly

**File:** `tests/admin-portal/dashboard/sidebar-dropdown-repeat.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- Valid Admin Portal QA credentials are available

**Test Data:**
| Field | Value |
| --- | --- |
| Sidebar menu dropdown | Staff |

**Steps:**
  1. Sign in to the Admin Portal QA with valid credentials
    - expect: The Dashboard is displayed
  2. Expand the Staff sidebar menu dropdown
    - expect: The Staff sidebar menu dropdown is expanded
  3. Collapse the Staff sidebar menu dropdown
    - expect: The Staff sidebar menu dropdown is collapsed
  4. Expand the Staff sidebar menu dropdown again
    - expect: The Staff sidebar menu dropdown is expanded
    - expect: Staff submenu items are displayed

---

#### 4.2. Dark Mode can be turned off after being enabled

**File:** `tests/admin-portal/dashboard/dark-mode-disable.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- Valid Admin Portal QA credentials are available

**Steps:**
  1. Sign in to the Admin Portal QA with valid credentials
    - expect: The Dashboard is displayed
  2. Open the User Menu and enable Dark Mode
    - expect: Dark Mode is enabled
  3. Open the User Menu and disable Dark Mode
    - expect: Dark Mode is disabled
    - expect: The application is no longer displayed in dark mode

---

#### 4.3. User Menu can be dismissed without logging out

**File:** `tests/admin-portal/dashboard/user-menu-dismiss.spec.ts`

**Preconditions:**
- Admin Portal QA is reachable
- Valid Admin Portal QA credentials are available

**Steps:**
  1. Sign in to the Admin Portal QA with valid credentials
    - expect: The Dashboard is displayed
  2. Open the User Menu from the header
    - expect: The User Menu is displayed
  3. Dismiss the User Menu without selecting Logout
    - expect: The User Menu is closed
    - expect: The user remains signed in
    - expect: The Dashboard remains displayed
