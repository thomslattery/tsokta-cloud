# Okta OIDC Setup Guide for Tsokta Sprockets

This guide will help you configure Okta OIDC authentication with a custom authorization server and hosted widget for the Tsokta Sprockets application.

## Prerequisites

- Okta account with admin access
- Ability to create applications and authorization servers in Okta

## Step 1: Create a Custom Authorization Server

1. **Log into your Okta Admin Console**
2. **Navigate to Security > API**
3. **Click "Add Authorization Server"**
4. **Configure the Authorization Server:**
   - **Name**: `Tsokta Sprockets Auth Server`
   - **Audience**: `api://tsokta-sprockets`
   - **Description**: `Authorization server for Tsokta Sprockets customer portal`

5. **Add Scopes** (Security > API > [Your Auth Server] > Scopes):
   - `openid` (already exists)
   - `profile` (already exists) 
   - `email` (already exists)
   - `groups` (add this custom scope)
   - `tsokta:read` (custom scope for read access)
   - `tsokta:admin` (custom scope for admin access)

6. **Add Claims** (Security > API > [Your Auth Server] > Claims):
   - **Groups Claim**:
     - Name: `groups`
     - Include in token type: `ID Token`, `Always`
     - Value type: `Groups`
     - Filter: `Matches regex` → `.*`
   - **Custom Claims** (optional):
     - Name: `company`
     - Include in token type: `ID Token`, `Always`
     - Value: `user.company` or static value

## Step 2: Create the OIDC Application

1. **Navigate to Applications > Applications**
2. **Click "Create App Integration"**
3. **Choose "OIDC - OpenID Connect"**
4. **Choose "Single-Page Application (SPA)"**
5. **Configure the Application:**

### General Settings
- **App integration name**: `Tsokta Sprockets Customer Portal`
- **App logo**: Upload your company logo (optional)

### Sign-in redirect URIs
```
http://localhost:3000/login/callback
https://your-domain.com/login/callback
```

### Sign-out redirect URIs
```
http://localhost:3000
https://your-domain.com
```

### Trusted Origins (if needed)
```
http://localhost:3000
https://your-domain.com
```

### Assignments
- Assign to appropriate groups or users who should have access

## Step 3: Configure Group-Based Access

1. **Create Groups** (Directory > Groups):
   - `Tsokta-Customers` - Regular customer access
   - `Tsokta-Admins` - Administrative access
   - `Tsokta-Premium` - Premium feature access

2. **Assign Users to Groups**:
   - Add users to appropriate groups based on their access level

3. **Create Access Policies** (Security > API > [Your Auth Server] > Access Policies):
   - **Policy Name**: `Tsokta Customer Access`
   - **Assign to**: Selected groups (`Tsokta-Customers`, `Tsokta-Admins`, `Tsokta-Premium`)

4. **Create Rules** for the policy:
   - **Rule Name**: `Allow Customer Portal Access`
   - **Grant Type**: `Authorization Code`
   - **User**: `Assigned to the app`
   - **Scopes**: Select all the scopes you created

## Step 4: Environment Configuration

Create a `.env.local` file in your project root:

```bash
# Replace with your actual Okta domain and IDs
NEXT_PUBLIC_OKTA_ISSUER=https://your-okta-domain.okta.com/oauth2/aus1abc2def3ghi4jk5l
NEXT_PUBLIC_OKTA_CLIENT_ID=0oa1abc2def3ghi4jk5l
NEXT_PUBLIC_OKTA_REDIRECT_URI=http://localhost:3000/login/callback
```

### Finding Your Configuration Values

1. **Issuer URL**:
   - Go to Security > API > [Your Auth Server]
   - Copy the "Issuer URI" (should end with your auth server ID)

2. **Client ID**:
   - Go to Applications > [Your App]
   - Copy the "Client ID" from the General tab

## Step 5: Test the Integration

1. **Start your development server**:
   ```bash
   npm install
   npm run dev
   ```

2. **Navigate to** `http://localhost:3000/login`

3. **Verify the Okta widget loads** with your branding

4. **Test login** with a user assigned to the appropriate groups

## Step 6: Production Deployment

### Update Environment Variables
```bash
NEXT_PUBLIC_OKTA_ISSUER=https://your-okta-domain.okta.com/oauth2/your-auth-server-id
NEXT_PUBLIC_OKTA_CLIENT_ID=your-production-client-id
NEXT_PUBLIC_OKTA_REDIRECT_URI=https://portal.tsoktasprockets.com/login/callback
```

### Update Okta Application Settings
1. Add production URLs to:
   - Sign-in redirect URIs
   - Sign-out redirect URIs
   - Trusted Origins

### Security Considerations
- Use HTTPS in production
- Configure CORS properly
- Set up proper CSP headers
- Consider rate limiting

## Customization Options

### Widget Branding
The Okta Sign-In Widget can be customized in `/app/login/page.tsx`:

```javascript
signInWidget.current = new window.OktaSignIn({
  // ... other config
  logo: '/images/tsokta-logo.png',
  logoText: 'Tsokta Sprockets Customer Portal',
  brandName: 'Tsokta Sprockets',
  colors: {
    brand: '#2563eb', // Your brand color
  },
  // Custom text
  i18n: {
    en: {
      'primaryauth.title': 'Sign in to Customer Portal',
      // ... more customizations
    },
  },
})
```

### Custom Claims
Access custom claims in your application:

```typescript
const user = await authService.getUser()
console.log(user?.custom_claims?.company) // Custom company claim
console.log(user?.groups) // User groups
```

## Troubleshooting

### Common Issues

1. **"Invalid issuer" error**:
   - Verify the issuer URL includes `/oauth2/[auth-server-id]`
   - Check that the authorization server is active

2. **"Invalid client" error**:
   - Verify the client ID is correct
   - Check that the app is assigned to users/groups

3. **CORS errors**:
   - Add your domain to Trusted Origins in Okta
   - Verify the redirect URIs are exact matches

4. **Widget doesn't load**:
   - Check browser console for errors
   - Verify network connectivity to Okta CDN
   - Check if ad blockers are interfering

### Debug Mode
Enable debug mode by setting `devMode: true` in the Okta configuration for additional logging.

## Support

For additional support:
- [Okta Developer Documentation](https://developer.okta.com/)
- [Okta Sign-In Widget Guide](https://github.com/okta/okta-signin-widget)
- [Okta Auth JS SDK](https://github.com/okta/okta-auth-js)
