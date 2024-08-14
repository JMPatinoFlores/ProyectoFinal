import { SetMetadata } from "@nestjs/common";
import { Role } from "src/auth/guards/roles.enum";

export const Roles = (...roles: Role[]) => {
    return SetMetadata('roles', roles)
}