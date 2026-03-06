# 🏨 Hotel Amruta Bhojana — Complete VPS Deployment Guide

This guide deploys the full **React Frontend + Node.js Backend + PostgreSQL** stack to any Ubuntu/Debian VPS using Docker Compose.

---

## 🖥️ What Will Be Running on Your VPS

| Container | What it does | Port |
|---|---|---|
| `puri_bliss_db` | PostgreSQL 15 database | `5430` (host) → `5432` (internal) |
| `puri_bliss_backend` | Node.js Express API | `5001` (host) → `5000` (internal) |
| `puri_bliss_frontend` | React app served by Nginx | `8080` (host) → `80` (internal) |

---

## ✅ Step 1 — Log in to Your VPS via SSH

Open your terminal (on Windows use **PowerShell** or **PuTTY**) and run:

```bash
ssh root@YOUR_VPS_IP
```

> Replace `YOUR_VPS_IP` with your actual server IP address. Example: `ssh root@157.230.80.22`

Once logged in, you will see the Linux terminal prompt on your VPS.

---

## ✅ Step 2 — Install Docker and Docker Compose

Run these commands **one by one** on your VPS:

```bash
# 1. Update the package list
sudo apt update

# 2. Install Docker using the official script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 3. Install Docker Compose
sudo apt install docker-compose -y

# 4. Verify both are installed correctly
docker --version
docker-compose --version
```

You should see version numbers printed for both. If yes, continue to Step 3.

---

## ✅ Step 3 — Install Git and Clone the Code

```bash
# 1. Install Git
sudo apt install git -y

# 2. Clone your repository (use your actual GitHub repo URL)
git clone https://github.com/YOUR_USERNAME/puri-bliss-booking.git

# 3. Go into the project folder
cd puri-bliss-booking
```

> ⚠️ Replace the GitHub URL with your actual repository URL. You can get it from GitHub → Your Repo → Green "Code" button → Copy HTTPS link.

---

## ✅ Step 4 — Review and Set Environment Variables

All environment variables are already configured inside `docker-compose.yml`. You do **not** need to create a `.env` file on the VPS.

Open the file to verify the settings:
```bash
cat docker-compose.yml
```

The important values inside are:

| Variable | Current Value | What It Is |
|---|---|---|
| `POSTGRES_PASSWORD` / `DB_PASSWORD` | `bps` | Database password |
| `ADMIN_USERNAME` | `bps` | Admin panel login username |
| `ADMIN_PASSWORD` | `bps` | Admin panel login password |
| `JWT_SECRET` | `hotel_amruta_super_secret_key_2024` | Token signing secret |
| `FRONTEND_URL` | `http://localhost:8080` | Allowed CORS origin |

> 🔒 **For production security**, change the passwords before deploying. You can edit the file with:
> ```bash
> nano docker-compose.yml
> ```
> Save with `Ctrl+O` → `Enter` → `Ctrl+X`.

---

## ✅ Step 5 — Build and Start All Containers

Make sure you are inside the `puri-bliss-booking` folder, then run:

```bash
docker-compose up -d --build
```

**What happens now (takes 3–5 minutes):**
1. Docker pulls the `postgres:15-alpine` database image from Docker Hub.
2. Docker builds the **backend** image from `server/Dockerfile`.
3. Docker builds the **frontend** React image, compiles it, and puts it in an Nginx container (from `client/Dockerfile`).
4. All 3 containers start in the background (`-d` = detached mode).

You will see build logs scrolling. When it finishes and you get the terminal prompt back, move to Step 6.

---

## ✅ Step 6 — Verify Everything is Running

Check the status of all containers:

```bash
docker-compose ps
```

You should see **three** containers, all with **Up** status:

```
Name                    Status
puri_bliss_db           Up
puri_bliss_backend      Up
puri_bliss_frontend     Up
```

If any shows `Exit` status, check its logs:

```bash
# See logs for all containers together
docker-compose logs -f

# See logs for just one container
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

---

## ✅ Step 7 — Open the Firewall Port

Your VPS firewall may block outside traffic. Allow port `8080` so the site is accessible:

```bash
# Using UFW (most Ubuntu VPS)
sudo ufw allow 8080
sudo ufw allow 22      # Keep SSH open — very important!
sudo ufw enable

# Check what is allowed
sudo ufw status
```

---

## ✅ Step 8 — Access Your Live Website

Open your browser and visit:

```
http://YOUR_VPS_IP:8080
```

Your Hotel Amruta Bhojana website is now live! 🎉

| What | URL |
|---|---|
| 🌐 Main Website | `http://YOUR_VPS_IP:8080` |
| 🔧 Admin Panel | `http://YOUR_VPS_IP:8080/#admin` |
| ⚙️ Backend API | `http://YOUR_VPS_IP:5001/api` |

**Admin Login Credentials:**
- **Username:** `bps`
- **Password:** `bps`

---

## ✅ Step 9 — Connect a Custom Domain (Production)

If you have a domain (e.g., `hotelamrutabhojana.com`), follow these steps:

### 9A. Point Your Domain DNS to the VPS

Log into your domain registrar (GoDaddy, Namecheap, etc.) and add:

| Record Type | Host | Points To |
|---|---|---|
| A | `@` (or blank) | `YOUR_VPS_IP` |
| A | `www` | `YOUR_VPS_IP` |

DNS changes take **5 minutes to 24 hours** to propagate worldwide.

### 9B. Install Nginx as a Reverse Proxy on the VPS Host

```bash
sudo apt install nginx -y
```

### 9C. Create Nginx Site Configuration

```bash
sudo nano /etc/nginx/sites-available/hotelamruta
```

Paste this configuration (replace `yourdomain.com` with your actual domain):

```nginx
server {
    listen 80;
    server_name hotelamrutabhojana.com www.hotelamrutabhojana.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```

Save: `Ctrl+O` → `Enter` → `Ctrl+X`

### 9D. Enable the Site and Restart Nginx

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/hotelamruta /etc/nginx/sites-enabled/

# Test the configuration for errors
sudo nginx -t

# Apply the changes
sudo systemctl restart nginx
```

### 9E. Allow HTTP/HTTPS Through Firewall

```bash
sudo ufw allow 80
sudo ufw allow 443
```

Now visit `http://yourdomain.com` — your site will load! ✅

---

## ✅ Step 10 — Add Free HTTPS/SSL with Certbot

```bash
# 1. Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# 2. Get a free SSL certificate (replace with your actual domain)
sudo certbot --nginx -d hotelamrutabhojana.com -d www.hotelamrutabhojana.com

# 3. Follow the prompts — enter your email, agree to terms
# Certbot will automatically update your Nginx config for HTTPS
```

After this, your site will be accessible at `https://yourdomain.com` with a valid SSL certificate that auto-renews every 90 days. 🔒

---

## 🔄 Useful Maintenance Commands

```bash
# Stop the application
docker-compose down

# Restart the application (no rebuild)
docker-compose up -d

# Rebuild and restart after code changes
docker-compose up -d --build

# Pull latest code from Git and redeploy
git pull
docker-compose up -d --build

# View live logs
docker-compose logs -f

# Wipe database and start completely fresh (WARNING: deletes all data)
docker-compose down -v
docker-compose up -d --build
```

---

## 🚨 Troubleshooting

| Problem | Solution |
|---|---|
| Website not loading | Check `sudo ufw status` — ensure port `8080` is allowed |
| Container in `Exit` state | Run `docker-compose logs backend` to see the error |
| `docker-compose` command not found | Run `sudo apt install docker-compose -y` |
| Port 8080 already in use | Run `sudo lsof -i :8080` to see what's using it |
| Database connection error | Wait 10 seconds and retry — database may still be starting |
| Changes not reflecting | Run `docker-compose up -d --build` to rebuild |
