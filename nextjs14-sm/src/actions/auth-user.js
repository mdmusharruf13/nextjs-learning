import connectToDB from "@/database/blogdb";

export async function registerNewUser(formData) {
    try {
        await connectToDB();

        const { userName, email, password } = formData;

        let user = await noSchemaPleaseCreateFirst.findOne({ email });
        if (user) {
            return {
                success: false,
                message: "User already exists! Please try with different email"
            }
        }

        // install bcrypths package
        const salt = bcryptjs.genSalt(10);
        const hashPswd = await bcryptjs.hash(password, salt);

        const newlyCreatedUser = new User({
            userName, email, password: hashPswd
        });

        const savedUser = await newlyCreatedUser.save();

        if (savedUser) {
            return {
                success: trye,
                data: JSON.parse(JSON.stringify(savedUser))
            }
        }

        return {
            success: false,
            message: "User already exists! Please try with different email"
        }



    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "something went wrong ! Please try again later"
        }
    }
}