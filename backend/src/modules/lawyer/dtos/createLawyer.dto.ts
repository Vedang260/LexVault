import { IsNotEmpty, IsString } from "class-validator";
import { LawSpecialization } from "src/common/enums/lawSpecialization.enums";
import { CreateUserDto } from "src/modules/user/dtos/createUser.dto";

export class CreateLawyerDto extends CreateUserDto{
    @IsNotEmpty()
    @IsString()
    barLicenseNumber: string;

    @IsNotEmpty()
    @IsString()
    licenseDocumentUrl: string;

    @IsNotEmpty()
    @IsString()
    licensePublicId: string;

    @IsNotEmpty()
    specialization: LawSpecialization;

    @IsNotEmpty()
    yearsOfExperience: number;

    @IsNotEmpty()
    hourlyRate: number;

    @IsNotEmpty()
    @IsString()
    firmName: string;
}