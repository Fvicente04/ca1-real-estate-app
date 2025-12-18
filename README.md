# Real Estate Application - Cloud Deployment Project

**Cloud Platform Development - CA1 Assessment**  
**Student:** Felipe Vicente  
**Module:** B8IS124  
**Dublin Business School**

---

## Live Application

**Deployed on Google Cloud Platform:**  
https://client-info-felipe-2025.ew.r.appspot.com

---

## Cloud Architecture Overview

This project demonstrates a production-ready cloud deployment of a Real Estate web application using Google Cloud Platform services. The deployment implements automated CI/CD pipelines, managed database services, and security best practices.

### GCP Services Deployed

**1. App Engine (Compute Platform)**
- Runtime: Node.js 22
- Instance Class: F1 (256MB RAM, 600MHz CPU)
- Auto-scaling: 0-2 instances
- Region: europe-west1 (Belgium)

**2. Cloud SQL (Database Service)**
- Database: PostgreSQL 17.7
- Machine Type: db-f1-micro
- Storage: 10GB SSD with automatic increase
- Automated daily backups enabled

**3. Secret Manager (Security Service)**
- Secure credential storage
- IAM-based access control
- Eliminates hardcoded passwords in code

**4. Cloud Build (CI/CD Service)**
- Automated deployment pipeline
- Triggered on git push to main branch
- Zero-downtime deployments

### Architecture Flow
```
Developer commits code → GitHub Repository → Cloud Build Trigger
                                                      ↓
                                        Automated Pipeline Execution
                                                      ↓
                                    Step 1: Install Dependencies
                                    Step 2: Run Database Migrations
                                    Step 3: Deploy to App Engine
                                                      ↓
                                              App Engine Instance
                                                      ↓
                              (Secure connection via Cloud SQL Proxy)
                                                      ↓
                                            Cloud SQL Database
```

---

## CI/CD Pipeline Implementation

### Automated Deployment Process

Every push to the main branch triggers an automated three-step deployment process:

**Step 1: Install Dependencies (approximately 15 seconds)**
- Executes npm install
- Installs all application dependencies
- Utilizes dependency caching for improved performance

**Step 2: Database Migration (approximately 30 seconds)**
- Starts Cloud SQL Proxy for secure connection
- Retrieves database credentials from Secret Manager
- Executes Sequelize migrations
- Ensures database schema remains synchronized with application code

**Step 3: Deploy Application (approximately 5 minutes)**
- Deploys updated application to App Engine
- Implements gradual traffic shifting for zero-downtime
- Provides automatic rollback capability if deployment fails

**Total automated deployment time:** Approximately 6 minutes from code commit to production

### Configuration Files

The deployment process is defined through three configuration files:

- `app.yaml` - App Engine runtime and scaling configuration
- `cloudbuild.yaml` - CI/CD pipeline step definitions
- `.gcloudignore` - Files excluded from deployment

---

## Security Implementation

### Best Practices Applied

**No Hardcoded Secrets**
All sensitive credentials are stored in Secret Manager and retrieved at deployment time. The DATABASE_URL connection string never appears in source code or version control.

**Encrypted Database Connections**
Cloud SQL Proxy creates an encrypted tunnel between App Engine and Cloud SQL using IAM-based authentication, eliminating the need for database credentials in connection strings.

**Least Privilege IAM**
Service accounts are configured with minimal required permissions following the principle of least privilege.

**HTTPS Enforcement**
App Engine automatically enforces HTTPS for all incoming traffic, ensuring data encryption in transit.

**Audit Logging**
All access to secrets and database connections are logged for security audit purposes.

### IAM Roles Configuration

The Cloud Build service account is configured with the following roles:

- `roles/secretmanager.secretAccessor` - Access to retrieve secrets
- `roles/cloudsql.client` - Permission for database connections
- `roles/appengine.appAdmin` - Authority to deploy applications

---

## Cost Analysis

### Monthly Cost Estimate (Moderate Usage Pattern)

| Service | Configuration | Monthly Cost (EUR) |
|---------|--------------|-------------------|
| App Engine | F1 instance, ~100 active hours | 4.50 |
| Cloud SQL | db-f1-micro, continuous operation | 15.20 |
| Cloud SQL Storage | 10GB SSD | 0.17 |
| Secret Manager | 1 secret, 10,000 operations | 0.01 |
| Cloud Build | Free tier usage | 0.00 |
| Network Egress | Approximately 5GB | 0.60 |
| **Total Monthly Cost** | | **20.48** |

### Cost Optimization Strategies

Several strategies can be implemented to reduce operational costs:

1. **Database Scheduling** - Using Cloud Scheduler to stop the Cloud SQL instance during off-hours (nights and weekends) could reduce database costs by approximately 50%

2. **CDN Implementation** - Cloud CDN can cache static content at edge locations, reducing network egress costs and improving performance

3. **Auto-scaling Configuration** - Current configuration scales to zero instances when idle, minimizing compute costs during low-traffic periods

---

## Deployment Monitoring

### Google Cloud Console Access

The following console links provide access to deployment monitoring and management:

- **App Engine Dashboard:** https://console.cloud.google.com/appengine?project=client-info-felipe-2025
- **Cloud Build History:** https://console.cloud.google.com/cloud-build/builds?project=client-info-felipe-2025
- **Cloud SQL Instance:** https://console.cloud.google.com/sql/instances?project=client-info-felipe-2025

### Command Line Monitoring

View deployment information using gcloud commands:
```bash
# View recent builds
gcloud builds list --limit=5 --project=client-info-felipe-2025

# View specific build logs
gcloud builds log [BUILD_ID] --project=client-info-felipe-2025

# Stream App Engine logs
gcloud app logs tail --project=client-info-felipe-2025
```

---

## Manual Deployment Procedures

While deployment is automated, manual deployment can be executed if required:
```bash
# Deploy application manually
gcloud app deploy --project=client-info-felipe-2025

# Open deployed application
gcloud app browse --project=client-info-felipe-2025

# View current deployment version
gcloud app versions list --project=client-info-felipe-2025
```

---

## Deployment Configuration Details

### App Engine Configuration (app.yaml)
```yaml
runtime: nodejs22
instance_class: F1
env: standard

automatic_scaling:
  target_cpu_utilization: 0.65
  min_instances: 0
  max_instances: 2

env_variables:
  NODE_ENV: production
```

Key configuration decisions:

- **Runtime:** Node.js 22 for latest language features and security updates
- **Instance Class:** F1 provides adequate resources while minimizing costs
- **Auto-scaling:** Configured to scale from 0 to 2 instances based on CPU utilization
- **Environment:** Production mode for optimized performance

### CI/CD Pipeline (cloudbuild.yaml)

The pipeline implements a three-step deployment process:

1. Dependency installation using official Node.js Docker image
2. Database migration execution via Cloud SQL Proxy with credential retrieval from Secret Manager
3. Application deployment to App Engine with zero-downtime release

---

## Technical Capabilities Demonstrated

### Cloud Infrastructure Management

- Deployment on fully managed compute platform
- Managed PostgreSQL database service
- Secure credential management system
- Automated continuous integration and deployment
- Auto-scaling and load balancing configuration
- Zero-downtime deployment implementation

### DevOps Practices

- Infrastructure as Code (IaC) approach
- Continuous Integration and Continuous Deployment (CI/CD)
- Automated database schema migrations
- Security best practices implementation
- Cost optimization strategies
- Monitoring and logging configuration

---

## Assessment Context

This deployment project was completed as part of the B8IS124 Cloud Platform Development module at Dublin Business School. The assessment focuses on:

- Practical deployment of applications on Google Cloud Platform
- Configuration and integration of multiple cloud services
- Implementation of automated CI/CD pipelines
- Application of cloud security best practices
- Understanding of cloud computing cost structures and optimization

The application code serves as a demonstration vehicle for cloud deployment capabilities, with primary emphasis on infrastructure automation, service integration, and deployment best practices.

---

## Project Information

**GitHub Repository:** https://github.com/Fvicente04/ca1-real-estate-app  
**Live Application:** https://client-info-felipe-2025.ew.r.appspot.com  
**Project ID:** client-info-felipe-2025  
**Deployment Region:** europe-west1 (Belgium)

**Author:** Felipe Vicente  
**Module:** B8IS124 Cloud Platform Development  
**Institution:** Dublin Business School  
**Submission Date:** December 2025

---

## Additional Documentation

Complete project documentation is available in the following files:

- `ARCHITECTURE.md` - Detailed architecture and service integration documentation
- `DEPLOYMENT.md` - Comprehensive deployment procedures and configuration guide
- Project Report (PDF) - Full assessment documentation with diagrams and analysis

---

## Deployment History

**Initial Deployment:** December 2025  
**Cloud Provider:** Google Cloud Platform  
**Total Commits:** 7  
**Automated Builds:** All successful  
**Current Status:** Production - Active

---

**End of Documentation** 