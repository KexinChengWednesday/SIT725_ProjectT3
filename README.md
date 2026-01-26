# Project Setup Guide

This guide will walk you through the steps to set up and run the application using Docker.

---

## Prerequisites

- [Git](https://git-scm.com/downloads) installed on your local machine
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed

---

## Step 1: Clone the GitHub Repository

Open your terminal or command prompt and run:

```bash
git clone https://github.com/thachoden/SIT725_ProjectT3
```

---

## Step 2: Switch to the `thac-docker` Branch

Navigate into the cloned repository folder:

```bash
cd replace-with-local-folder-path
```

Then switch to the `thac-docker` branch:

```bash
git checkout thac-docker
```

---

## Step 3: Run Docker Compose

Start the containers defined in the `docker-compose.yml` file:

```bash
docker compose up -d
```

This will build and run the application and its dependencies in detached mode.

---

## Step 4: Access Container Shell and Seed Data

Enter the application container shell:

```bash
docker exec -it GoPick-application sh
```

Inside the container, run the seed script to populate initial data:

```bash
node config/seed.js
```

After seeding, you can exit the container shell by typing:

```bash
exit
```

---

## Step 5: Access the Application

Open your web browser and go to:

```
http://localhost:5000
```

You should see the application running.

---

## Troubleshooting

- If ports are already in use, stop conflicting services or change port mappings in `docker-compose.yml`.
- To stop and remove containers, run:

```bash
docker compose down
```

---

Feel free to reach out if you encounter any issues during setup!
