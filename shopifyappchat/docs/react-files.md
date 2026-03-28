# React Files Documentation

This document describes the purpose and functionality of each React file in the project.

---

## Main App (shopifyappchat/web)

### Entry Point

#### `web/main.jsx`
Application entry point. Mounts the React app to the DOM using `ReactDOM.createRoot` with StrictMode enabled.

#### `web/components/App.jsx`
Root application component that sets up:
- React Router with all route definitions
- Gadget API Provider wrapping the app
- Toast notifications (Sonner)
- Route structure with three layout types: Public, Auth, and App

---

### Layouts

#### `web/components/layouts/public.jsx`
Layout for public-facing pages (landing page, marketing). Includes:
- Top navigation bar with logo
- Login/Sign up buttons (or "Go to app" if logged in)
- Footer with copyright
- Uses `<Outlet />` for child route content

#### `web/components/layouts/auth.jsx`
Layout for authentication pages (sign-in, sign-up, forgot password). Features:
- Centered content area for auth forms
- `SignedOutOrRedirect` wrapper - redirects logged-in users away
- Uses `<Outlet />` for auth form content

#### `web/components/layouts/app.jsx`
Layout for authenticated app pages. Includes:
- Desktop sidebar navigation (left side, 64px wide)
- Mobile hamburger menu
- Header with user avatar dropdown
- `SignedInOrRedirect` wrapper - redirects logged-out users to sign-in
- Uses `<Outlet />` for main content

---

### Routes

#### `web/routes/index.jsx`
Public landing page. Shows a hero section with "Hey, Developer!" message and a link to edit the page in Gadget.

#### `web/routes/sign-in.jsx`
Sign-in page route. Wraps `SignInComponent` with navigation on successful sign-in.

#### `web/routes/sign-up.jsx`
Sign-up page route. Similar to sign-in, wraps the `SignUpComponent`.

#### `web/routes/signed-in.jsx`
Dashboard landing page after login. Shows:
- Welcome message
- Link to Support Conversations
- Current user information (ID, name, email, created date)

#### `web/routes/profile.jsx`
User profile page. Features:
- User avatar and info display
- Edit profile modal (first name, last name)
- Change password modal (for non-Google users)

#### `web/routes/inbox.jsx`
Main inbox/support dashboard. Implements a configurable multi-view shell with:
- Left sidebar navigation (Inbox, Merchants)
- Three-panel layout: list panel, main content, detail panel
- Or single-column layout depending on view configuration
- Calls view hooks (`InboxView`, `MerchantsView`) to get panel content

#### `web/routes/forgot-password.jsx`
Forgot password page for password reset flow.

#### `web/routes/reset-password.jsx`
Password reset page (after clicking email link).

#### `web/routes/verify-email.jsx`
Email verification page.

#### `web/routes/conversations.jsx`
Conversations list page (older view, inbox.jsx is the newer version).

#### `web/routes/conversation.jsx`
Single conversation detail page (older view).

#### `web/routes/not-found.jsx`
404 page for unknown routes.

---

### Views

#### `web/components/views/InboxView.jsx`
Main inbox view component (used as a hook). Returns panel content for the three-panel layout:

**Features:**
- Fetches conversations filtered by user's organization
- Live-updates with real-time queries
- Conversation list with status badges, country flags, timestamps
- Message thread display with read receipts
- Message composition with image attachment support
- Detail panel showing customer info, device info, notes

**Key Functions:**
- `MessageStatus` - Shows delivery/read status (Sent, Delivered to email, Read in email, Read)
- `formatTime` - Relative time formatting (now, 5m, 2h, Yesterday)
- `formatMessageTime` - HH:MM time formatting

#### `web/components/views/MerchantsView.jsx`
Merchants management view. Returns single-column layout with:
- Table of shops/merchants with name, domain, shop ID, status
- "Add Merchant" button
- Empty state when no merchants found

---

### Shared Components

#### `web/components/shared/ViewComponents.jsx`
Reusable UI components for views:

- **`ConversationAvatar`** - Gradient avatar with initials, supports sizes (xs, sm, md, lg)
- **`CollapsibleSection`** - Expandable/collapsible section with title and chevron
- **`InfoRow`** - Key-value row with icon (used in detail panels)
- **`StatusBadge`** - Colored badge for conversation status (pending/open/resolved)
- **`CountryFlag`** - Emoji flag from 2-letter country code
- **`NavItem`** - Sidebar navigation button with icon, label, and badge

#### `web/components/shared/UserIcon.jsx`
User avatar component. Shows:
- Profile picture (from Gadget or Google)
- Fallback to initials if no image

#### `web/components/shared/NavDrawer.jsx`
Mobile slide-out navigation drawer using Sheet component.

---

### Auth Components

#### `web/components/auth/sign-in.jsx`
Sign-in form component. Features:
- Google OAuth button
- Email/password fields
- Link to sign-up and forgot password
- Two-column card layout (branding left, form right)

#### `web/components/auth/sign-up.jsx`
Sign-up form component. Similar layout to sign-in with:
- Google OAuth button
- Email/password fields
- Link to sign-in
- Success message on submission

---

### Navigation Components

#### `web/components/app/nav.jsx`
App navigation system for logged-in users:

- **`DesktopNav`** - Fixed left sidebar (hidden on mobile)
- **`MobileNav`** - Hamburger menu (visible on mobile)
- **`Navigation`** - Vertical nav links with icons
- **`SecondaryNavigation`** - User dropdown menu (Profile, Sign out)

Navigation items defined in `navigationItems` array (Inbox, Merchants).

#### `web/components/public/nav.jsx`
Public navigation bar:
- **`Navigation`** - Root component with logo
- **`MobileNav`** - Hamburger menu for small screens
- **`DesktopNav`** - Horizontal menu with dropdown support

Navigation items defined in `navigationItems` array (currently empty).

---

### UI Components (`web/components/ui/`)

Standard shadcn/ui components (not documented in detail):
- `accordion.jsx` - Collapsible accordion
- `alert.jsx` - Alert messages
- `alert-dialog.jsx` - Confirmation dialogs
- `avatar.jsx` - User avatar with fallback
- `badge.jsx` - Small status badges
- `button.jsx` - Button variants
- `calendar.jsx` - Date picker calendar
- `card.jsx` - Card container
- `checkbox.jsx` - Checkbox input
- `command.jsx` - Command palette
- `dialog.jsx` - Modal dialog
- `dropdown-menu.jsx` - Dropdown menus
- `input.jsx` - Text input
- `label.jsx` - Form labels
- `navigation-menu.jsx` - Navigation menus
- `popover.jsx` - Popover tooltips
- `progress.jsx` - Progress bar
- `radio-group.jsx` - Radio button group
- `scroll-area.jsx` - Scrollable container
- `select.jsx` - Select dropdown
- `separator.jsx` - Visual separator
- `sheet.jsx` - Slide-out panel
- `skeleton.jsx` - Loading skeleton
- `sonner.jsx` - Toast notifications
- `table.jsx` - Data table
- `tabs.jsx` - Tab navigation
- `textarea.jsx` - Multi-line text input
- `tooltip.jsx` - Hover tooltips

---

### Utilities

#### `web/api.js`
Exports the Gadget API client instance for use throughout the app.

#### `web/lib/utils.js`
Utility functions (typically `cn()` for className merging with tailwind-merge).

#### `web/lib/analytics.js`
Analytics tracking utilities.

#### `web/components/auto.js`
Auto-generated component exports from Gadget.

---

## Chat Widget (shopifyappchat-widget/src)

### Entry Point

#### `src/main.jsx`
Widget entry point. Mounts the Widget component to the DOM.

#### `src/Widget.jsx`
Root widget component. Manages:
- Open/closed state via `useChat` hook
- Renders `ChatButton` (floating action button)
- Renders `ChatWindow` when open

---

### Components

#### `src/components/ChatButton.jsx`
Floating action button to open/close chat. Shows:
- Chat bubble icon when closed
- X icon when open

#### `src/components/ChatWindow.jsx`
Main chat window container. Includes:

- **Header** - Brand icon, "Support" title, minimize button, status indicator
- **Body** - Conditional content:
  - `WelcomeSection` + `EmailForm` if no email captured
  - Loading spinner while connecting
  - Error message on failure
  - `MessageList` once connected
- **Footer** - `MessageInput` (only shown after email captured)

**Sub-components:**
- `EmailForm` - Email capture form with "Continue" button
- `WelcomeSection` - Welcome message card

#### `src/components/MessageList.jsx`
Displays message thread. Features:
- Auto-scroll to bottom on new messages
- Message bubbles styled by sender type (customer vs support)
- Image attachments (clickable to open full size)
- Timestamps with read status for customer messages
- `isMessageRead()` function checks if operator has read the message

#### `src/components/MessageInput.jsx`
Message composition input. Features:
- Text input with Enter-to-send
- Image attachment button with preview
- File validation (images only, max 10MB)
- Send button (disabled when empty)

---

### Hooks

#### `src/hooks/useChat.js`
Core chat state management hook. Handles:

**State:**
- `isOpen` - Chat window visibility
- `messages` - Message array
- `conversationId` - Current conversation ID
- `email` - Customer email
- `loading`, `error`, `sending` - UI states
- `operatorLastReadAt` - For read receipts

**Functions:**
- `initConversation(email)` - Creates conversation with email, fetches country via IP
- `fetchMessages()` - Polls for new messages
- `sendMessage(content, file)` - Sends message with optional attachment
- `markAsRead()` - Marks conversation as read by customer
- `toggleChat()` - Opens/closes chat window

**Side Effects:**
- Restores session from localStorage on mount
- Polls messages every 5 seconds when open
- Sends heartbeat every 30 seconds when active (for online/offline detection)
- Tracks user activity (mouse, keyboard, clicks, scroll)
- Marks as read when tab becomes visible

**Session Persistence:**
- Saves `conversationId` and `email` to localStorage per shop
- Restores on page reload

---

### Utilities

#### `src/analytics.js`
Widget analytics tracking utilities.
