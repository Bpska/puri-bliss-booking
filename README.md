# Hotel Amruta Bhojana - VPS Deployment Guide 🚀

This guide explains how to deploy the Hotel Amruta Bhojana web application (React Frontend + Node.js Backend + PostgreSQL) to any Virtual Private Server (VPS) running Linux (Ubuntu/Debian recommended).

## Prerequisites

Before beginning, ensure your VPS has the following installed:
1. **Docker**: The containerization engine.
2. **Docker Compose**: The tool to orchestrate multiple containers.
3. **Git**: To clone your code repository to the server.

If your VPS does not have Docker installed, you can install it quickly using the official script:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt install docker-compose -y
```

---

## Step 1: Transfer Code to the VPS

First, log into your VPS via SSH. Then, bring your code onto the server. You can either use Git or copy the files directly via SCP.

**Option A: Using Git (Recommended)**
```bash
git clone <your-repository-url> puri-bliss-booking
cd puri-bliss-booking
```

---

## Step 2: Configure Environment Variables

1. Inside your `puri-bliss-booking` folder on the VPS, look at the `docker-compose.yml` file. 
2. We have already configured all the required environment variables directly inside the `docker-compose.yml` file under the `backend` service (like `DB_PASSWORD`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`).

*Note: For production, you may want to change `JWT_SECRET` and passwords to more secure, randomized strings.*

---

## Step 3: Build and Start the Containers

Once you are in the directory containing `docker-compose.yml`, run the following command to download the dependencies, build the Frontend and Backend images, and start the system in the background:

```bash
docker-compose up -d --build
```

**What this command does:**
- Download the official PostgreSQL 15 database image.
- Build the `backend` Node.js server.
- Build the `frontend` React app and bundle it into an extremely fast Nginx web server.
- Start all three containers on an isolated Docker network.
- `-d` runs them in "detached" mode so they stay running when you close your SSH terminal.

---

## Step 4: Verify the Deployment

You can check if everything is running smoothly by viewing the status of your containers:

```bash
docker-compose ps
```
You should see 3 containers (`puri_bliss_db`, `puri_bliss_backend`, `puri_bliss_frontend`) with an `Up` status.

If you need to check logs (for example, to see if the database seeded properly):
```bash
docker-compose logs -f
```

---

## Step 5: Access the Application

Your application is now live on your VPS!

- **Frontend Website:** Open your browser and go to `http://<YOUR_VPS_IP>:8080`
- **Backend API:** The API is accessible internally at port `5001` (or host port `5001` if allowed by your firewall).
- **Admin Panel:** Visit `http://<YOUR_VPS_IP>:8080/#admin`. 
  - *Default Username:* `bps`
  - *Default Password:* `bps`

---

## Step 6: Connecting a Domain (Production)

If you have purchased a domain name (e.g. `hotelamrutabhojana.com`), here is exactly how to link it so the public can access your website securely.

### Option A: Traditional Nginx Reverse Proxy (Recommended for VPS)
Install Nginx directly on your Linux host machine to forward traffic from port 80/443 to your Docker container.

1. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

2. **Create the Nginx Configuration File:**
   ```bash
   sudo nano /etc/nginx/sites-available/hotelamruta
   ```

3. **Paste this exact configuration (replace `yourdomain.com` with your actual domain):**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```
   *Save and exit Nano (`Ctrl+O`, `Enter`, `Ctrl+X`).*

4. **Enable the site and restart Nginx:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/hotelamruta /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Point Your DNS:** Log into your Domain Registrar (GoDaddy, Namecheap, etc.) and create an **A Record** pointing `yourdomain.com` to your **VPS IP Address**.

---

### Option B: Using Ngrok (Quick Demo/Testing without DNS)

If you don't have a domain name yet, or your VPS blocks incoming port 80 traffic, you can use **Ngrok** to instantly generate a public HTTPS URL.

1. **Install Ngrok on your Linux VPS:**
   ```bash
   curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok
   ```

2. **Authenticate Ngrok:** (Get your auth token from dashboard.ngrok.com)
   ```bash
   ngrok config add-authtoken <YOUR_NGROK_TOKEN>
   ```

3. **Tunnel the Frontend Port:** Run this command to expose your Docker frontend to the web completely free:
   ```bash
   ngrok http 8080
   ```
   *Ngrok will print out a public URL (e.g., `https://1a2b-3c4d.ngrok-free.app`). You can share this URL with anyone in the world to access your booking site!*

---

## Troubleshooting commands

**To stop the application:**
```bash
docker-compose down
```

**To completely wipe the database and start fresh:**
```bash
docker-compose down -v
```

**To rebuild after making code changes:**
```bash
docker-compose up -d --build
```
