const cloudinary = require("../../helpers/developer/cloudinary");
const developerSchema = require("../../models/developer/developerSchema");

module.exports.updateProfile = async (req, res) => {
    try {
      let imgPath;
      if(req.body.imgPath){
        imgPath=req.body.imgPath
      }else{
        const file = req.files.image;
        await cloudinary.uploader.upload(
          file.tempFilePath,
          { folder: "ProjectManagement/developers" },
          (err, result) => {
            imgPath = result.secure_url;
          }
        );
      }
      const { id, name, email, domain } = req.body;
      await developerSchema.updateOne({_id:id},{name,email,domain,imgPath})
      const details = await developerSchema.findById(id);
      res.json({ status: true, details });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  };