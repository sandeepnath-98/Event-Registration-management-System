# Vercel Deployment Guide

## ⚠️ Important Note About Vercel

**Vercel is optimized for serverless/static sites**, while this is a **full-stack Express application**. This means:

- ✅ **Render is recommended** for this type of app (traditional server)
- ⚠️ **Vercel works** but has limitations (serverless functions, cold starts)

If you prefer Vercel anyway, follow this guide.

---

## 🚀 Quick Deploy to Vercel

### Step 1: Vercel Dashboard Settings

Based on your screenshot, configure:

**Framework Preset:**
```
Other (or Vite)
```

**Build Command:**
```
npm install && npm run build
```

**Output Directory:**
```
dist/public
```

**Install Command:**
```
npm install
```

**Root Directory:**
```
./
```

### Step 2: Environment Variables

Click **"Environment Variables"** in Vercel dashboard and add:

#### Email Configuration (SendGrid)
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
EMAIL_FROM=your-verified-email@domain.com
EMAIL_FROM_NAME=Event Registration
```

**Get SendGrid (FREE):**
1. Sign up: https://signup.sendgrid.com/
2. API Key: https://app.sendgrid.com/settings/api_keys
3. Verify sender: https://app.sendgrid.com/settings/sender_auth

#### Database & App Configuration
```
MONGODB_URI=your-mongodb-connection-string
DATABASE_NAME=event_registration
ADMIN_PASS=your-secure-password
SESSION_SECRET=your-random-secret-key
NODE_ENV=production
SITE_URL=https://your-app.vercel.app
```

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Update `SITE_URL` with your actual Vercel URL
4. Redeploy

---

## 🔧 Configuration Files Created

I've created these files for Vercel:
- `vercel.json` - Vercel configuration
- `api/index.js` - Serverless function wrapper

---

## ⚡ Vercel vs Render Comparison

| Feature | Vercel | Render |
|---------|--------|--------|
| **Best For** | Static sites, Next.js | Full-stack Node apps |
| **This App** | ⚠️ Works with limitations | ✅ Perfect fit |
| **Architecture** | Serverless functions | Traditional server |
| **Cold Starts** | Yes (~1-2 seconds) | No (always warm on paid) |
| **WebSockets** | Limited | Full support |
| **Sessions** | Requires external store | Built-in support |
| **Free Tier** | Generous bandwidth | 750 hours/month |
| **Cost** | $20/month (Pro) | $7/month (Starter) |

---

## 🎯 Known Vercel Limitations for This App

### 1. **Cold Starts**
- First request after inactivity takes 1-2 seconds
- Each serverless function starts independently

### 2. **Session Storage**
- Express sessions need external store (Redis, MongoDB)
- In-memory sessions won't work across requests

### 3. **File Uploads**
- Serverless functions have limited /tmp storage
- Need to use Vercel Blob or external storage

### 4. **10-Second Timeout**
- Functions timeout after 10 seconds (60s on Pro plan)
- Long QR generation might timeout

---

## 💡 Recommendation

**For this application, I recommend using Render instead of Vercel because:**

1. ✅ This is a traditional Express server (not serverless)
2. ✅ Sessions work better with persistent servers
3. ✅ No cold starts affecting user experience
4. ✅ Lower cost ($7/month vs $20/month)
5. ✅ Simpler deployment (no restructuring needed)

**However**, if you prefer Vercel for other reasons (branding, existing infrastructure, etc.), it will work with the configuration provided above.

---

## 🚀 Alternative: Use Render (Recommended)

See `RENDER_QUICKSTART.md` for simple deployment instructions.

**Render Build Command:**
```
NPM_CONFIG_PRODUCTION=false npm install && npm run build
```

**Render Start Command:**
```
npm run start
```

Add the same environment variables, and you're done!

---

## 📞 Support

**If deploying to Vercel:**
- Check Vercel Functions logs for errors
- Verify all environment variables are set
- Test locally first: `vercel dev`

**If switching to Render:**
- Follow `RENDER_QUICKSTART.md`
- Much simpler deployment process
- Better suited for this app architecture

Your choice! Both will work. 🎉
