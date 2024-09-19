from os.path import abspath, join, splitext
from os import listdir
import sys
import bpy

def deleteAll() -> None:
    bpy.ops.object.select_all()
    bpy.ops.object.delete()

deleteAll()

class MixamoAnimationImporter:
    animationsDir: str
    fbx_filenames: list[str] # e.g. Waving.fbx in ${ANIMATIONS_DIR}/Waving.fbx
    action_names: list[str]
    imported_fbx_armatures: list
    has_loaded_files_from_animations_dir: bool
    outputArmatureName: str
    final_cleanup_complete: bool

    def __importFbx(self, filepath: str, fbx_file_index: int):
        self.__deselectAll()

        action_name = self.__actionName(fbx_file_index)

        imported_fbx_scene = bpy.ops.import_scene.fbx(filepath=filepath)
        print(f"Successfully imported fbx scene from filepath \"{filepath}\"...")

        imported_armature = None
        num_armatures_in_fbx_file = 0
        for obj in bpy.context.selected_objects:
            if obj.type == 'ARMATURE':
                num_armatures_in_fbx_file += 1
                imported_armature = obj

        if num_armatures_in_fbx_file > 1:
            print(f"More than one armature found in FBX file for action \"{action_name}\"!")
            exit(1)

        if num_armatures_in_fbx_file == 0 or imported_armature is None:
            print(f"No armature found in FBX file for action: \"{action_name}\". Crashing...")
            exit(1)
        else:
            print(f"Found armature in FBX object!")

        return imported_armature

    # Loop through directory and import fbx files
    def __loadFbxFilesFromAnimationsDir(self, directory: str) -> None:
        # Get a list of all .fbx files in the directory
        self.fbx_filenames = [f for f in listdir(directory) if f.endswith('.fbx')]
        fbx_filepaths = [join(directory, fbx_file) for fbx_file in self.fbx_filenames]

        self.action_names = [splitext(fbx_file)[0] for fbx_file in self.fbx_filenames]
        print(f"Found {len(self.action_names)} animation files from directory: \"{directory}\"")
        for action_name in self.action_names:
            print(f"\t-\"{action_name}\"")

        if len(self.action_names) != len(self.fbx_filenames):
            raise Exception("Array lenght mismatch between actions names and number of FBX filenames")

        imported_fbx_armatures = []
        fbx_filepath_index: int = -1
        for filepath in fbx_filepaths:
            fbx_filepath_index += 1
            imported_armature = self.__importFbx(filepath, fbx_filepath_index)
            imported_armature.name = self.action_names[fbx_filepath_index]
            imported_fbx_armatures.append(imported_armature)

        print(f"Imported {len(imported_fbx_armatures)} animations from directory: {directory}")
        if (fbx_filepath_index + 1) != len(imported_fbx_armatures):
            raise Exception(f"Imported FBX armatures array is not of expected length, fbx_filepath_index: {fbx_filepath_index}")

        if len(imported_fbx_armatures) == 0:
            raise Exception(f"No FBX animations found in directory at path: {directory}")

        self.imported_fbx_armatures = imported_fbx_armatures

        # Sanity checks on array lengths after imports
        if len(self.action_names) != len(self.imported_fbx_armatures):
            raise Exception("Array length mismatch")

    def __init__(self) -> None:
        self.animationsDir = "/Users/jalexw/Desktop/personal-portfolio/public/assets/alex_avatar/animations"
        self.has_loaded_files_from_animations_dir = False
        self.outputArmatureName = "CombinedArmatures"
        self.final_cleanup_complete = False

    def __deselectAll(self) -> None:
        bpy.ops.object.select_all(action='DESELECT')

    def __deleteAll(self) -> None:
        deleteAll()

    def __deleteAllOriginalFbxArmatures(self):
        # Delete imported objects
        print("Deleting original imported armatures...")

        for index, armature in enumerate(self.imported_fbx_armatures):
            self.__deselectAll()

            # Select the armature
            armature.select_set(True)

            # Select all children (including meshes)
            for child in armature.children:
                child.select_set(True)

            # Delete selected objects
            bpy.ops.object.delete()

            print(f"Deleted armature and its children at index \"{index}\"...")

        # Clear the list of imported armatures
        self.imported_fbx_armatures.clear()
        self.action_names.clear()
        self.fbx_filenames.clear()
    ### end of __deleteAllOriginalFbxArmatures() ###

    def __selectFbxImportAnimature(self, fbx_file_index: int):
        try:
            fbx_animature_import = self.imported_fbx_armatures[fbx_file_index]

            fbx_animature_import.select_set(True)
            return fbx_animature_import
        except Exception:
            raise Exception(f"Failed to select objects from imported FBX scene @ file index: {fbx_file_index}")


    def __actionName(self, action_index: int) -> str:
        if not isinstance(self.action_names, list):
            raise Exception("Expected action_names to be a list! Was this called before the init script?")
        return self.action_names[action_index]

    def clear_workspace(self) -> None:
        print("Clearing Blender workspace...")
        self.__deleteAll()

    def import_files_from_animations_directory(self) -> None:
        print("Running Mixamo FBX importer...")
        self.__loadFbxFilesFromAnimationsDir(self.animationsDir)
        self.has_loaded_files_from_animations_dir = True

    def __initCombinedOutputArmature(self, copy_from):
        print("Creating empty output armature to merge FBX animations into...")
        target_object = copy_from.copy()
        target_object.name = self.outputArmatureName
        target_object.data = copy_from.data.copy()
        print("Created empty output armature to merge FBX animations into.")
        return target_object
        ### end __initCombinedOutputArmature()

    def __copyMeshIntoOutputArmature(self, source_armature, target_object):
        print(f"Attempting to copy mesh from first imported armature into output armature \"{self.outputArmatureName}\":")
        for child in source_armature.children:
            if child.type == 'MESH':
                print(f"\t-Mesh\"{child.name}\"")
                source_mesh = child
                new_mesh = source_mesh.data.copy()
                new_mesh_obj = bpy.data.objects.new(f"{target_object.name}_mesh_{source_mesh.name}", new_mesh)
                bpy.context.scene.collection.objects.link(new_mesh_obj)
                new_mesh_obj.parent = target_object

                new_mesh_obj.matrix_world = source_mesh.matrix_world.copy()
                new_mesh_obj.location = source_mesh.location.copy()
                new_mesh_obj.rotation_euler = source_mesh.rotation_euler.copy()
                new_mesh_obj.scale = source_mesh.scale.copy()

                # Copy materials
                for mat_slot in source_mesh.material_slots:
                    new_mesh_obj.data.materials.append(mat_slot.material)

                # Copy vertex groups
                for vg in source_mesh.vertex_groups:
                    new_vg = new_mesh_obj.vertex_groups.new(name=vg.name)
                    for i in range(len(new_mesh.vertices)):
                        try:
                            new_vg.add([i], vg.weight(i), 'REPLACE')
                        except RuntimeError:
                            pass  # Vertex not in group

                # Copy armature modifier
                for modifier in source_mesh.modifiers:
                    if modifier.type == 'ARMATURE':
                        new_modifier = new_mesh_obj.modifiers.new(name=modifier.name, type='ARMATURE')
                        new_modifier.object = target_object

                # Unlink the mesh from the scene after adding it as a child
                # bpy.context.scene.collection.objects.unlink(new_mesh_obj)
            else:
                raise Exception(f"Unhandled child type for source armature: \"{child.type}\"")
        ### end of __copyMeshIntoOutputArmature() ###

    # Delete stuff from the scene so that only the output armature remains
    def final_cleanup(self) -> None:
        print("MixamoAnimationImporter - Performing final scene cleanup...")
        self.__deleteAllOriginalFbxArmatures()
        print("MixamoAnimationImporter - Performing final scene cleanup...")
        self.final_cleanup_complete = True
        ### end of final_cleanup() ###

    def add_nla_tracks_to_output(self, target_object) -> None:
        for fbx_file_i, fbx_file in enumerate(self.imported_fbx_armatures):
            imported_armature = self.__selectFbxImportAnimature(fbx_file_i)

            # Copy animation data to the target object
            if imported_armature.animation_data and imported_armature.animation_data.action:
                action = imported_armature.animation_data.action
                action_name = self.__actionName(action_index=fbx_file_i)
                action.name = action_name

                # If the target object has no animation data, create it
                if hasattr(target_object, 'animation_data'):
                    if target_object.animation_data is None:
                        print("Calling animation_data_create() for first animation in list")
                        target_object.animation_data_create()

                else:
                    print("Calling animation_data_create() for first animation in list")
                    target_object.animation_data_create()

                # Add the action to the target object's NLA tracks
                nla_track = target_object.animation_data.nla_tracks.new()
                nla_track.name = action_name
                nla_strip = nla_track.strips.new(action_name, int(action.frame_range[0]), action)

        print("Finished combining NLA tracks successfully.")

    def run(self) -> None:
        if not self.has_loaded_files_from_animations_dir:
            raise Exception("Please call import_files_from_animations_directory() before run()")
        if self.final_cleanup_complete:
            raise Exception("MixamoAnimationImporter has already run! Please create a new instance.")

        if len(self.action_names) <= 1:
            raise Exception("Expected to find 2 or more FBX animation actions to merge together")

        # Copy one of the armatures to be the start of the new output armatures
        target_object = self.__initCombinedOutputArmature(self.imported_fbx_armatures[0])

        # Copy animation data into output
        self.add_nla_tracks_to_output(target_object=target_object)

        # Copy armature data from the first imported armature
        source_armature = self.imported_fbx_armatures[0]
        self.__copyMeshIntoOutputArmature(source_armature=source_armature, target_object=target_object)

        # Attach output object to scene
        print(f"Linking output armature \"{self.outputArmatureName}\" to scene...")
        bpy.context.scene.collection.objects.link(target_object)

        # Clean up so that only the final output armature remains in scene
        self.final_cleanup()

        print("Finished MixamoAnimationImporter.run() successfully")

importer = MixamoAnimationImporter()
importer.clear_workspace()
importer.import_files_from_animations_directory()
importer.run()
