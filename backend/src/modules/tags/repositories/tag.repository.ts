import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "../entities/tag.entity";
import { Repository } from "typeorm";
import { CreateTagDto } from "../dtos/createTag.dto";
import { UpdateTagDto } from "../dtos/updateTag.dto";

@Injectable()
export class TagRepository{
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ){}

    async createNewTag(createTagDto: CreateTagDto): Promise<Tag|null>{
        try{
            const newTag = this.tagRepository.create(createTagDto);
            return await this.tagRepository.save(newTag);
        }catch(error){
            console.error('Error in creating a new Tag: ', error.message);
            throw new InternalServerErrorException('Error in creating a new Tag');
        }
    }

    async updateTag(tagId: string, updateTagDto: UpdateTagDto): Promise<boolean>{
        try{
            const result = await this.tagRepository.update({tagId}, updateTagDto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating Tag: ', error.message);
            throw new InternalServerErrorException('Error in updating Tag');
        }
    }

    async getAllTags(): Promise<Tag[]>{
        try{
            return await this.tagRepository.find();
        }catch(error){
            console.error('Error in fetching all the Tags: ', error.message);
            throw new InternalServerErrorException('Error in fetching all the tags');
        }
    }

    async deleteTag(tagId: string): Promise<boolean>{
        try{
            const result = await this.tagRepository.delete(tagId);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a Tag: ', error.message);
            throw new InternalServerErrorException('Error in deleting a Tag');
        }
    }
}