# 🚀 Render Environment Variables Setup

## Critical Environment Variables for Production

### 1. Required Variables

Copy and paste these into your Render environment variables section:

```
NODE_ENV=production
```

```
MONGO_URI=mongodb+srv://myapp_prod_user:Mj4dveOiaFQsFfCi@cluster0.jvheris.mongodb.net/portfolio?retryWrites=true&w=majority
```

```
JWT_SECRET=e9e9392d210d6ceaf8bddf57cc50a7273c00bdec65759db542a07ab04c96157175298e1d208a1b653117ef43cdc6bd5924c590b37daa81938d363896e5a7d7dc
```

```
SESSION_SECRET=f8a3c92e421f7daeb9cef68ddb61b8384d11cefd76860ec653b18bc15da7268286409f2e319c2c764228fg54ede7ce6a35d691c48ebb92a49e474907f6b8e8ed
```

```
FRONTEND_URL=https://prakash-chaudhary-portfolio.vercel.app
```

### 2. Optional Email Variables (For MFA, Password Reset, Email Verification)

If using Gmail:
```
SMTP_HOST=smtp.gmail.com
```

```
SMTP_PORT=587
```

```
SMTP_USER=prakashchaudhary92290@gmail.com
```

```
SMTP_PASS=your-gmail-app-password
```

```
SMTP_FROM_EMAIL=noreply@prakashchaudhary.com
```

```
SMTP_FROM_NAME=Portfolio Admin
```

### How to Get Gmail App Password:
1. Go to Google Account Settings
2. Security → 2-Step Verification (must be enabled)
3. App Passwords → Generate new app password
4. Use the generated 16-character password

---

## 📝 Step-by-Step Setup in Render

### 1. Go to Your Render Dashboard
- Navigate to: https://dashboard.render.com/
- Select your backend service

### 2. Go to Environment Section
- Click on "Environment" in the left sidebar
- Click "Add Environment Variable"

### 3. Add Each Variable
For each variable above:
1. Click "Add Environment Variable"
2. Key: `NODE_ENV`
3. Value: `production`
4. Click "Save Changes"

### 4. Deploy
After adding all variables:
- Render will automatically redeploy your service
- Or manually trigger a deploy from the "Manual Deploy" section

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Service status is "Live"
- [ ] No error logs in Render console
- [ ] API health endpoint works: `https://prakash-chaudhary-portfolio-1.onrender.com/api/health`
- [ ] Login works from frontend
- [ ] Projects load correctly
- [ ] Contact form works
- [ ] No CORS errors in browser console

---

## 🔐 Security Features Active

With these environment variables, the following security features are now active:

✅ **Production Mode**
- HTTPS enforced
- Security headers enabled
- Registration disabled

✅ **Strong Encryption**
- Argon2 password hashing
- 128-character JWT secret
- Secure session management

✅ **Rate Limiting**
- 5 login attempts per 15 minutes
- 100 API requests per 15 minutes
- 3 password resets per hour

✅ **Account Protection**
- Account lockout after 5 failed attempts
- 30-minute lockout duration
- Login history tracking

✅ **Session Security**
- Secure cookies (HttpOnly, SameSite=Strict)
- Session regeneration after login
- Multiple session tracking

---

## 🔧 Optional: Enable MFA for Admin Account

After deployment, enable MFA for maximum security:

### 1. Login to Admin Dashboard
```
https://prakash-chaudhary-portfolio.vercel.app/admin/login
Email: pprakash.k.chaudhary@gmail.com
Password: prakash@8848.np
```

### 2. Call MFA Setup Endpoint
Using Postman or curl:

```bash
curl -X POST https://prakash-chaudhary-portfolio-1.onrender.com/api/auth/mfa/setup \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 3. Scan QR Code
- The response will contain a QR code (base64 image)
- Scan with Google Authenticator or Authy

### 4. Verify and Enable
```bash
curl -X POST https://prakash-chaudhary-portfolio-1.onrender.com/api/auth/mfa/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"code":"123456"}'
```

Replace `123456` with the 6-digit code from your authenticator app.

---

## 🚨 If Something Goes Wrong

### Service Won't Start
1. Check Render logs for error messages
2. Verify all required environment variables are set
3. Ensure MongoDB URI is correct
4. Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0

### Can't Login
1. Check browser console for CORS errors
2. Verify FRONTEND_URL matches your Vercel URL
3. Check Render logs for authentication errors
4. Ensure JWT_SECRET is set correctly

### Email Not Working
1. Verify SMTP credentials are correct
2. Check if Gmail "Less secure app access" is enabled
3. Or use Gmail App Password (recommended)
4. Emails work in development mode by logging to console

---

## 📊 Monitor Your Service

### Check Service Health
```bash
curl https://prakash-chaudhary-portfolio-1.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-06-03T12:00:00.000Z",
  "uptime": 12345,
  "memory": {...}
}
```

### Run Security Audit Locally
```bash
cd backend
npm run security-audit
```

### Check Logs
- Render Dashboard → Your Service → Logs
- Look for:
  - `Server is running on port 5000`
  - `MongoDB Connected`
  - `Environment: production`

---

## 📈 Next Steps

1. **Enable MFA**: Protect admin account with 2FA
2. **Configure Email**: Set up SMTP for password reset
3. **Monitor Logs**: Check Render logs regularly
4. **Backup Database**: Set up MongoDB Atlas backups
5. **Set Up Alerts**: Configure uptime monitoring
6. **Regular Updates**: Run `npm audit fix` monthly

---

## 🆘 Support

If you need help:
1. Check Render documentation: https://render.com/docs
2. MongoDB Atlas docs: https://docs.atlas.mongodb.com/
3. Review backend logs in Render dashboard
4. Test endpoints with Postman

---

**Last Updated**: June 3, 2026
**Version**: 2.0
**Maintained By**: Prakash Chaudhary
