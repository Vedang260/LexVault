import { Controller } from "@nestjs/common";

@Controller('lawyer')
export class LawyerController{
    constructor(
        private readonly lawyerService: LawyerService
    )
}