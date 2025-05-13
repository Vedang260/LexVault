import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTagDto } from "../dtos/createTag.dto";
import { UpdateTagDto } from "../dtos/updateTag.dto";
import { Tag } from "../entities/tag.entity";
import { TagRepository } from "../repositories/tag.repository";

@Injectable()
export class TagService{
    constructor(
        private readonly tagRepository: TagRepository
    ){}

    async createTag(createTagDto: CreateTagDto): Promise<{ success: boolean; message: string;}>{
        try{
            const newTag = await this.tagRepository.createNewTag(createTagDto);
            if(newTag){
                return{
                    success: true,
                    message: 'New Tag is created'
                }
            }
            return{
                success: false,
                message: 'Failed to create a new Tag'
            }
        }catch(error){
            console.error('Error in creating a new tag: ', error.message);
            return{
                success: false,
                message: 'Failed to created a new Tag'
            }
        }
    }

    async updateTag(tagId: string, updateTagDto: UpdateTagDto): Promise<{ success: boolean; message: string;}>{
        try{
            const result = await this.tagRepository.updateTag(tagId, updateTagDto);
            if(result){
                return{
                    success: true,
                    message: 'Tag is updated'
                }
            }
            throw new NotFoundException('Failed to update tag');
        }catch(error){
            console.error('Error in updating a tag: ', error.message);
            return{
                success: false,
                message: 'Failed to update a tag'
            }
        }
    }

    async deleteTag(tagId: string): Promise<{ success: boolean; message: string;}>{
        try{
            const result = await this.tagRepository.deleteTag(tagId);
            if(result){
                return{
                    success: true,
                    message: 'Tag is deleted successfully'
                }
            }
            return{
                success: false,
                message: 'Failed to delete a Tag'
            }
        }catch(error){
            console.error('Error in deleting a tag: ', error.message);
            return{
                success: false,
                message: 'Failed to delete a Tag'
            }
        }
    }

    async getAllTags(): Promise<{ success: boolean; message: string; tags: Tag[] | null}>{
        try{
            const tags = await this.tagRepository.getAllTags();
            if(tags){
                return{
                    success: true,
                    message: 'Tags are fetched successfully',
                    tags: tags
                }
            }
            return{
                success: false,
                message: 'Failed to fetch the tags',
                tags: null
            }
        }catch(error){
            console.error('Error in fetching all the tags: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the tags',
                tags: null
            }
        }
    }
}