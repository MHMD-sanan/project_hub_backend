
module.exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if(!(email || password)) res.json({status:false,message:"Some fields are missing"});
      if (email === "admin@gmail.com" && password === "123") {
        res.json({ status: true });
      } else {
        res.json({ status: false});
      }
    } catch (error) {
      console.log(error);
    }
  };