import { plainToClass } from 'class-transformer';
import {
  IsUrl,
  validateSync,
  IsPort,
  IsString,
  IsArray,
  ValidateNested,
  ArrayContains,
} from 'class-validator';

class APP {
  @IsUrl()
  host: string;

  @IsPort()
  port: number;
}

class ArangoDB {
  @ArrayContains([IsUrl])
  url: string[];

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsArray()
  certs: Array<string>;
}

class DB {
  @ValidateNested()
  arangodb: ArangoDB;
}

class EnvironmentVariables {
  @ValidateNested()
  app: APP;

  @ValidateNested()
  db: DB;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }
  return validatedConfig;
}
