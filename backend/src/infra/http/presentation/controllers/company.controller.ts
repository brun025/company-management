import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCompanyDto } from '../../dtos/create-company.dto';
import { UpdateCompanyDto } from '../../dtos/update-company.dto';
import { CreateCompanyUseCase } from 'src/core/useCases/company/create-company.usecase';
import { UpdateCompanyUseCase } from 'src/core/useCases/company/update-company.usecase';
import { DeleteCompanyUseCase } from 'src/core/useCases/company/delete-company.usecase';
import { FindAllCompaniesUseCase } from 'src/core/useCases/company/find-all-companies.usecase';
import { FindCompanyByIdUseCase } from 'src/core/useCases/company/find-company-by-id.usecase';
import { Order, PaginationQueryDto } from '../../dtos/pagination-query.dto';
import { PageDto } from '../../dtos/page.dto';
import { CompanyViewModel } from '../../dtos/company.view-model';
import { RemoveMaskPipe } from '../../../../core/pipes/remove-mask.pipe';
import { RateLimitGuard } from 'src/infra/guards/rate-limit.guard';
import { JwtAuthGuard } from 'src/infra/guards/jwt.guard';

@ApiTags('companies')
@Controller('companies')
@UseGuards(RateLimitGuard, JwtAuthGuard)
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
    private readonly findAllCompaniesUseCase: FindAllCompaniesUseCase,
    private readonly findCompanyByIdUseCase: FindCompanyByIdUseCase,
  ) {}

  @Get()
  @ApiBearerAuth() // Adiciona o ícone de cadeado no Swagger
  @ApiOperation({ summary: 'List paged companies' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of companies',
    type: PageDto,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: Order,
    description: 'Sort order',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: String,
    description: 'Field for ordering',
  })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PageDto<CompanyViewModel>> {
    const pageOptions = {
      page: query.page || 1,
      limit: query.limit || 10,
      order: query.order || Order.ASC,
      orderBy: query.orderBy,
    };

    // GET /companies?page=2&limit=20&orderBy=name&order=DESC
    const page = await this.findAllCompaniesUseCase.execute(pageOptions);

    return new PageDto(
      page.data.map((client) => CompanyViewModel.fromEntity(client)),
      page.meta,
    );
  }

  @Get(':id')
  @ApiBearerAuth() // Adiciona o ícone de cadeado no Swagger
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Company returned successfully',
  })
  async findById(@Param('id') id: number) {
    return await this.findCompanyByIdUseCase.execute(id);
  }

  @Post()
  @ApiBearerAuth() // Adiciona o ícone de cadeado no Swagger
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Company created successfully',
  })
  async create(@Body(new RemoveMaskPipe()) createCompanyDto: CreateCompanyDto) {
    return await this.createCompanyUseCase.execute(createCompanyDto);
  }

  @Put(':id')
  @ApiBearerAuth() // Adiciona o ícone de cadeado no Swagger
  @ApiOperation({ summary: 'Update a company' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Company updated successfully',
  })
  async update(
    @Param('id') id: string,
    @Body(new RemoveMaskPipe()) updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.updateCompanyUseCase.execute(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiBearerAuth() // Adiciona o ícone de cadeado no Swagger
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a company' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Company deleted successfully',
  })
  async delete(@Param('id') id: string) {
    await this.deleteCompanyUseCase.execute(+id);
  }
}
