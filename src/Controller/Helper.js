const path = require('path')

const uploadImage = async (image, filepath) => {
    const fileName = image.md5 + +new Date + 1;
    const extension = path.extname(image.name);
    await image.mv(`assets/${filepath}/` + fileName + extension);
    return fileName + extension;
}
module.exports = {
    uploadImage
}





// const path = require('path')
// const uploadImage = async (image, filepath) => {
//     const fileName = image.md5 + new Date + 1;
//     const extension = path.extname(image.name);
//     await image.mv(`/${filepath}/` + fileName + extension);
//     return fileName + extension;
// }
// module.exports = {
//     uploadImage
// }