<br />
<div align="center">
  <a href="https://buildabot.tarifmohammad.com">
    <img src="src/assets/Chat_Bot_Icon.svg" alt="Logo" width="240" height="240">
  </a>
</div>

# Build A Bot – Frontend

Build A Bot is a full-stack RAG chatbot builder that enables users to create custom AI chatbots powered by their own uploaded data.

This repository contains the React frontend responsible for user interaction, bot management, and chat interface functionality.

---

## 🚀 Overview

The frontend allows users to:

- Create and configure custom RAG bots
- Upload PDFs and provide URLs
- Switch between multiple bots
- Interact with chat interfaces in real-time
- Reset chat sessions
- Edit bot behavior dynamically

---

## 🏗 Frontend Architecture

The frontend is structured around:

- Modular React components
- API-driven state updates
- Bot-based state switching
- Client-side chat history

Key design principles:
- Clear separation between bot configuration and chat interaction
- Predictable state updates
- Minimal UI logic inside network layers

---

## 🏗 Architecture Diagram

User Interface (React Components)</br>
  ├── Bot Creation View</br>
  ├── Bot Management View</br>
  ├── Chat Interface</br>
  └── Settings Panel</br>
          ↓</br>
API Layer (REST Calls)</br>
          ↓</br>
Build A Bot Backend</br>
          ↓</br>
AstraDB + LLM</br>

---

## 🛠 Tech Stack

- React (Vite)
- JavaScript
- Tailwind CSS
- React Router
- REST API integration
- Docker (local containerization)

---

## 🔄 API Integration

The frontend communicates with the backend via REST endpoints to:

- Create bots
- Upload data
- Submit RAG queries
- Modify bot attributes
- Reset chat sessions

Chat state is managed client-side, while contextual knowledge is retrieved server-side.

---

## ⚖️ Design Considerations

- Clear UX separation between bot creation and querying
- Optimistic UI updates for smoother interaction
- Error handling for ingestion and query failures
- Designed for extensibility (future auth, sharing, analytics)

---

## 🌐 Live Demo

https://buildabot.tarifmohammad.com/

---

## 📬 Contact

Tarif Mohammad - [@GitHub](https://github.com/Tarif24) - [@Linkedin](https://www.linkedin.com/in/tarif-mohammad/) - Tarif24@hotmail.com

Backend Link: [https://github.com/Tarif24/Build_A_Bot_Backend](https://github.com/Tarif24/Build_A_Bot_Backend) </br>

