import { ApiProperty } from '@nestjs/swagger';
import { MemoryDB } from '../memory-db/memory-db.decorator.js';
import { ChannelDto, MemoryDbDto } from './memoryDbDto.js';

@MemoryDB
export class LiveVideoRequestDto {
  @ApiProperty({example: 'this_is_userId', description: '클라이언트마다 가지는 랜덤한 userId 값'})
    userId: string = '';

  @ApiProperty({example: 'live title', description: '방송 제목'})
    liveTitle: string = '';

  @ApiProperty({example: '', description: '방송 썸네일 이미지(base64)'})
    defaultThumbnailImageUrl: string = '';

  @ApiProperty({example: 'category', description: '방송 카테고리'})
    category: string = '';

  @ApiProperty({example: ['tag1', 'tag2', 'tag3'], description: '방송 태그'})
    tags: Array<string> = [];
}

@MemoryDB
export class LiveSessionResponseDto {
  id: number = 0;
  liveId: string = '';
  liveTitle: string = '';
  liveImageUrl: string = '';
  defaultThumbnailImageUrl: string = '';
  concurrentUserCount: number = 0;
  channel : ChannelDto = {
    channelId: '',
    channelName: '',
  };

  category: string = '';
  tags: Array<string> = [];
}


export function fromLiveSessionDto(memoryDbDto: MemoryDbDto): LiveSessionResponseDto {
  const {
    id,
    sessionKey,
    liveTitle,
    liveImageUrl,
    defaultThumbnailImageUrl = 'https://kr.object.ncloudstorage.com/web22/static/liboo_default_thumbnail.png',
    concurrentUserCount,
    channel,
    category,
    tags,
  } = memoryDbDto;

  return {
    id,
    liveId : sessionKey,
    liveTitle,
    liveImageUrl,
    defaultThumbnailImageUrl,
    concurrentUserCount,
    channel,
    category,
    tags,
  };
}