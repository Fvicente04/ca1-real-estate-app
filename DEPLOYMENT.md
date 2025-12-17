# Deployment Guide

## GCP Services Configuration

### Cloud SQL
- Instance: clientdb-instance
- Database: clientdb
- Region: europe-west1
- Version: PostgreSQL 17.7

### App Engine
- Region: europe-west1
- Runtime: Node.js 22
- Scaling: 0-2 instances

### Secret Manager
- DATABASE_URL: PostgreSQL connection string

## Deployment Process
1. Push code to GitHub main branch
2. Cloud Build automatically triggers
3. Dependencies installed
4. Database migrations run
5. Deploy to App Engine

## Cost Estimate
- Monthly cost: EUR 20-25
