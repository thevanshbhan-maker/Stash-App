# Stash — Personal Save-for-Later App

Stash is a lightweight, single-device mobile application built for saving useful notes, web links, and code snippets quickly so they are easy to find again.

## 📌 Project Overview
* App Name: Stash
* Stage Reached: Stage 1 (Single-device inbox with local persistence)
* Target Users: Individuals needing a fast digital pocket for notes, links, and snippets.

## 🛠️ Tech Stack
* Framework: React Native / Expo
* Language: JavaScript
* Local Persistence: `@react-native-async-storage/async-storage`

## 🏗️ Simple Architecture Diagram
[ User Input / Form ]
│
▼
[ React State (useState) ]
│
├────────────────────────┐
▼                        ▼
[ Async Local Storage ]   [ FlatList UI Feed ]
(Device Storage)          (Rendered View)

## 🚀 How to Run
1. Open the live Expo Snack preview: `https://snack.expo.dev/@vansh-bhan/byte-app-devlopment-task`
2. Download the **Expo Go** app on your iOS or Android device.
3. Scan the QR code displayed in Expo Snack to launch the app instantly on your phone.

## 💡 Technical Decisions
* **React Native with Expo:** Selected for fast cross-platform deployment and instant testing via QR code.
* **AsyncStorage:** Chosen for lightweight, reliable local data persistence without requiring an external server or authentication setup for Stage 1.

