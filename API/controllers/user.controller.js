import User from "../Models/user.model";

export const updateUser = async (res, resp) =>{
    const { fullName, email, username, currentPassword, newPassword } = req.body

    const userId = req.user._id;

    try{
        let user = await  User.findById(userId);
        if(!user) return res.status(404).json({ message: "User not found"})

        if((!newPassword && currentPassword) || (!currentPassword && newPassword)){
            return req.status(400).json({ error: "Please provide both current password and new password"})
        }

        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch) return res.status(400).json({ error: "Current password is incorrect"})
            if(newPassword.lenght < 6){
                return res.status(400).json({ error: "Password must be at least 6 characters long"})
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword. salt)
        }
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;

        user = await user.save();
        user.password = null;
    }catch (err) {
        res.status(500).json({ error: "Internal server error "})
        console.log(err)
    }

}