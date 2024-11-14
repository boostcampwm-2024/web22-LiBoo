import { Controller, Post, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { HostService } from './host.service';
import { Request, Response } from 'express';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post('/')
  async generateStreamKey(@Req() req: Request, @Res() res: Response) {
    try {
      const host = req.headers['host'] as string;
      const contentType = req.headers['content-type'];
      const { uuid } = req.body;

      if (!host || !contentType || !uuid) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      if (contentType !== 'application/json') {
        throw new HttpException('Content-Type must be application/json', HttpStatus.BAD_REQUEST);
      }

      const [streamKey, sessionKey] = await this.hostService.generateStreamKey(uuid);
      res.status(HttpStatus.OK).json({ 'stream-key': streamKey, 'session-key':sessionKey });
    } catch (error) {
      if ((error as { status: number }).status === 400) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: (error as { response: Response }).response
        });
      }
      else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Server logic error',
        });
      }
    }
  }
}