
#!/usr/bin/env python3
"""
Setup script for DocuGenius backend
"""
import subprocess
import sys
import os

def install_requirements():
    """Install required Python packages"""
    print("📦 Installing backend requirements...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"])
        print("✅ Backend requirements installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False
    return True

def create_backend_directory():
    """Create backend directory if it doesn't exist"""
    if not os.path.exists("backend"):
        os.makedirs("backend")
        print("✅ Created backend directory")

def main():
    print("🚀 Setting up DocuGenius backend...")
    
    create_backend_directory()
    
    if install_requirements():
        print("\n✅ Setup complete!")
        print("\n📋 Next steps:")
        print("1. Start the backend: python backend/app.py")
        print("2. In another terminal, start the frontend: npm run dev")
        print("3. Open http://localhost:8080 in your browser")
        print("\n🔧 Backend will run on: http://localhost:5000")
        print("🌐 Frontend will run on: http://localhost:8080")
    else:
        print("\n❌ Setup failed. Please check the error messages above.")

if __name__ == "__main__":
    main()
