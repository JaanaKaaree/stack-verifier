# How to Use MATTR Verifier App

This guide explains how to run and connect to the MATTR Verifier app in different network scenarios.

## Prerequisites

- ✅ EAS Build completed and APK installed on your Android device
- ✅ Node.js and npm installed on your computer
- ✅ Expo CLI installed (`npm install -g eas-cli`)

---

## Scenario 1: Same Network (Phone and Computer on Same WiFi)

This is the fastest option when both devices are on the same local network.

### Step 1: Find Your Computer's IP Address

**On Windows:**
```bash
ipconfig
```
Look for `IPv4 Address` under your active network adapter (usually starts with `192.168.x.x` or `10.x.x.x`)

**On Mac/Linux:**
```bash
ifconfig
```
or
```bash
ip addr show
```

### Step 2: Start the Development Server

Open a terminal in the project directory:

```bash
cd c:\projects\stack_digital\stack-verifier\mattr-verifier
npx expo start --dev-client
```

**Expected Output:**

You should see output like:
```
› Metro waiting on exp://192.168.1.59:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

**If you see `http://localhost:8081` instead:**

Sometimes Expo shows:
```
› Metro waiting on http://localhost:8081
```

**This won't work on your phone!** You need to convert it to the `exp://` format:

1. **Find your computer's IP address** (from Step 1 above)
2. **Replace `localhost` with your IP** in the URL
3. **Change `http://` to `exp://`**

**Example:**
- Terminal shows: `http://localhost:8081`
- Your IP is: `192.168.1.59`
- Use in app: `exp://192.168.1.59:8081`

**Important:** Note the IP address shown (or use the one from Step 1)

### Step 3: Connect Your Phone

**Option A: Scan QR Code**
1. Open the MATTR Verifier app on your phone
2. Tap "Scan QR code" when prompted
3. Point your camera at the QR code in the terminal
4. Wait for the app to load

**Option B: Enter URL Manually**
1. Open the MATTR Verifier app on your phone
2. Tap "Enter URL manually"
3. Type: `exp://YOUR_IP_ADDRESS:8081` (replace with your actual IP)
   - Example: `exp://192.168.1.59:8081`
4. Tap "Connect"

### Troubleshooting Same Network Issues

- **Can't connect?** Make sure:
  - Both devices are on the same WiFi network
  - Windows Firewall allows Node.js/Metro bundler (you'll get a prompt)
  - Your router isn't blocking device-to-device communication
  - The IP address in the URL matches your computer's IP

---

## Scenario 2: Different Networks (Using Tunnel)

Use this when your phone and computer are on different networks, or when same-network connection doesn't work.

### Step 1: Start the Development Server with Tunnel

Open a terminal in the project directory:

```bash
cd c:\projects\stack_digital\stack-verifier\mattr-verifier
npx expo start --dev-client --tunnel
```

**Wait for tunnel to initialize** (this can take 10-30 seconds). You'll see:
```
› Starting tunnel...
› Tunnel ready.
› Metro waiting on exp://abc123def456.tunnelname.exp.direct:80
```

The URL will have a `.exp.direct` domain instead of an IP address.

### Step 2: Connect Your Phone

**Option A: Scan QR Code**
1. Open the MATTR Verifier app on your phone
2. Tap "Scan QR code"
3. Point your camera at the QR code in the terminal
4. Wait for the app to load (first time may take a minute)

**Option B: Enter URL Manually**
1. Open the MATTR Verifier app on your phone
2. Tap "Enter URL manually"
3. Copy the full URL from terminal (starts with `exp://` and ends with `.exp.direct`)
   - Example: `exp://abc123def456.tunnelname.exp.direct:80`
4. Paste it and tap "Connect"

### Troubleshooting Tunnel Issues

- **Tunnel fails to start?**
  - Check your internet connection
  - Try restarting the command
  - Disable VPN if active (can interfere with tunnel)
  - Wait a bit longer (tunnels can be slow to initialize)

- **Connection timeout?**
  - Make sure you're using the tunnel URL (not localhost)
  - Check that the tunnel URL in terminal matches what you entered
  - Try restarting the dev server

---

## Using the App Features

Once connected, you'll see the home screen with two options:

### 1. Scan QR Code
- Tap "Scan QR Code" button
- Point camera at a credential QR code
- View verification results

### 2. Read NFC Tag
- Tap "Read NFC Tag" button
- Grant NFC permission if prompted
- Hold phone near NFC tag
- View tag data (NZBN, Location ID, Location Name, Bin ID, Row ID)

---

## Quick Reference Commands

### Start Dev Server (Same Network)
```bash
npx expo start --dev-client
```

### Start Dev Server (Tunnel - Different Networks)
```bash
npx expo start --dev-client --tunnel
```

### Stop Dev Server
Press `Ctrl+C` in the terminal

### Restart After Code Changes
- Save your code changes
- The app will automatically reload (Fast Refresh)
- If it doesn't, shake your phone and tap "Reload"

---

## Common Issues and Solutions

### "Metro waiting on http://localhost:8081" (Wrong URL Format)
- **Problem:** Terminal shows `http://localhost:8081` instead of `exp://` URL
- **Solution:** 
  1. Find your computer's IP address using `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
  2. Convert the URL: Replace `http://localhost:8081` with `exp://YOUR_IP:8081`
  3. Example: If your IP is `192.168.1.59`, use `exp://192.168.1.59:8081`
  4. Alternatively, use tunnel mode: `npx expo start --dev-client --tunnel`

### "Failed to connect to localhost"
- **Problem:** You're trying to use localhost URL on a physical device
- **Solution:** Use tunnel mode (`--tunnel` flag) or convert to `exp://` format with your IP address

### "Metro bundler not found"
- **Problem:** Dev server isn't running
- **Solution:** Make sure `npx expo start --dev-client` is running in terminal

### "App won't reload after code changes"
- **Problem:** Fast Refresh might be disabled
- **Solution:** Shake your phone → Tap "Reload" or restart the dev server

### "NFC not working"
- **Problem:** NFC requires a physical device (not emulator)
- **Solution:** Make sure you're testing on a real Android phone with NFC enabled

### "Can't scan QR code in app"
- **Problem:** The QR code scanner is for credentials, not for connecting
- **Solution:** Use the Expo Dev Client's built-in QR scanner or manual URL entry

---

## Tips

- ✅ Keep the terminal window open while using the app
- ✅ Tunnel mode works from anywhere (even different cities!)
- ✅ Same network mode is faster but requires same WiFi
- ✅ First connection may take 1-2 minutes to download JavaScript bundle
- ✅ Subsequent connections are much faster (cached)

---

## Need Help?

If you encounter issues not covered here:
1. Check the terminal output for error messages
2. Make sure your EAS build completed successfully
3. Verify the app is installed correctly on your device
4. Try restarting both the dev server and the app
