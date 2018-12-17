module.exports = {


  uploadFile: function (uploadFile, directory, addToTmp = true) {
    sails.log.verbose('FileUploadService.uploadFile()');
    return new Promise((resolve, reject) => {

      let pathData = FileUploadService.createUploadsDirectories(directory);

      sails.log.verbose('Uploading file...');
      uploadFile.upload({
        dirname: require('path').resolve(sails.config.appPath, pathData.path)
      }, function (err, files) {
        if (err) return reject(err);

        let fileData = FileUploadService.extractDataFromFile(files[0].fd, directory);

        sails.log.verbose(fileData.fileName + ' uploaded !');

        if (addToTmp) {
          FileUploadService.copyFileToTmpDirectory(fileData, pathData.pathTmp);
        }
        resolve(fileData);
      });
    });
  },

  writeFile: function (data, directory, fileName, type, addToTmp = true) {
    let fs = require('fs');
    sails.log.verbose('FileUploadService.writeFile()');
    return new Promise((resolve, reject) => {
      let pathData = FileUploadService.createUploadsDirectories(directory);
      let fullPath = require('path').resolve(sails.config.appPath, pathData.path + '/' + fileName);
      fs.writeFile(fullPath, data, type, function (err) {
        if (err) {
          return reject(err);
        }
        let fileData = FileUploadService.extractDataFromFile(fullPath, directory);

        if (addToTmp) {
          FileUploadService.copyFileToTmpDirectory(fileData, pathData.pathTmp);
        }

        resolve(fileData);
      });
    });
  },

  createUploadsDirectories: function (directory) {
    let fse = require('fs-extra');
    let path = 'assets/public/uploads/' + directory;
    let pathTmp = '.tmp/public/public/uploads/' + directory;

    fse.ensureDirSync(path);
    fse.ensureDirSync(pathTmp);
    return { path: path, pathTmp: pathTmp };
  },
  copyFileToTmpDirectory: function (fileData, pathTmp) {
    let fse = require('fs-extra');
    sails.log.verbose('Copying file to .tmp directory...');
    fse.copySync(fileData.fullPath, sails.config.appPath + "/" + pathTmp + '/' + fileData.fileName);
    sails.log.verbose(fileData.fullPath + ' ---> ' + sails.config.appPath + "/" + pathTmp + '/' + fileData.fileName);
  },
  extractDataFromFile: function (fullPath, directory) {
    let isWin = /^win/.test(process.platform);

    let fileName = isWin ? fullPath.split('\\') : fullPath.split('/');

    fileName = fileName[fileName.length - 1];
    let fileURL = '/public/uploads/' + directory + '/' + fileName;

    return { fileURL: fileURL, fileName: fileName, fullPath: fullPath };
  }

}
