from os.path import abspath, join
import sys

if len(sys.argv) < 3:
    print("Usage: python3 ./scripts/add_mixamo_animations_to_gltf.py ./public/assets/alex_avatar/animations ./public/assets/alex_avatar/animations")
    exit(1)

name_of_script = sys.argv[0]
animationsDir = sys.argv[1] if sys.argv[1] else "../public/assets/alex_avatar/animations"
modelsDir = sys.argv[2] if sys.argv[1] else "../public/assets/alex_avatar/models"

animationsDir = abspath(animationsDir)
modelsDir = abspath(modelsDir)

print(f"Models Directory: {modelsDir}")
print(f"Animations Directory: {modelsDir}")
