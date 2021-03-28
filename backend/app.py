from flask import Flask, request, send_from_directory, current_app
from os.path import join
from generator.generator import ZipGen

@app.route('/config', methods=["POST"])
def server():
    data = request.get_json()
    zipObj = ZipGen()
    zipfile = zipObj.generate(data)

    if not zipfile:
        return "failed", 500
    else:
        uploads = join(current_app.root_path, app.config['UPLOAD_FOLDER'])
        return send_from_directory(directory=uploads, filename=zipfile), 200

if __name__ == "__main__":
    app.config['UPLOAD_FOLDER'] = 'generator/out/generated'
    app.run(host='0.0.0.0', port='5000', debug=True, use_reloader=True)
