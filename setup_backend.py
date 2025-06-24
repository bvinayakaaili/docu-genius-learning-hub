
#!/usr/bin/env python3
"""
Setup script for DocuGenius backend
"""
import subprocess
import sys
import os

def install_requirements():
    """Install required Python packages"""
    print("Installing backend requirements...")
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
        print("\nNext steps:")
        print("1. Run the backend: python backend/streamlit_api.py")
        print("2. In another terminal, run the frontend: npm run dev")
        print("3. Open http://localhost:8080 in your browser")
    else:
        print("\n❌ Setup failed. Please check the error messages above.")

if __name__ == "__main__":
    main()
