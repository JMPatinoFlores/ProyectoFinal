import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/guards/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Email')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Enviar emails ' })
  async sendMail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @Body('html') html: string,
  ) {
    return await this.mailService.sendMail(to, subject, text, html);
  }
}
