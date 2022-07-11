const app = require("../config");
const { getStorage } = require("firebase/storage");
const storage = getStorage(app);
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const response = require("../../responses");
const service = require("../services");

const uplaod = async (file) => {
  try {
    if (!file) {
      return null;
    }
    const uniqueFileName = `images/${
      file?.originalname?.split(".")[0]
    }%%${new Date().valueOf()}.${file?.originalname?.split(".")[1]}`;
    const imageRef = ref(storage, uniqueFileName);
    const metaType = {
      contentType: file?.mimetype,
      name: file?.originalname,
    };
    let publicUrl = "";
    await uploadBytes(imageRef, file?.buffer, metaType)
      .then(async () => {
        publicUrl = await getDownloadURL(imageRef);
      })
      .catch((e) => {
        console.error(e);
        return null;
      });
    return publicUrl;
  } catch (err) {
    console.log("ERROR---->", err);
    throw new Error(err);
  }
};

module.exports = {
  uplaod,
};
