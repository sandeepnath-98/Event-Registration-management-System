# ⚡ Vercel Quick Setup

## In Your Vercel Dashboard (From Screenshot)

### Framework Preset:
```
Other
```

### Root Directory:
```
./
```

### Build Command:
```
npm install && npm run build
```

### Output Directory:
```
dist/public
```

### Install Command:
```
npm install
```

---

## Environment Variables (Click the dropdown)

Add these in the "Environment Variables" section:

### Email (SendGrid - FREE)
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
EMAIL_FROM=your-email@domain.com
EMAIL_FROM_NAME=Event Registration
```

### Database & App
```
MONGODB_URI=your-mongodb-uri
DATABASE_NAME=event_registration
ADMIN_PASS=your-password
SESSION_SECRET=random-secret
NODE_ENV=production
SITE_URL=https://your-app.vercel.app
```

---

## Get SendGrid API Key (FREE):
1. https://signup.sendgrid.com/
2. https://app.sendgrid.com/settings/api_keys
3. https://app.sendgrid.com/settings/sender_auth

---

## Then Click "Deploy" 🚀

**Important:** After deployment, update `SITE_URL` with your actual Vercel URL and redeploy.

---

## ⚠️ Note

Vercel is optimized for static/serverless apps. This is a full-stack Express app, so **Render is recommended** (see `RENDER_QUICKSTART.md`). But Vercel will work too!
