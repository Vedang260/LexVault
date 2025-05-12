import { Controller } from "@nestjs/common";
import { LawyerService } from "../services/lawyer.service";

@Controller('lawyer')
export class LawyerController{
    constructor(
        private readonly lawyerService: LawyerService;
    ){}

    
}