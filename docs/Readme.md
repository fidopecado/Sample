# Learning Tracker

A lightweight, client-side web application for tracking daily learning activities, IT ticket work, problems encountered, and portfolio progress.  
Designed as a realistic internal tool for IT support and junior web development workflows.

## Live Demo
https://fidopecado.github.io/sample/

---

## Problem Statement

IT support and junior developers often track learning progress, tickets, and issues across multiple tools or notes.  
This project provides a simple, focused interface to log daily activities, reflect on solutions, and review progress over time — without a backend or external dependencies.

---

## Features

- Create, edit, and delete learning logs
- Safe edit flow with cancel (prevents accidental data loss)
- Status-based filtering (Encountered, Submitted, In Progress, Solved)
- Keyword search across logs
- Multiple sort options (date and title)
- Summary dashboard (total, solved, submitted, in progress)
- Persistent storage using browser `localStorage`
- Empty-state handling for improved UX

---

## Tech Stack

- **HTML** — semantic structure
- **CSS** — responsive, utility-first styling
- **Vanilla JavaScript** — state management, rendering, and UI logic
- **localStorage** — client-side persistence

No frameworks or backend were used to emphasize core JavaScript fundamentals and predictable state handling.

---

## Design Decisions

- **Single source of truth**: all logs are managed in-memory and re-rendered from state
- **Non-mutating view logic**: filtering, searching, and sorting do not modify stored data
- **Explicit edit state**: editing is isolated until confirmed, with cancel support
- **Render pipeline**: filter → search → sort → render for predictable UI behavior

These decisions mirror patterns commonly used in larger frontend applications.

---

## Project Status

✅ Feature complete  
✅ Deployed on GitHub Pages  

---

## Possible Enhancements (Not Implemented)

- Data export (CSV)
- Charts or analytics
- Backend persistence
- Authentication

These were intentionally excluded to keep the project focused and maintainable.