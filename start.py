
#!/usr/bin/env python3
"""
Simple start script for DocuGenius
"""
import subprocess
import sys
import os
import time
import threading

def start_backend():
    """Start the Flask backend"""
    print("🚀 Starting backend server...")
    try:
        subprocess.run([sys.executable, "backend/app.py"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped")
    except Exception as e:
        print(f"❌ Backend error: {e}")

def start_frontend():
    """Start the React frontend"""
    print("🌐 Starting frontend server...")
    try:
        subprocess.run(["npm", "run", "dev"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Frontend server stopped")
    except Exception as e:
        print(f"❌ Frontend error: {e}")

def main():
    print("🚀 Starting DocuGenius Application...")
    print("📋 This will start both backend and frontend servers")
    print("🔧 Backend: http://localhost:5000")
    print("🌐 Frontend: http://localhost:8080")
    print("\n⚠️  Note: You can also start them separately:")
    print("   Backend: python backend/app.py")
    print("   Frontend: npm run dev")
    print("\n" + "="*50)
    
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=start_backend)
    backend_thread.daemon = True
    backend_thread.start()
    
    # Give backend time to start
    time.sleep(3)
    
    # Start frontend
    try:
        start_frontend()
    except KeyboardInterrupt:
        print("\n🛑 Application stopped")

if __name__ == "__main__":
    main()
