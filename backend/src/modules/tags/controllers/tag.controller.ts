import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/common/enums/roles.enums";
import { TagService } from "../services/tag.service";
import { CreateTagDto } from "../dtos/createTag.dto";
import { UpdateTagDto } from "../dtos/updateTag.dto";

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagController{
    constructor(
        private readonly tagService: TagService
    ){}

    @Post('/create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async createNewTag(@Body() body: {createTagDto: CreateTagDto}){
        const { createTagDto } =  body;
        return await this.tagService.createTag(createTagDto);
    }

    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateTag(@Param('id') tagId: string, @Body() body: {updateTagDto: UpdateTagDto}){
        const { updateTagDto } = body;
        return await this.tagService.updateTag(tagId, updateTagDto);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteTag(@Param('id') tagId: string){
        return await this.tagService.deleteTag(tagId);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.CLIENT, UserRole.LAWYER)
    async getAllTags(){
        return await this.tagService.getAllTags();
    }
}