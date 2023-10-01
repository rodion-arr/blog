---
title: How to validate nested objects in Nest.js
description: This post will show examples nested objects validation in Nest.js
slug: validate-nested-objects-nestjs
category: backend
datePublished: 2023-09-30T00:00:00.000Z
tags: [intermediate, nestjs, nodejs, typescript, backend, api, validation]
---

It is a common task to receive complex objects as input to our APIs and of course we must validate these objects. In this post we will review few examples of how to validate complex objects in Nest.js APIs via DTO files and `ValidationPipe` and underlying `class-validation` package.

Unfortunately neither Nest.js nor `class-validator` documentations still have a comprehensive examples of how we can validate more complex requests containing, for example, nested objects, array of objects or conditional validation logic. This may require developers to do a lot tries and fails in order to find correct decorators to make it work. Let's review some common examples that I've faced in Nest.js projects and see how they can be validated.

## Prerequisites

> Note: At the time of this post - Nest.js core had version 10.2.6 

Let's first install fresh Nest.js project and setup validation with the help of next commands (you will need `nest` CLI installed):

```bash
# Create new Nest.js project
nest new validation

# Install validation packages
npm i --save class-validator class-transformer
```
We need setup `ValidatorPipe` in `main.ts` file next:

```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
```

We can run our project now:

```bash
npm run start:dev
```

## Validation examples

Validation logic in Nest.js applications usually stored in filed called `DTO` (Data Transfer Object). `class-validator` package provides a lot of decorators that we can use to validate our DTOs. For simplicity, we will create simple APIs in `app.controller.ts`. In real world applications we would split our application into feature modules.

### Arrays validation

Let's imagine that we need to accept an array of numbers as input to our API. We can do it with the help of `@IsInt()` decorator. Let's create a DTO file in `src/dto/post-array.dto.ts` file with next content:

```typescript
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class PostArraysDto {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  array: number[];
}
```

We can use this DTO in our `app.controller.ts` now:

```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { PostArraysDto } from './dto/post-array.dto';

@Controller()
export class AppController {
  @Post('/arrays')
  postArray(@Body() body: PostArraysDto): PostArraysDto {
    return body;
  }
}
```

If we POST an empty body to `/arrays` endpoint we will get next validation error:

```bash
curl --location --request POST 'http://localhost:3000/arrays'
```

```json
{
  "message": [
    "each value in array must be an integer number",
    "array should not be empty"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

Let's POST some stings in array, validation will fail:

```bash
curl --location 'http://localhost:3000/arrays' \
--header 'Content-Type: application/json' \
--data '{
    "array": ["string"]
}'
```

```json
{
  "message": [
    "each value in array must be an integer number"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

Posting numbers will succeed.

### Nested objects validation

Next task is to accept and validate nested objects in our API. Let's create a DTO file in `src/dto/post-nested-object.dto.ts`. Now we need more than 1 class - first will specify the structure of nested object and second will be used to validate the whole request:

```typescript
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class NestedObject {
  @IsNotEmpty()
  @IsNumber()
  field: number;

  @IsNotEmpty()
  @IsString()
  field2: string;
}

export class PostNestedObjectDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => NestedObject)
  nestedObject: NestedObject;
}
```

We can use this DTO in our `app.controller.ts` now:

```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { PostArraysDto } from './dto/post-array.dto';
import { PostNestedObjectDto } from './dto/post-nested-object.dto';

@Controller()
export class AppController {
  // ... other code

  @Post('/nested')
  postNestedObject(@Body() body: PostNestedObjectDto): PostNestedObjectDto {
    return body;
  }
}
```

If we POST empty `nestedObject` field - Nest.js will list all validation errors field by field for nested object:

```bash
curl --location 'http://localhost:3000/nested' \
--header 'Content-Type: application/json' \
--data '{
    "nestedObject": {}
}'
```

```json
{
  "message": [
    "nestedObject.field must be a number conforming to the specified constraints",
    "nestedObject.field should not be empty",
    "nestedObject.field2 must be a string",
    "nestedObject.field2 should not be empty"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

### Arrays of objects validation
### Conditional validation based on other fields
### Validation of arrays of objects of different types
