import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { LawyerService } from "../services/lawyer.service";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/common/enums/roles.enums";

@Controller('lawyer')
@UseGuards(JwtAuthGuard)
export class LawyerController{
    constructor(
        private readonly lawyerService: LawyerService
    ){}

    @Post('/verify')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async verifyLawyer(@Body() body: {lawyerId: string}){
        const { lawyerId } = body;
        return await this.lawyerService.verifyLawyer(lawyerId);
    }

    @Get('/requests')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async getAllLawyerRequests(){
        return await this.lawyerService.findLawyerRequests();
    }
}