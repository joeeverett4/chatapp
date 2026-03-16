# Feature Complexity Analysis: Shopify App Inbox Dashboard

This document analyzes the UI and functional features visible in the provided dashboard image, assessing their implementation difficulty within a Gadget/React framework.

## 1. Inbox & Navigation (Left Sidebar)

| Feature | Difficulty | Rationale |
| :--- | :--- | :--- |
| **Search Functionality** | **Medium** | Requires full-text search across conversations, likely using Gadget's built-in search filters. |
| **Default Inboxes (Main, Assigned)** | **Low** | Basic filtering of `conversation` records by status or assignment. |
| **Custom/Sub-Inboxes** | **Medium** | Requires a dedicated `Inbox` or `View` model to store user-defined filters. |
| **AI Agent Navigation Section** | **Medium** | Integration points for AI configuration; complexity depends on the AI depth. |
| **User Profile/Settings** | **Low** | Static placement of current user data and basic routing. |

## 2. Conversation List (Middle-Left)

| Feature | Difficulty | Rationale |
| :--- | :--- | :--- |
| **Conversation Cards** | **Low** | Fetching and displaying basic fields (name, snippet, time). |
| **Real-time Status Updates** | **Low** | Gadget's `live` queries handle real-time updates out of the box. |
| **Advanced Filtering UI** | **Medium** | Multi-select filters for channel, language, and custom properties. |
| **Bulk Actions** | **Medium** | Requires state management for selection and batch API calls. |

## 3. Chat Interface (Central Area)

| Feature | Difficulty | Rationale |
| :--- | :--- | :--- |
| **Message Thread Rendering** | **Low/Medium** | Grouping messages by date and handling dual-sender alignment. |
| **Rich Message Composer** | **High** | Implementing "Note", "Reminder", "Shortcuts", and "Knowledge Base" inside the text area requires complex state and UI switching. |
| **Read/Delivery Receipts** | **Medium** | Tracking when a message is opened via webhooks or tracking pixels. |
| **Status Management (Unresolved/Open)** | **Low** | Simple Gadget action to update `status` field. |
| **External Channel Indicators** | **Medium** | Handling different message sources (Email, Chat, Social) and their unique metadata. |

## 4. Customer Intelligence (Right Sidebar)

| Feature | Difficulty | Rationale |
| :--- | :--- | :--- |
| **Social Media Profiles** | **Low/Medium** | Fetching and linking social handles stored in the `Customer` model. |
| **Visitor Metadata (Browser/IP)** | **Medium** | Requires capturing data on the storefront widget and syncing it to Gadget. |
| **Local Time/Language Detection** | **Medium** | Calculating time based on timezone strings and language from browser headers. |
| **Shared Image Files Gallery** | **Medium** | Querying all `message` attachments linked to the customer. |
| **Multi-Conversation History** | **Low** | Listing all `conversation` records associated with the same `customerId`. |

## 5. Advanced / Backend Features

| Feature | Difficulty | Rationale |
| :--- | :--- | :--- |
| **Knowledge Base Integration** | **High** | Requires a RAG (Retrieval-Augmented Generation) system or a robust search over internal documents. |
| **Reminder/Follow-up System** | **Medium** | Needs a scheduler (Jobs/Background tasks) to trigger alerts at specific times. |
| **Multilingual Support (AI)** | **High** | Real-time translation of messages or language-specific automated replies. |

---

### Implementation Summary
The current `conversation.jsx` covers about **10%** of what is seen in the image (basic message list and simple reply). Moving toward this design would require:
1.  **Refined Data Models**: Expanding `conversation` and `message` to include metadata (browser, source, read status).
2.  **Sidebar Components**: Creating reusable components for the complex metadata panels.
3.  **Advanced Actions**: Creating custom Gadget actions for things like reminders and knowledge base searches.
