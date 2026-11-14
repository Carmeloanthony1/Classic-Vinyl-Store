const jwt = require("jsonwebtoken");

const verify_token = (req, res, next) => {
    const auth_header = req.headers.authorization;

    if(!auth_header || !auth_header.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Akses di tolak, silahkan login"
        });
    }
    //ngambil di header 


    const token = auth_header.split(" ")[1];
    //ngambil tokennya 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        //biar next request, tau soal jwt nya
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token sudah kadarluasa" });
    }

};

module.exports = { verify_token };