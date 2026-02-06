# RAD 2 Server Helper Script (Windows)

This repository includes:

- `run-rad2-server.bat` — a launcher you can double-click to run a RAD 2 server.

## What you need to install (step by step)

## 1) Install Java
RAD 2 servers usually need Java (often Java 8 for older packs, sometimes Java 17 for newer server files).

1. Download and install Java (Temurin/OpenJDK is fine).
2. During install, enable adding Java to `PATH` if that option appears.
3. Open **Command Prompt** and run:
   ```bat
   java -version
   ```
4. If you see a Java version, you are good.

If `java` is not recognized, either:
- reinstall Java and add it to PATH, or
- edit `run-rad2-server.bat` and set:
  ```bat
  set "JAVA_EXE=C:\Path\To\java.exe"
  ```

## 2) Download your RAD 2 server files
1. Get the RAD 2 server pack from the launcher/platform you use (CurseForge/FTB/etc.).
2. Extract it to a folder, for example:
   `C:\Minecraft\RAD2-Server`

You should see files like `start.bat` and/or a server `.jar` in that folder.

## 3) Add this launcher script
1. Copy `run-rad2-server.bat` into the RAD 2 server folder (same folder as `start.bat` or server `.jar`).
2. Right-click `run-rad2-server.bat` → **Edit**.
3. Set RAM values near the top (example):
   ```bat
   set "MIN_RAM=4G"
   set "MAX_RAM=8G"
   ```

## 4) Start the server
1. Double-click `run-rad2-server.bat`.
2. On first run, it will create/fix `eula.txt` to `eula=true` (if enabled in script).
3. Wait for server startup to finish.

## 5) Allow players to connect (optional but usually needed)
If friends outside your home network will join:

1. Set a static local IP for your server PC (recommended).
2. Port-forward **25565 TCP** in your router to that local IP.
3. Allow Java/Minecraft server through Windows Firewall when prompted.
4. Share your public IP (or dynamic DNS hostname) with friends.

For LAN-only play, no port forwarding is needed.

## 6) Join the server
- On the same PC: use `localhost`.
- On same LAN: use server PC local IP (example `192.168.1.50`).
- Over internet: use your public IP/domain.

## Script settings you can change
Inside `run-rad2-server.bat`:

- `MIN_RAM` / `MAX_RAM` — Java memory allocation.
- `JAVA_EXE` — `java` or full path to `java.exe`.
- `AUTO_ACCEPT_EULA` — `true`/`false`.
- `RESTART_ON_CRASH` — auto restart when server exits.
- `RESTART_DELAY_SECONDS` — delay before restart.

## Quick troubleshooting
- **"Java was not found"**: run `java -version`, fix PATH or `JAVA_EXE`.
- **Server closes instantly**: run script from Command Prompt to read errors.
- **Out of memory / lag**: increase `MAX_RAM` carefully, close other apps.
- **Friends cannot connect**: re-check port forwarding + firewall + correct IP.
