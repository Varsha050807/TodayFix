import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await prisma.user.create({
        data: {
            name: "Admin User",
            email: "admin@test.com",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("User created successfully");
}

main()
    .catch(console.error)
    .finally(() => process.exit());