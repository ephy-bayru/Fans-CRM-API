import { VersioningType } from '@nestjs/common';

export const versioningConfig = {
  type: VersioningType.URI,
  defaultVersion: ['1'],
};
