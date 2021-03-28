import os
import zipfile


def retrieve_file_paths(dirName):

    # setup file paths variable
    filePaths = []

    # Read all directory, subdirectories and file lists
    for root, directories, files in os.walk(dirName):
        for filename in files:
            # Create the full filepath by using os module.
            filePath = os.path.join(root, filename)
            filePaths.append(filePath)

    return filePaths


def main():
    # Assign the name of the directory to zip
    dir_name = 'vulnerability'

    filePaths = retrieve_file_paths(dir_name)

    print('The following list of files will be zipped:')
    for fileName in filePaths:
        print(fileName)

    zip_file = zipfile.ZipFile(dir_name+'.zip', 'w')
    with zip_file:
        for file in filePaths:
            zip_file.write(file)

    print(dir_name+'.zip file is created successfully!')


if __name__ == "__main__":
    main()
