import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CaseService } from "../services/case.service";
import { CreateCaseDto } from "../dtos/createCase.dto";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/common/enums/roles.enums";
import { CaseStatus } from "src/common/enums/caseStatus.enums";
import { UpdateCaseDto } from "../dtos/updateCase.dto";

@Controller('case')
@UseGuards(JwtAuthGuard)
export class CaseController{
    constructor(
        private readonly caseService: CaseService
    ){}

    @Post('/create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.CLIENT)
    async createNewCase(@Req() req: Request, @Body() body: {createCase: Partial<CreateCaseDto>}){
        const { createCase } =  body;
        return await this.caseService.createNewCase(req['user'].userId, createCase);
    }

    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.LAWYER)
    async updateCase(@Param('id') caseId: string, @Body() body: {updateCaseDto: Partial<UpdateCaseDto>}){
        const { updateCaseDto } = body;
        return await this.caseService.updateCaseStatus(caseId, updateCaseDto);
    }

    @Get(`/case-details/:id`)
    @UseGuards(RolesGuard)
    @Roles(UserRole.LAWYER, UserRole.ADMIN, UserRole.CLIENT)
    async getCaseDetails(@Param('id') caseId: string){
        return await this.caseService.getCaseDetails(caseId);
    }

    @Get('/lawyer/assigned')
    @UseGuards(RolesGuard)
    @Roles(UserRole.LAWYER, UserRole.ADMIN)
    async getAssignedCasesofLawyerDashboard(@Req() req: Request){
        return await this.caseService.getAssignedCaseOfLawyerDashboard(req['user'].userId);
    }

    @Get('/request')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async getCaseRequest(){
        return await this.caseService.getUnassignedCases();
    }

    @Post('/assign-lawyer')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async assignLawyer(@Body() body: { caseId: string, lawyerIds: string[]}){
        const {caseId, lawyerIds} = body;
        return await this.caseService.assignLawyers(caseId, lawyerIds);
    }
}