function getUploadFileExt(name,nameValue) {
    let newName=`${name}${Date.parse(new Date())}.${name}`;
    return newName;
}

module.exports = getUploadFileExt;
