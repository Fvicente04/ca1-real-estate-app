# Architecture Documentation

## Application Architecture
- Frontend: Angular 18
- Backend: Node.js/Express
- Database: PostgreSQL on Cloud SQL

## CI/CD Pipeline
GitHub -> Cloud Build -> App Engine

## Security
- Credentials in Secret Manager
- HTTPS enforced by App Engine
- Cloud SQL private connection
