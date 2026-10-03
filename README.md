# Expense Tracker UI (React + Vite)

## Run
```
npm install
npm run dev
```
Open http://localhost:5173. Spring Boot must be running on http://localhost:8080
(Vite proxies /api/* to it, see vite.config.js).

## Required backend fixes
See the notes in the chat: @JsonIgnore on User.events and Event.expenses,
and update the owning side (User.events) in EventService.addMember/removeMember.
